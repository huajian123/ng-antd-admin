import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BasicConfirmModalComponent} from '../../base-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {fnCheckForm} from '@utils/tools';
import {LoginService} from '@core/services/http/login/login.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent extends BasicConfirmModalComponent implements OnInit {

  loginModalForm!: FormGroup;
  override params: object;

  constructor(protected override modalRef: NzModalRef, private fb: FormBuilder, private loginService: LoginService) {
    super(modalRef);
    this.params = {};
  }

  // 返回false则不关闭对话框
  protected getCurrentValue(): Observable<any> {
    if (!fnCheckForm(this.loginModalForm)) {
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
  }

}
