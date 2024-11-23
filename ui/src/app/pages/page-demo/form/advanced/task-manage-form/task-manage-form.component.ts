import { Component, OnInit, ChangeDetectionStrategy, forwardRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { fnCheckForm } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

interface TaskManageObj {
  taskName: string;
  taskDesc: string;
  executor: string;
  responsible: string;
  effectiveTime: string;
  taskType: string;
}

const EXE_COUNTER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => TaskManageFormComponent)
};

@Component({
  selector: 'app-task-manage-form',
  templateUrl: './task-manage-form.component.html',
  styleUrls: ['./task-manage-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EXE_COUNTER_VALUE_ACCESSOR],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NzGridModule, NzFormModule, NzInputModule]
})
export class TaskManageFormComponent implements OnInit, ControlValueAccessor {
  private fb = inject(FormBuilder);

  validateForm!: FormGroup;
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;
  destroyRef = inject(DestroyRef);

  initForm(): void {
    this.validateForm = this.fb.group({
      taskName: [null, [Validators.required]],
      taskDesc: [null, [Validators.required]],
      executor: [null, [Validators.required]],
      responsible: [null, [Validators.required]],
      effectiveTime: [null, [Validators.required]],
      taskType: [null, [Validators.required]]
    });
  }

  checkForm(): boolean {
    // 用下面方式让formArray每一项置脏（如果有formArray的话，这里只是做个示例）
    /* ((this.validateForm.get('fontImgArray') as FormArray).controls).forEach(item => {
       fnCheckForm(item as FormGroup);
     })*/
    return !fnCheckForm(this.validateForm);
  }

  ngOnInit(): void {
    this.initForm();

    this.validateForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.onChange(res);
    });
  }

  registerOnChange(fn: NzSafeAny): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: NzSafeAny): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: TaskManageObj): void {
    if (obj) {
      this.validateForm.patchValue(obj);
    }
  }
}
