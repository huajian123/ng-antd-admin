import {Component, OnInit, ChangeDetectionStrategy, ViewChild, NgModule} from '@angular/core';
import {BasicConfirmModalComponent} from "@widget/base-modal";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fnCheckForm, fnEncrypt} from "@utils/tools";
import {WindowService} from "@core/services/common/window.service";
import {LockedKey, salt} from "@config/constant";
import {LockScreenFlag, LockScreenStoreService} from "@store/lock-screen-store/lock-screen-store.service";
import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Component({
  selector: 'app-lock-widget',
  templateUrl: './lock-widget.component.html',
  styleUrls: ['./lock-widget.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockWidgetComponent extends BasicConfirmModalComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private lockScreenStoreService: LockScreenStoreService, protected override modalRef: NzModalRef, private fb: FormBuilder, private windowSrv: WindowService) {
    super(modalRef);
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
    const lockedState: LockScreenFlag = {
      locked: true,
      password: this.validateForm.value["password"],
      // @ts-ignore
      beforeLockPath: this.activatedRoute.snapshot['_routerState'].url
    }
    this.lockScreenStoreService.setLockScreenStore(lockedState)
    this.windowSrv.setSessionStorage(LockedKey, fnEncrypt(lockedState, salt));
    this.modalRef.destroy();
    this.router.navigateByUrl(`/blank/empty-for-lock`);
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected getCurrentValue(): NzSafeAny {
    return of(true);
  }

}
