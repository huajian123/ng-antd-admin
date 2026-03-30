import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { Component, OnInit, ChangeDetectionStrategy, ElementRef, AfterViewInit, inject, DestroyRef, viewChild, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { Menu } from '@core/services/types';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { BasicConfirmModalComponent } from '@widget/base-modal';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';

interface ResultItem {
  selItem: boolean;
  isAliIcon: boolean;
  title: string;
  routePath: string;
  icon: string;
}

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true }) as AddEventListenerOptions;

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzInputModule, FormsModule, NzIconModule, NzEmptyModule, NzGridModule, NzDividerModule],
  host: {
    '(window:keyup.enter)': 'onEnterUp()',
    '(window:keyup.arrowUp)': 'onArrowUp()',
    '(window:keyup.arrowDown)': 'onArrowDown()'
  }
})
export class SearchRouteComponent extends BasicConfirmModalComponent implements OnInit, AfterViewInit {
  private menuStoreService = inject(MenuStoreService);
  private router = inject(Router);
  private themesService = inject(ThemeService);

  resultListShow = signal<ResultItem[]>([]);
  resultList: ResultItem[] = [];
  readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  inputValue: string | null = null;
  menuNavList: Menu[] = [];
  destroyRef = inject(DestroyRef);
  override modalRef = inject(NzModalRef);

  changeSelAnswerIndex(dir: 'up' | 'down'): number | null {
    const list = this.resultListShow();
    const index = list.findIndex(item => item.selItem);
    if (index > -1) {
      if (dir === 'up') {
        return index === 0 ? list.length - 1 : index - 1;
      } else {
        return index === list.length - 1 ? 0 : index + 1;
      }
    }
    return null;
  }

  onEnterUp(): void {
    const list = this.resultListShow();
    const index = list.findIndex(item => item.selItem);
    if (index > -1) {
      this.resultClick(list[index]);
    }
  }

  onArrowUp(): void {
    const index = this.changeSelAnswerIndex('up');
    if (index !== null) {
      this.mouseOverItem(this.resultListShow()[index]);
    }
  }

  onArrowDown(): void {
    const index = this.changeSelAnswerIndex('down');
    if (index !== null) {
      this.mouseOverItem(this.resultListShow()[index]);
    }
  }

  resultClick(resultItem: ResultItem): void {
    this.router.navigate([resultItem.routePath]);
    this.modalRef.destroy();
  }

  getResultItem(menu: Menu, fatherTitle = ''): ResultItem[] {
    const fatherTitleTemp = fatherTitle === '' ? menu.menuName : `${fatherTitle} > ${menu.menuName}`;
    const resultItem: ResultItem = {
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
    this.resultListShow.set([]);
  }

  subSearchFn(): void {
    fromEvent(this.searchInput().nativeElement, 'input', passiveEventListenerOptions)
      .pipe(
        map(e => (e.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(item => of(item)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        const matched: ResultItem[] = [];
        this.resultList.forEach(item => {
          if (item.title.includes(res)) {
            matched.push(item);
          }
        });
        if (matched.length > 0) {
          matched.forEach(item => (item.selItem = false));
          matched[0].selItem = true;
        }
        this.resultListShow.set(res ? matched : []);
      });
  }

  mouseOverItem(item: ResultItem): void {
    this.resultListShow.update(list => {
      list.forEach(resultItem => (resultItem.selItem = false));
      item.selItem = true;
      return [...list];
    });
  }

  ngAfterViewInit(): void {
    this.subSearchFn();
  }

  getMenus(): void {
    this.menuStoreService
      .getMenuArrayStore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(menus => {
        this.menuNavList = menus;
      });
  }

  ngOnInit(): void {
    this.getMenus();
    this.resultListFactory();
  }

  override getCurrentValue(): NzSafeAny {}
}
