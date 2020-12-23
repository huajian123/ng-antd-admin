import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {SettingInterface, ThemeService} from '../../../core/services/store/theme.service';

type theme = { key: 'dark' | 'light' | 'night', image: string, title: string, isChecked: boolean };

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


  themes: theme[] = [
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
    {
      key: 'night',
      image: '/assets/imgs/theme-dark.svg',
      title: '黑夜模式风格',
      isChecked: false,
    },
  ];
  colors = [
    {
      key: 'dust',
      color: '#F5222D',
      title: '薄暮'
    },
    {
      key: 'volcano',
      color: '#FA541C',
      title: '火山'
    },
    {
      key: 'sunset',
      color: '#FAAD14',
      title: '日暮'
    },
    {
      key: 'cyan',
      color: '#13C2C2',
      title: '明青'
    },
    {
      key: 'green',
      color: '#52C41A',
      title: '极光绿'
    },
    {
      key: 'daybreak',
      color: '#1890FF',
      title: '拂晓蓝（默认）'
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
      title: '极客蓝'
    },
    {
      key: 'purple',
      color: '#722ED1',
      title: '酱紫'
    },
  ];
  modes = [
    {
      key: 'side',
      image: '/assets/imgs/menu-side.svg',
      title: '侧边菜单布局'
    },
    {
      key: 'top',
      image: '/assets/imgs/menu-top.svg',
      title: '顶部菜单布局'
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

  constructor(private themesService: ThemeService, @Inject(DOCUMENT) private doc: Document) {
  }

  @HostListener('click', ['$event'])
  onClicked(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  changeThemeToNight(): void {
    const themeUrl = './assets/themes/style.dark.css';
    // create new link element
    const style = this.doc.createElement('link') as HTMLLinkElement;
    // put the link into the document head
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'dark-theme';
    style.href = themeUrl;
    this.doc.body.appendChild(style);

  }

  removeNightTheme(): void {
    const dom = this.doc.getElementById('dark-theme');
    if (dom) {
      dom.remove();
    }
  }


  changeTheme(themeItem: theme): void {
    this.themes.forEach((item) => {
      item.isChecked = false;
    });
    themeItem.isChecked = true;
    if (themeItem.key === 'night') {
      this.changeThemeToNight();
      this.themesService.setThemesMode({...this._themesOptions, ...{theme: 'dark'}});
      this.themesService.setIsNightTheme(true);
    } else {
      this.removeNightTheme();
      this.themesService.setThemesMode({...this._themesOptions, ...{theme: themeItem.key}});
      this.themesService.setIsNightTheme(false);
    }
  }

  ngOnInit(): void {
    this.themesOptions$.pipe(takeUntil(this.destory$)).subscribe((res: SettingInterface) => this._themesOptions = res);
    // this.isNightTheme$.pipe(takeUntil(this.destory$)).subscribe((res: boolean) => this._isNightTheme = res);
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
