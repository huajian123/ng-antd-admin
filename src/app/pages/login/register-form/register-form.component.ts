import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzButtonModule, NzInputModule, NzSelectModule, NzWaveModule, RouterLink]
})
export class RegisterFormComponent implements OnInit {
  validateForm!: FormGroup;
  messageService = inject(NzMessageService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // checkPassword: [null, [Validators.required, this.confirmationValidator]],

  /*  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return {required: true};
      } else if (control.value !== this.validateForm.controls.password.value) {
        return {confirm: true, error: true};
      }
      return {};
    };*/

  submitForm(): void {
    const invalid = fnCheckForm(this.validateForm);
    if (!invalid) {
      return;
    }
    this.messageService.success('注册成功，请重新登录');
    this.router.navigateByUrl('login/login-form');
    const param = this.validateForm.getRawValue();

    /* this.dataService.login(param).subscribe((res) => {
       this.router.navigateByUrl('hazard');
     });*/
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
}
