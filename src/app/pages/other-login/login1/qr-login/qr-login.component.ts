import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginType} from "@app/pages/other-login/login1/login1.component";
import {Login1StoreService} from "@store/biz-store-service/other-login/login1-store.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-qr-login',
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrLoginComponent implements OnInit, OnDestroy {

  validateForm!: FormGroup;
  password?: string;
  typeEnum = LoginType;
  private destory$ = new Subject<void>();
  isOverModel = false;
  constructor(private cdr: ChangeDetectorRef,private fb: FormBuilder, private login1StoreService: Login1StoreService,) {
  }

  submitForm(): void {

  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.login1StoreService.getIsLogin1OverModelStore().pipe(takeUntil(this.destory$)).pipe(takeUntil(this.destory$)).subscribe((res => {
      this.isOverModel = res;
      this.cdr.markForCheck();
    }));
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null],
    });
  }
  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
