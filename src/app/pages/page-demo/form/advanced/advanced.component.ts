import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageHeaderType} from '@shared/components/page-header/page-header.component';
import {fnCheckForm} from "@utils/tools";
import {NzMessageService} from "ng-zorro-antd/message";
import {
  WarehouseManageFormComponent
} from "@app/pages/page-demo/form/advanced/warehouse-manage-form/warehouse-manage-form.component";
import {TaskManageFormComponent} from "@app/pages/page-demo/form/advanced/task-manage-form/task-manage-form.component";

// 自定义表单
/*https://juejin.cn/post/6844904018922176520*/
@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private fb: FormBuilder, public message: NzMessageService,) {
  }

  submit(): void {
    // @ts-ignore
    if (!fnCheckForm(this.validateForm) | this.warehouseManageComponent.checkForm() | this.taskManageComponent.checkForm()) {
      return;
    }
    this.message.info('控制台打印出了表单数据')
    console.log(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      warehouseManage: [null, [Validators.required]],
      taskManage: [null, [Validators.required]],
    });
  }
}
