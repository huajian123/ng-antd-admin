import { NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DestroyService } from '@core/services/common/destory.service';
import { MenuListObj } from '@services/system/menus.service';
import { IconSelComponent } from '@shared/biz-components/icon-sel/icon-sel.component';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

// c:菜单，f按钮
type menuType = 'C' | 'F';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzRadioModule, NgIf, NzButtonModule, IconSelComponent, NzInputNumberModule, NzSwitchModule]
})
export class MenuModalComponent implements OnInit {
  validateForm!: FormGroup;
  selIconVisible = false;
  params!: MenuListObj;
  menuType: menuType = 'C';

  constructor(private modalRef: NzModalRef, private destroy$: DestroyService, private fb: FormBuilder) {}

  // 返回false则不关闭对话框
  protected getCurrentValue(): Observable<any> {
    if (!fnCheckForm(this.validateForm)) {
      return of(false);
    }
    return of(this.validateForm.value);
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      menuName: [null, [Validators.required]],
      code: [null, [Validators.required]],
      orderNum: [1],
      menuType: ['C'],
      path: [null, [Validators.required]],
      visible: [true],
      status: [true],
      newLinkFlag: [false],
      icon: [null],
      alIcon: [null]
    });
  }

  seledIcon(e: string): void {
    this.validateForm.get('icon')?.setValue(e);
  }

  setFormStatusByType(methodName: 'disable' | 'enable'): void {
    this.validateForm.get('newLinkFlag')?.[methodName]();
    this.validateForm.get('icon')?.[methodName]();
    this.validateForm.get('alIcon')?.[methodName]();
    this.validateForm.get('visible')?.[methodName]();
    this.validateForm.get('path')?.[methodName]();
  }

  // 修改菜单type
  changeMenuType(type: menuType): void {
    this.menuType = type;
    if (type === 'F') {
      this.setFormStatusByType('disable');
    } else {
      this.setFormStatusByType('enable');
    }
  }

  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.changeMenuType(this.params.menuType);
      this.validateForm.patchValue(this.params);
    }
  }
}
