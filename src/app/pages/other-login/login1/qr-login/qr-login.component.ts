import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginType} from "@app/pages/other-login/login1/login1.component";
import {Login1StoreService} from "@store/biz-store-service/other-login/login1-store.service";
import {takeUntil} from "rxjs/operators";
import {DestroyService} from "@core/services/common/destory.service";

@Component({
  selector: 'app-qr-login',
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class QrLoginComponent implements OnInit {

  validateForm!: FormGroup;
  password?: string;
  typeEnum = LoginType;
  isOverModel = false;
  constructor(private destroy$: DestroyService,private cdr: ChangeDetectorRef,private fb: FormBuilder, private login1StoreService: Login1StoreService,) {
  }

  submitForm(): void {

  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.login1StoreService.getIsLogin1OverModelStore().pipe(takeUntil(this.destroy$)).subscribe((res => {
      this.isOverModel = res;
      this.cdr.markForCheck();
    }));
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }
}
