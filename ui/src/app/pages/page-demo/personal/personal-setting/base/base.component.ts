import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidatorsService } from '@core/services/validators/validators.service';
import { fnCheckForm } from '@utils/tools';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzGridModule, FormsModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzSelectModule, NzButtonModule, NzWaveModule, NgClass, NzAvatarModule, NzUploadModule, NzIconModule]
})
export class BaseComponent implements OnInit {
  @Input({ required: true }) data!: { label: string };
  validateForm!: FormGroup;
  selectedProvince = 'Zhejiang';
  selectedCity = 'Hangzhou';
  provinceData = ['Zhejiang', 'Jiangsu'];
  formOrder = 1;
  avatarOrder = 0;
  cityData: Record<string, string[]> = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
  };
  destroyRef = inject(DestroyRef);

  private fb = inject(FormBuilder);
  private msg = inject(NzMessageService);
  private validatorsService = inject(ValidatorsService);
  private breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef);

  provinceChange(value: string): void {
    this.selectedCity = this.cityData[value][0];
    this.selectedProvince = value;
    this.validateForm.get('city')?.setValue(this.selectedCity);
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      area: [null, [Validators.required]],
      nickName: [null],
      desc: [null, [Validators.required]],
      city: [null, [Validators.required]],
      province: [null, [Validators.required]],
      mobile: [null, [Validators.required, this.validatorsService.mobileValidator()]],
      telephone: [null, [Validators.required, this.validatorsService.telephoneValidator()]],
      street: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  obBreakPoint(): void {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result.matches) {
          this.formOrder = 1;
          this.avatarOrder = 0;
        } else {
          this.formOrder = 0;
          this.avatarOrder = 1;
        }
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.obBreakPoint();
  }
}
