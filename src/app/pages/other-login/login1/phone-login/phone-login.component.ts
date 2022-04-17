import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginType} from "@app/pages/other-login/login1/login1.component";
import {Login1StoreService} from "@store/biz-store-service/other-login/login1-store.service";
import {takeUntil} from "rxjs/operators";
import {EquipmentWidth, WindowsWidthService} from "@store/common-store/windows-width.service";
import {DestroyService} from "@core/services/common/destory.service";

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class PhoneLoginComponent implements OnInit {
  validateForm!: FormGroup;
  password?: string;
  typeEnum = LoginType;
  equipmentWidthEnum = EquipmentWidth;
  isOverModel = false;
  currentEquipmentWidth: EquipmentWidth = EquipmentWidth.md;

  constructor(private destroy$: DestroyService,private windowsWidthService: WindowsWidthService, private cdr: ChangeDetectorRef, private fb: FormBuilder, private login1StoreService: Login1StoreService,) {
  }

  submitForm(): void {

  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }

  subLogin1Store(): void {
    this.login1StoreService.getIsLogin1OverModelStore().pipe(takeUntil(this.destroy$)).subscribe((res => {
      this.isOverModel = res;
      this.cdr.markForCheck();
    }));
  }

  subScreenWidth(): void {
    this.windowsWidthService.getWindowWidthStore().pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.currentEquipmentWidth = res;
      this.cdr.markForCheck();
    })
  }

  ngOnInit(): void {
    this.subScreenWidth();
    this.subLogin1Store();
    this.initForm();
  }
}
