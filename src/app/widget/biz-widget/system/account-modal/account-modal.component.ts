import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DestroyService} from "@core/services/common/destory.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {Observable, of} from "rxjs";
import {fnCheckForm} from "@utils/tools";
import {OptionsInterface} from "@core/services/types";
import {ValidatorsService} from "@core/services/validators/validators.service";
import {RoleService} from "@services/system/role.service";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {DeptService} from "@services/system/dept.service";
import {fnAddTreeDataGradeAndLeaf, fnFlatDataHasParentToTree} from "@utils/treeTableTools";
import {NzTreeNodeOptions} from "ng-zorro-antd/core/tree";
import {User} from "@services/system/account.service";

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


  constructor(private modalRef: NzModalRef, private fb: FormBuilder,
              private validatorsService: ValidatorsService,
              private roleService: RoleService, private deptService: DeptService) {
  }


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


  getRoleList(): Promise<void> {
    return new Promise<void>(resolve => {
      this.roleService.getRoles({pageNum: 0, pageSize: 0}).subscribe(({list}) => {
        this.roleOptions = [];
        list.forEach(({id, roleName}) => {
          const obj: OptionsInterface = {
            label: roleName,
            value: id!,
          };
          this.roleOptions.push(obj);
        });
        resolve();
      });
    });
  }

  getDeptList(): Promise<void> {
    return new Promise<void>(resolve => {
      this.deptService.getDepts({pageNum: 0, pageSize: 0}).subscribe(({list}) => {
        list.forEach(item => {
          // @ts-ignore
          item.title = item.departmentName
          // @ts-ignore
          item.key = item.id;
        });

        const target = fnAddTreeDataGradeAndLeaf(fnFlatDataHasParentToTree(list));
        this.deptNodes = target;
        resolve();
      });
    });
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: ['a123456', [Validators.required, this.validatorsService.passwordValidator()]],
      sex: [1],
      available: [true],
      telephone: [null, [this.validatorsService.telephoneValidator()]],
      mobile: [null, [this.validatorsService.mobileValidator()]],
      email: [null, [this.validatorsService.emailValidator()]],
      roleId: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
      departmentName: [null],
    });
  }


  async ngOnInit(): Promise<void> {
    this.initForm();
    this.isEdit = Object.keys(this.params).length > 0;
    await Promise.all([this.getRoleList(), this.getDeptList()]);
    if (this.isEdit) {
      this.addEditForm.patchValue(this.params);
      this.addEditForm.controls['password'].disable();
    }
  }


}
