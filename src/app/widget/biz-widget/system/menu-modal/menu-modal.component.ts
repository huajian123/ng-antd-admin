import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DestroyService} from "@core/services/common/destory.service";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {fnCheckForm} from "@utils/tools";
import {MenuListObj} from "@services/system/menus.service";

// c:菜单，f按钮
type menuType = 'C' | 'F';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class MenuModalComponent implements OnInit {
  validateForm!: FormGroup;
  selIconVisible = false;
  params!: MenuListObj;
  menuType: menuType = "C";

  constructor(private modalRef: NzModalRef,
              private destroy$: DestroyService,
              private fb: FormBuilder) {
  }

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
      alIcon: [null],
    });
  }

  seledIcon(e: string): void {
    this.validateForm.get('icon')?.setValue(e);
  }

  setFormStatusByType(methodName: 'disable' | 'enable') {
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
      this.setFormStatusByType("disable");
    } else {
      this.setFormStatusByType("enable");
    }
  }

  ngOnInit(): void {
    this.initForm();
    if (Object.keys(this.params).length > 0) {
      this.changeMenuType(this.params.menuType)
      this.validateForm.patchValue(this.params);
      console.log(this.params);
    }
  }

}
