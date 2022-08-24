import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

// 不要在这里定义，这里只是写个例子
interface WareHouseManageObj {
  warehouseName: string;
  warehouseDomainName: string;
  warehouseManager: string;
  approver: string;
  effectiveTime: string;
  warehouseType: string;
}

const EXE_COUNTER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => WarehouseManageFormComponent)
};

@Component({
  selector: 'app-warehouse-manage-form',
  templateUrl: './warehouse-manage-form.component.html',
  styleUrls: ['./warehouse-manage-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class WarehouseManageFormComponent implements OnInit, ControlValueAccessor {
  validateForm!: FormGroup;
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  constructor(private fb: FormBuilder) {}

  initForm(): void {
    this.validateForm = this.fb.group({
      warehouseName: [null, [Validators.required]],
      warehouseDomainName: [null, [Validators.required]],
      warehouseManager: [null, [Validators.required]],
      approver: [null, [Validators.required]],
      effectiveTime: [null, [Validators.required]],
      warehouseType: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.validateForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(res => {
      this.onChange(res);
    });
  }

  registerOnChange(fn: NzSafeAny): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: NzSafeAny): void {}

  checkForm(): boolean {
    // 用下面方式让formArray每一项置脏（如果有formArray的话，这里只是做个示例）
    /* ((this.validateForm.get('fontImgArray') as FormArray).controls).forEach(item => {
       fnCheckForm(item as FormGroup);
     })*/
    return !fnCheckForm(this.validateForm);
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: WareHouseManageObj): void {
    if (obj) {
      this.validateForm.patchValue(obj);
    }
  }
}
