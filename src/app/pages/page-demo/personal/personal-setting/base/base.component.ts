import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidatorsService } from '@core/services/validators/validators.service';
import { fnCheckForm } from '@utils/tools';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzGridModule, FormsModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzSelectModule, NgFor, NzButtonModule, NzWaveModule, NgClass, NgIf, NzAvatarModule, NzUploadModule, NzIconModule]
})
export class BaseComponent implements OnInit {
  @Input() data!: { label: string };
  validateForm!: FormGroup;
  selectedProvince = 'Zhejiang';
  selectedCity = 'Hangzhou';
  provinceData = ['Zhejiang', 'Jiangsu'];
  formOrder = 1;
  avatarOrder = 0;
  cityData: { [place: string]: string[] } = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
  };

  constructor(private fb: FormBuilder, private msg: NzMessageService, private validatorsService: ValidatorsService, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {}

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
    this.breakpointObserver.observe(['(max-width: 1200px)']).subscribe(result => {
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
