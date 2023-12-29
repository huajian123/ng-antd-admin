import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from '@core/services/http/login/login.service';
import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { BasicConfirmModalComponent } from '../../base-modal';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule]
})
export class LoginModalComponent extends BasicConfirmModalComponent implements OnInit {
  loginModalForm!: FormGroup;

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);

  constructor(protected override modalRef: NzModalRef) {
    super(modalRef);
  }

  // 返回false则不关闭对话框
  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.loginModalForm)) {
      return of(false);
    }
    return this.loginService.login(this.loginModalForm.value).pipe(
      catchError(() => {
        return of(false);
      })
    );
  }

  initForm(): void {
    this.loginModalForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
