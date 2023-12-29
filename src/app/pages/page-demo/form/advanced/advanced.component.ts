import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskManageFormComponent } from '@app/pages/page-demo/form/advanced/task-manage-form/task-manage-form.component';
import { WarehouseManageFormComponent } from '@app/pages/page-demo/form/advanced/warehouse-manage-form/warehouse-manage-form.component';
import { FooterSubmitComponent } from '@shared/components/footer-submit/footer-submit.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';

import { TaskManageFormComponent as TaskManageFormComponent_1 } from './task-manage-form/task-manage-form.component';
import { UserMemberManageComponent } from './user-member-manage/user-member-manage.component';
import { WarehouseManageFormComponent as WarehouseManageFormComponent_1 } from './warehouse-manage-form/warehouse-manage-form.component';

// 自定义表单
/*https://juejin.cn/post/6844904018922176520*/
@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCardModule,
    WaterMarkComponent,
    WarehouseManageFormComponent_1,
    TaskManageFormComponent_1,
    UserMemberManageComponent,
    FooterSubmitComponent,
    NzButtonModule,
    NzWaveModule
  ]
})
export class AdvancedComponent implements OnInit {
  @ViewChild('warehouseManageComponent') warehouseManageComponent!: WarehouseManageFormComponent;
  @ViewChild('taskManageComponent') taskManageComponent!: TaskManageFormComponent;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '高级表单',
    desc: '高级表单常见于一次性输入和提交大批量数据的场景。(演示自定义表单)',
    breadcrumb: ['首页', '表单页', '高级表单']
  };
  validateForm!: FormGroup;

  private fb = inject(FormBuilder);
  private message = inject(NzMessageService);

  submit(): void {
    // @ts-ignore
    if (!fnCheckForm(this.validateForm) | this.warehouseManageComponent.checkForm() | this.taskManageComponent.checkForm()) {
      return;
    }
    this.message.info('控制台打印出了表单数据');
    console.log(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      warehouseManage: [null, [Validators.required]],
      taskManage: [null, [Validators.required]]
    });
  }
}
