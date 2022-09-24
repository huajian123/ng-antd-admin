import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DestroyService } from '@core/services/common/destory.service';
import { OptionsInterface } from '@core/services/types';
import { ValidatorsService } from '@core/services/validators/validators.service';
import { User } from '@services/system/account.service';
import { DeptService } from '@services/system/dept.service';
import { RoleService } from '@services/system/role.service';
import { fnCheckForm } from '@utils/tools';
import { fnAddTreeDataGradeAndLeaf, fnFlatDataHasParentToTree } from '@utils/treeTableTools';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';
import * as Const from "src/app/common/const";
import { WebserviceService } from 'src/app/core/services/common/webservice.service';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class AccountModalComponent implements OnInit {
  addEditForm!: FormGroup;
  params!: User;
  roleOptions: OptionsInterface[] = [];
  isEdit = false;
  value?: string;
  deptNodes: NzTreeNodeOptions[] = [];

  listDept: any = [];
  listRole: any = [];
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private roleService: RoleService,
    private deptService: DeptService,
    private webService: WebserviceService
    ) {}

  // 此方法为如果有异步数据需要加载，则在该方法中添加
  protected getAsyncFnData(modalValue: NzSafeAny): Observable<NzSafeAny> {
    return of(modalValue);
  }

  // 返回false则不关闭对话框
  protected getCurrentValue(): Observable<NzSafeAny> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }

  // get list role
  getListRole() {
    this.webService.GetCallWs(Const.Ant100SearchAllRole, (response) => {
      this.roleOptions = [];
      this.listRole = response;
      for(let lst of this.listRole) {
        const obj: OptionsInterface = {
          label: lst.rolename,
          value: lst.id
        };
        this.roleOptions.push(obj);
      }
      console.log(this.roleOptions);
    })
  }

  getListDept() {
    let request = {
      pageNum: 0,
      pageSize: 0
    }
    this.webService.PostCallWs(Const.Ant100getAllPhongban, request,(response) => {
      this.listDept = response.list;
      for(let lst of this.listDept) {
          lst.title = lst.tenphongban;
          lst.key = lst.id;
      }
      const target = fnAddTreeDataGradeAndLeaf(fnFlatDataHasParentToTree(this.listDept));
      this.deptNodes = target;
    })
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      name: [null, [Validators.required]],
      password: ['a123456', [Validators.required, this.validatorsService.passwordValidator()]],
      sex: [1],
      available: [true],
      zalo: [null, [this.validatorsService.zaloValidator()]],
      dienthoai: [null, [this.validatorsService.mobileValidator()]],
      email: [null, [this.validatorsService.emailValidator()]],
      roler_id: [null, [Validators.required]],
      phongban_id: [null, [Validators.required]],
      departmentName: [null]
    });
  }

  ngOnInit(){
    this.initForm();
    this.getListRole();
    this.getListDept();
    this.isEdit = Object.keys(this.params).length > 0;
    if (this.isEdit) {
      this.addEditForm.patchValue(this.params);
      this.addEditForm.controls['password'].disable();
    }
  }
}
