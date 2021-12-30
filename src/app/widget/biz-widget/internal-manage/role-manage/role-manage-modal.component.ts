import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {BasicConfirmModalComponent} from '../../../base-modal';
import {fnCheckForm} from '../../../../utils/tools';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-inter-add-edit',
  templateUrl: './role-manage-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManageModalComponent extends BasicConfirmModalComponent implements OnInit {

  addEditForm!: FormGroup;
  override params: object;

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



  // 此方法为如果有异步数据需要加载，则在该方法中添加
  protected getAsyncFnData(modalValue: any): Observable<any> {
    return of(modalValue);
  }

  // 返回false则不关闭对话框
  protected getCurrentValue(): Observable<any> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }


  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.addEditForm.patchValue(this.params);
    }
  }
}
