import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginType} from "@app/pages/other-login/login1/login1.component";
import {Login1StoreService} from "@store/biz-store-service/other-login/login1-store.service";
import {takeUntil} from "rxjs/operators";
import {EquipmentWidth, WindowsWidthService} from "@store/common-store/windows-width.service";
import {DestroyService} from "@core/services/common/destory.service";

/*https://www.npmjs.com/package/angular-password-strength-meter*/
@Component({
  selector: 'app-regist-login',
  templateUrl: './regist-login.component.html',
  styleUrls: ['./regist-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class RegistLoginComponent implements OnInit {
  validateForm!: FormGroup;
  typeEnum = LoginType;
  passwordVisible = false;
  compirePasswordVisible = false;

  isOverModel = false;
  equipmentWidthEnum = EquipmentWidth;
  currentEquipmentWidth: EquipmentWidth = EquipmentWidth.md;
  get password() {
    return this.validateForm.get('password');
  }

  constructor(private destroy$: DestroyService,private windowsWidthService: WindowsWidthService,private cdr: ChangeDetectorRef, private fb: FormBuilder, private login1StoreService: Login1StoreService,) {
  }

  subScreenWidth(): void {
    this.windowsWidthService.getWindowWidthStore().subscribe(res => {
      this.currentEquipmentWidth = res;
      this.cdr.markForCheck();
    })
  }

  submitForm(): void {

  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  initForm():void{
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      remember: [null],
    });
  }

  subLogin1Store(): void {
    this.login1StoreService.getIsLogin1OverModelStore().pipe(takeUntil(this.destroy$)).subscribe((res => {
      this.isOverModel = res;
      this.cdr.markForCheck();
    }));
  }

  ngOnInit(): void {
    this.subScreenWidth();
    this.initForm();
    this.subLogin1Store();
  }
}
