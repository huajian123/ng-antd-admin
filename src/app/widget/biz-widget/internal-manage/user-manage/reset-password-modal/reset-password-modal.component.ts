import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {People} from '../../../../../core/services/types';
import {BasicConfirmModalComponent} from '../../../../base-modal';
import {Observable, of} from 'rxjs';
import {fnCheckForm} from '../../../../../utils/tools';
import {ValidatorsService} from '../../../../../core/services/validators/validators.service';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordModalComponent extends BasicConfirmModalComponent implements OnInit {
  addEditForm!: FormGroup;
  params!: People;

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService) {
    super();
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

  initForm(): void {
    this.addEditForm = this.fb.group({
      password: ['a123456', [Validators.required, this.validatorsService.passwordValidator()]],
    });
  }


  ngOnInit(): void {
    this.initForm();
  }

}
