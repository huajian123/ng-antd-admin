import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {BasicConfirmModalComponent} from '../../../base-modal';
import {fnCheckForm} from '../../../../utils/tools';

@Component({
  selector: 'app-inter-add-edit',
  templateUrl: './inter-add-edit.component.html',
  styleUrls: ['./inter-add-edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterAddEditComponent extends BasicConfirmModalComponent implements OnInit {

  addEditForm!: FormGroup;
  params: object;

  constructor(private modalRef: NzModalRef, private fb: FormBuilder) {
    super();
    this.params = {};
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      roleName: [null, [Validators.required]],
      roleDesc: [null],
    });
  }

  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.addEditForm.patchValue(this.params);
    }
  }

  // 返回false则不关闭对话框
  protected getCurrentValue(): any {
    if (!fnCheckForm(this.addEditForm)) {
      return fnCheckForm(this.addEditForm);
    }
    return this.addEditForm.value;
  }

}
