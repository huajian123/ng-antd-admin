import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener, Inject} from '@angular/core';
import {ThemeService} from "@store/common-store/theme.service";
import {Menu} from "@core/services/types";
import {fromEvent, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {NzModalRef} from "ng-zorro-antd/modal";
import {MENU_TOKEN} from "@config/menu";
import {BasicConfirmModalComponent} from "@widget/base-modal";
import {NzSafeAny} from "ng-zorro-antd/core/types";

interface ResultItem {
  showIcon: boolean;
  title: string;
  routePath: string;
  icon: string;
}

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchRouteComponent extends BasicConfirmModalComponent implements OnInit, AfterViewInit {
  isNightTheme$ = this.themesService.getIsNightTheme();
  resultListShow: ResultItem[] = [];
  resultList: ResultItem[] = [];
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  inputValue: string | null = null;

  constructor(private themesService: ThemeService, private cdr: ChangeDetectorRef,
              @Inject(MENU_TOKEN) private menuNavList: Menu[],
              private router: Router, protected override modalRef: NzModalRef) {
    super(modalRef);
  }

  changeSelAnswerIndex(dir: 'up' | 'down'): number | null {
    const index = this.resultListShow.findIndex(item => item.showIcon);
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
      return null
    }
  }

  @HostListener('window:keyup.enter')
  onEnterUp() {
    const index = this.resultListShow.findIndex(item => item.showIcon);
    if (index > -1) {
      this.resultClick(this.resultListShow[index]);
    }
  }

  @HostListener('window:keyup.arrowUp')
  onArrowUp() {
    const index = this.changeSelAnswerIndex("up");
    if (index !== null) {
      this.mouseOverItem(this.resultListShow[index]);
    }
  }

  @HostListener('window:keyup.arrowDown')
  onArrowDown() {
    const index = this.changeSelAnswerIndex("down");
    if (index !== null) {
      this.mouseOverItem(this.resultListShow[index]);
    }
  }

  resultClick(resultItem: ResultItem): void {
    this.router.navigate([resultItem.routePath]);
    this.modalRef.destroy();
  }


  getResultItem(menu: Menu, fatherTitle: string = ''): ResultItem[] {
    const fatherTitleTemp = fatherTitle === '' ? menu.title : fatherTitle + ' > ' + menu.title;
    let resultItem: ResultItem = {
      title: fatherTitleTemp,
      routePath: menu.path!,
      showIcon: false,
      icon: menu.icon!
    }
    if (menu.children && menu.children.length > 0) {
      let resultArrayTemp: ResultItem[] = []
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
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      map(e => (e.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((item) => {
        return of(item)
      })
    ).subscribe(res => {
      this.resultListShow = [];
      this.resultList.forEach(item => {
        if (item.title.includes(res)) {
          this.resultListShow.push(item)
        }
      });
      if (this.resultListShow.length > 0) {
        this.resultListShow[0].showIcon = true;
      }
      this.resultListShow = [...this.resultListShow];
      // 清空搜索条件时将结果集置空
      if (!res) {
        this.resultListShow = [];
      }
      this.cdr.markForCheck();
    })
  }

  mouseOverItem(item: ResultItem): void {
    this.resultListShow.forEach(resultItem => {
      resultItem.showIcon = false;
    })
    item.showIcon = true;
  }

  ngAfterViewInit(): void {
    this.subSearchFn();
  }

  ngOnInit(): void {
    this.resultListFactory();
  }

  protected getCurrentValue(): NzSafeAny {
  }

}
