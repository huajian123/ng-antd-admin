import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BasicConfirmModalComponent} from '../../../base-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {Observable, of} from 'rxjs';
import {fnCheckForm} from '../../../../utils/tools';
import {ValidatorsService} from '../../../../core/services/validators/validators.service';
import {DeptManageService} from '../../../../core/services/http/internal-manage/dept-manage.service';
import {CascaderOption, DeptObj, OptionsInterface, People} from '../../../../core/services/types';
import {RoleService} from '../../../../core/services/http/internal-manage/role.service';

@Component({
  selector: 'app-user-manage-modal',
  templateUrl: './user-manage-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManageModalComponent extends BasicConfirmModalComponent implements OnInit {

  addEditForm!: FormGroup;
  params!: People;
  deptOptions: CascaderOption[] = [];
  roleOptions: OptionsInterface[] = [];
  isEdit = false;

  constructor(private modalRef: NzModalRef, private fb: FormBuilder,
              private validatorsService: ValidatorsService, private deptService: DeptManageService,
              private roleService: RoleService) {
    super();
  }


  // 此方法为如果有异步数据需要加载，则在该方法中添加
  protected getAsyncFnData(modalValue: any): Observable<any> {
    return of(modalValue);
  }

  // 返回false则不关闭对话框
  protected getCurrentValue(): Observable<any> {
    if (!fnCheckForm(this.addEditForm)) {
      return of(false);
    }
    return of(this.addEditForm.value);
  }


  transtormDept(deptArray: DeptObj[]): CascaderOption[] {
    const tempArray: CascaderOption[] = [];
    deptArray.forEach((item) => {
      const deptOptionObj: CascaderOption = {
        label: item.departmentName,
        value: item.id
      };
      if (item.departmentVos && item.departmentVos.length > 0) {
        deptOptionObj.children = this.transtormDept(item.departmentVos);
      } else {
        deptOptionObj.isLeaf = true;
      }
      tempArray.push(deptOptionObj);
    });

    return tempArray;
  }

  getDeptList(): void {
    this.deptService.getDeptList().subscribe(res => {
      this.deptOptions = this.transtormDept(res);
    });
  }

  getRoleList(): void {
    this.roleService.getRoles({pageNum: 0, pageSize: 0}).subscribe(({list}) => {
      this.roleOptions = [];
      list.forEach(({id, roleName}) => {
        const obj: OptionsInterface = {
          label: roleName,
          value: id!,
        };
        this.roleOptions.push(obj);
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
      mobile: [null, [Validators.required, this.validatorsService.mobileValidator()]],
      email: [null, [this.validatorsService.emailValidator()]],
      departmentId: [null],
      roleId: [null],
    });
  }


  ngOnInit(): void {
    this.initForm();
    this.getDeptList();
    this.getRoleList();
    if (Object.keys(this.params).length > 0) {
      this.params.departmentId = [
        this.params.firstDepartmentGradeId,
        this.params.secondDepartmentGradeId,
        this.params.thirdDepartmentGradeId].filter(item => item !== null);
      this.isEdit = true;
      this.addEditForm.patchValue(this.params);
      this.addEditForm.controls['password'].disable();
    }
  }
}
