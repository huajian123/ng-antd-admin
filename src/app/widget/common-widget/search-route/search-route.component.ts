import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

import { DestroyService } from '@core/services/common/destory.service';
import { Menu } from '@core/services/types';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { BasicConfirmModalComponent } from '@widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';

interface ResultItem {
  selItem: boolean;
  isAliIcon: boolean;
  title: string;
  routePath: string;
  icon: string;
}

const passiveEventListenerOptions = <AddEventListenerOptions>normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class SearchRouteComponent extends BasicConfirmModalComponent implements OnInit, AfterViewInit {
  isNightTheme$ = this.themesService.getIsNightTheme();
  resultListShow: ResultItem[] = [];
  resultList: ResultItem[] = [];
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  inputValue: string | null = null;
  menuNavList: Menu[] = [];

  constructor(
    private themesService: ThemeService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private destroy$: DestroyService,
    private menuStoreService: MenuStoreService,
    private router: Router,
    protected override modalRef: NzModalRef
  ) {
    super(modalRef);
  }

  changeSelAnswerIndex(dir: 'up' | 'down'): number | null {
    const index = this.resultListShow.findIndex(item => item.selItem);
    if (index > -1) {
      // 向上
      if (dir === 'up') {
        if (index === 0) {
          return this.resultListShow.length - 1;
        } else {
          return index - 1;
        }
      } else {
        if (index === this.resultListShow.length - 1) {
          return 0;
        } else {
          return index + 1;
        }
      }
    } else {
      return null;
    }
  }

  @HostListener('window:keyup.enter')
  onEnterUp() {
    const index = this.resultListShow.findIndex(item => item.selItem);
    if (index > -1) {
      this.resultClick(this.resultListShow[index]);
    }
  }

  @HostListener('window:keyup.arrowUp')
  onArrowUp() {
    const index = this.changeSelAnswerIndex('up');
    if (index !== null) {
      this.mouseOverItem(this.resultListShow[index]);
    }
  }

  @HostListener('window:keyup.arrowDown')
  onArrowDown() {
    const index = this.changeSelAnswerIndex('down');
    if (index !== null) {
      this.mouseOverItem(this.resultListShow[index]);
    }
  }

  resultClick(resultItem: ResultItem): void {
    this.router.navigate([resultItem.routePath]);
    this.modalRef.destroy();
  }

  getResultItem(menu: Menu, fatherTitle: string = ''): ResultItem[] {
    const fatherTitleTemp = fatherTitle === '' ? menu.menuName : `${fatherTitle} > ${menu.menuName}`;
    let resultItem: ResultItem = {
      title: fatherTitleTemp,
      routePath: menu.path!,
      selItem: false,
      isAliIcon: !!menu.alIcon,
      icon: menu.icon! || menu.alIcon!
    };
    if (menu.children && menu.children.length > 0) {
      let resultArrayTemp: ResultItem[] = [];
      menu.children.forEach(menuChild => {
        resultArrayTemp = [...resultArrayTemp, ...this.getResultItem(menuChild, fatherTitleTemp)];
      });
      return resultArrayTemp;
    } else {
      return [resultItem];
    }
  }

  resultListFactory(): void {
    let temp: ResultItem[] = [];
    this.menuNavList.forEach(item => {
      temp = [...temp, ...this.getResultItem(item)];
    });
    this.resultList = temp;
  }

  clearInput(): void {
    this.inputValue = '';
    this.resultListShow = [];
    this.cdr.markForCheck();
  }

  subSearchFn(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.searchInput.nativeElement, 'input', passiveEventListenerOptions)
        .pipe(
          map(e => (e.target as HTMLInputElement).value),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(item => {
            return of(item);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe(res => {
          this.resultListShow = [];
          this.resultList.forEach(item => {
            if (item.title.includes(res)) {
              this.resultListShow.push(item);
            }
          });
          if (this.resultListShow.length > 0) {
            this.resultListShow[0].selItem = true;
          }
          this.resultListShow = [...this.resultListShow];
          // 清空搜索条件时将结果集置空
          if (!res) {
            this.resultListShow = [];
          }
          this.ngZone.run(() => {
            this.cdr.markForCheck();
          });
        });
    });
  }

  mouseOverItem(item: ResultItem): void {
    this.resultListShow.forEach(resultItem => {
      resultItem.selItem = false;
    });
    item.selItem = true;
  }

  ngAfterViewInit(): void {
    this.subSearchFn();
  }

  getMenus(): void {
    this.menuStoreService
      .getMenuArrayStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(menus => {
        this.menuNavList = menus;
      });
  }

  ngOnInit(): void {
    this.getMenus();
    this.resultListFactory();
  }

  protected getCurrentValue(): NzSafeAny {}
}
