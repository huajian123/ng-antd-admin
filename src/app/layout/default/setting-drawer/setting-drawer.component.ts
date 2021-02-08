import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {SettingInterface, ThemeService} from '../../../core/services/store/theme.service';
import {ThemeSkinService} from '../../../core/services/common/theme-skin.service';
import {WindowService} from '../../../core/services/common/window.service';
import {IsNightKey, ThemeOptionsKey} from '../../../configs/constant';

interface NormalModel {
  image?: string;
  title: string;
  isChecked: boolean;
}

interface Theme extends NormalModel {
  key: 'dark' | 'light';
}

interface Color extends NormalModel {
  key: string;
  color: string;
}

interface Mode extends NormalModel {
  key: 'side' | 'top';
}


@Component({
  selector: 'app-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  styleUrls: ['./setting-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingDrawerComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  _isNightTheme = false;
  _themesOptions: SettingInterface = {
    theme: 'dark',
    color: 'daybreak',
    mode: 'side',
    fixedWidth: false,
    colorWeak: false
  };
  isCollapsed = false;


  themes: Theme[] = [
    {
      key: 'dark',
      image: '/assets/imgs/theme-dark.svg',
      title: '暗色菜单风格',
      isChecked: true,
    },
    {
      key: 'light',
      image: '/assets/imgs/theme-light.svg',
      title: '亮色菜单风格',
      isChecked: false,
    },
  ];
  colors: Color[] = [
    {
      key: 'dust',
      color: '#F5222D',
      title: '薄暮',
      isChecked: false
    },
    {
      key: 'volcano',
      color: '#FA541C',
      title: '火山',
      isChecked: false
    },
    {
      key: 'sunset',
      color: '#FAAD14',
      title: '日暮',
      isChecked: false
    },
    {
      key: 'cyan',
      color: '#13C2C2',
      title: '明青',
      isChecked: false
    },
    {
      key: 'green',
      color: '#52C41A',
      title: '极光绿',
      isChecked: false
    },
    {
      key: 'daybreak',
      color: '#1890FF',
      title: '拂晓蓝（默认）',
      isChecked: true
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
      title: '极客蓝',
      isChecked: false
    },
    {
      key: 'purple',
      color: '#722ED1',
      title: '酱紫',
      isChecked: false
    },
  ];
  modes: Mode[] = [
    {
      key: 'side',
      image: '/assets/imgs/menu-side.svg',
      title: '侧边菜单布局',
      isChecked: true
    },
    {
      key: 'top',
      image: '/assets/imgs/menu-top.svg',
      title: '顶部菜单布局',
      isChecked: false,
    }
  ];
  layouts = [
    {
      key: 'fixedWidth',
      title: '固定宽度',
      disabled(setting: { mode: string; }): boolean {
        return setting.mode === 'side';
      }
    }
  ];

  constructor(private themesService: ThemeService, @Inject(DOCUMENT) private doc: Document,
              private themeSkinService: ThemeSkinService, private windowServe: WindowService,
              private cdr: ChangeDetectorRef) {
  }

  @HostListener('click', ['$event'])
  onClicked(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // 修改黑夜主题
  changeNightTheme(isNight: boolean): void {
    this.windowServe.setStorage(IsNightKey, '' + isNight);
    this.themesService.setIsNightTheme(isNight);
    this.themeSkinService.toggleTheme().then();
  }

  // 选择一个isChecked为true,其他为false
  selOne(item: NormalModel, itemArray: NormalModel[]): void {
    itemArray.forEach((_item) => _item.isChecked = false);
    item.isChecked = true;
  }


  changeMode(mode: Mode): void {
    this.selOne(mode, this.modes);
    this.themesService.setIsCollapsed(false);
    this._themesOptions.mode = mode.key;
    this.setThemeOptions();
  }

  // 切换主题
  changeTheme(themeItem: Theme): void {
    this.selOne(themeItem, this.themes);
    this._themesOptions.theme = themeItem.key;
    this.setThemeOptions();
  }

  // 设置主题参数
  setThemeOptions(): void {
    this.themesService.setThemesMode(this._themesOptions);
    this.windowServe.setStorage(ThemeOptionsKey, JSON.stringify(this._themesOptions));
  }

  ngOnInit(): void {
    // todo 代码有待精简
    const isNightCash = this.windowServe.getStorage(IsNightKey);
    if (!!isNightCash) {
      const JsonParseIsNight: boolean = JSON.parse(isNightCash);
      this.changeNightTheme(JsonParseIsNight);
      this._isNightTheme = JsonParseIsNight;
    } else {
      this.isNightTheme$.pipe(takeUntil(this.destory$), take(1)).subscribe((res: boolean) => {
        this._isNightTheme = res;
      });
    }


    const themeOptionsCash = this.windowServe.getStorage(ThemeOptionsKey);
    if (!!themeOptionsCash) {
      const JsonParseThemesOptions = JSON.parse(themeOptionsCash);
      this._themesOptions = JsonParseThemesOptions;
      this.setThemeOptions();
    } else {
      this.themesOptions$.pipe(takeUntil(this.destory$), take(1)).subscribe((res: SettingInterface) => this._themesOptions = res);
    }


    this.modes.forEach((item) => {
      item.isChecked = item.key === this._themesOptions.mode;
    });

    this.themes.forEach((item) => {
      item.isChecked = item.key === this._themesOptions.theme;
    });

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
