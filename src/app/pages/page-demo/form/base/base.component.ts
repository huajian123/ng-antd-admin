import { ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    NzCardModule,
    WaterMarkComponent,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzRadioModule,
    NzSelectModule,
    NzButtonModule,
    NzWaveModule
  ]
})
export class BaseComponent implements OnInit {
  @ViewChild('dragTpl', { static: true }) dragTpl!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '基础表单',
    desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '表单页', '基础表单']
  };
  listOfOption = [
    { label: '同事甲', value: '同事甲' },
    { label: '同事乙', value: '同事乙' },
    { label: '同事丙', value: '同事丙' }
  ];

  validateForm!: FormGroup;

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
  }
  private fb = inject(FormBuilder);

  initForm(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null],
      invitedCommenter: [null],
      weights: [null],
      isPublic: [null]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
