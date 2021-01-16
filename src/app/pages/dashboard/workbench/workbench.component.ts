import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkbenchComponent implements OnInit {
  validateForm: FormGroup;
  isCollapse = true;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '查询表格',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '表单页', '基础表单']
  };


  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      ruleName: [null],
      desc: [null],
    });
  }

  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  /*新增*/
  addRow(): void {
  }

  /*重置*/
  resetForm(): void {
    this.validateForm.reset();
  }

  add(): void {
    console.log(123);
  }

  initForm() {

  }

  ngOnInit(): void {

  }
}
