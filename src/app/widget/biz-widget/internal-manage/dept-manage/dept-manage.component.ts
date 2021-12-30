import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BasicConfirmModalComponent} from '../../../base-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {fnCheckForm} from '../../../../utils/tools';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dept-manage',
  templateUrl: './dept-manage.component.html',
  styleUrls: ['./dept-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeptManageComponent extends BasicConfirmModalComponent implements OnInit {
  addEditForm!: FormGroup;
  override params: object;

  constructor(private modalRef: NzModalRef, private fb: FormBuilder) {
    super();
    this.params = {};
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      departmentName: [null, [Validators.required]],
    });
  }

  // 此方法为如果有异步数据需要加载，则在该方法中添加
  protected getAsyncFnData(modalValue: any): Observable<any> {
    return of(modalValue);
  }

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
