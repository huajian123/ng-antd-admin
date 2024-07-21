import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { ExDrawerDrawerService } from '@app/drawer/biz-drawer/ex-drawer-drawer/ex-drawer-drawer.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@widget/base-modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-ex-drawer',
  templateUrl: './ex-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzInputModule, FormsModule, NzButtonModule, NzWaveModule]
})
export class ExDrawerComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '抽屉封装',
    breadcrumb: ['首页', '抽屉封装'],
    desc: '小小的抽屉里面藏着我好多大大的梦想'
  };
  data = '';
  dataFromDrawer = '';
  destroyRef = inject(DestroyRef);
  private drawerService = inject(ExDrawerDrawerService);
  private cdr = inject(ChangeDetectorRef);

  showDrawer(): void {
    this.drawerService
      .show({ nzTitle: '服务创建' }, { name: this.data })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        this.dataFromDrawer = modalValue.password;
        this.cdr.markForCheck();
      });
  }
}
