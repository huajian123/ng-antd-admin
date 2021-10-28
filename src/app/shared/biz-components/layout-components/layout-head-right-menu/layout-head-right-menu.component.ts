import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SimpleReuseStrategy} from "../../../../core/services/common/reuse-strategy";
import {WindowService} from "../../../../core/services/common/window.service";
import {TabService} from "../../../../core/services/common/tab.service";
import {fnFormatePath} from '../../../../utils/tools';
import {SearchRouteService} from "../../../../widget/common-widget/search-route/search-route.service";
import {ModalOptions} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthKey} from "../../../../config/constant";

@Component({
  selector: 'app-layout-head-right-menu',
  templateUrl: './layout-head-right-menu.component.html',
  styleUrls: ['./layout-head-right-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeadRightMenuComponent implements OnInit {

  constructor(private router: Router, private windowServe: WindowService,
              private activatedRoute: ActivatedRoute,
              private searchRouteService: SearchRouteService,
              private tabService: TabService, public message: NzMessageService,) {
  }

  showSearchModal(): void {
    const modalOptions: ModalOptions = {
      nzClosable: false,
      nzMaskClosable: true,
      nzStyle: {top: '48px'},
      nzFooter: null,
      nzBodyStyle: {padding: '0'}
    };
    this.searchRouteService.show(modalOptions)
  }

  goLogin(): void {
    this.tabService.clearTabs();
    this.windowServe.removeStorage(AuthKey);
    SimpleReuseStrategy.handlers = {};
    // @ts-ignore
    SimpleReuseStrategy.waitDelete = fnFormatePath(this.activatedRoute.snapshot['_routerState'].url);
    this.router.navigate(['/login/login-form']);
  }

  showMessage(): void {
    this.message.info('多语言不做，用的太少，删起来太麻烦')
  }

  goPage(path: string): void {
    this.router.navigateByUrl(`/default/personal/${path}`);
  }

  ngOnInit(): void {
  }

}
