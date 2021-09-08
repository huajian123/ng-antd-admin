import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {fnCheckForm} from '../../../utils/tools';
import {UserManageModalService} from "../../../widget/biz-widget/internal-manage/user-manage/user-manage-modal.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit {
  @ViewChild('dragTpl', {static: true}) dragTpl!: TemplateRef<any>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '基础表单',
    desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '表单页', '基础表单']
  };
  listOfOption = [
    {label: '同事甲', value: '同事甲'},
    {label: '同事乙', value: '同事乙'},
    {label: '同事丙', value: '同事丙'},
  ];

  validateForm!: FormGroup;

  show(): void {
    this.userManageModalService.show({nzTitle: this.dragTpl, nzMask: false,nzMaskStyle:{display:'none'},nzWrapClassName:"pointer-events-none"}).subscribe()
  }

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
  }

  constructor(private fb: FormBuilder, private userManageModalService: UserManageModalService) {
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null],
      invitedCommenter: [null],
      weights: [null],
      isPublic: [null],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
