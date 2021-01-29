import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BasicConfirmModalComponent} from '../../base-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {fnCheckForm} from '../../../utils/tools';
import {LoginService} from '../../../core/services/http/login/login.service';
import {Observable, of, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent extends BasicConfirmModalComponent implements OnInit {

  constructor(private modalRef: NzModalRef, private fb: FormBuilder, private loginService: LoginService) {
    super();
    this.params = {};
  }

  loginModalForm!: FormGroup;
  params: object;
  flag = false;

  protected getAsyncFnData(modalValue: unknown): any {
    return this.loginService.login(this.loginModalForm.value).pipe(catchError(e => {
      return of(false);
    }));
  }

  // 返回false则不关闭对话框
  protected getCurrentValue(init = false): Observable<any> {
    if (init || !fnCheckForm(this.loginModalForm)) {
      return of(false);
    }
    return this.loginService.login(this.loginModalForm.value).pipe(catchError(() => {
      return of(false);
    }));
  }


  initForm(): void {
    this.loginModalForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentValue(true);

  }

}
