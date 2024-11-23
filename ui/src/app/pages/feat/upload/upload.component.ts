import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '@env/environment';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzUploadModule, NzButtonModule, NzWaveModule, NzIconModule, FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule]
})
export class UploadComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '文件上传',
    breadcrumb: ['首页', '功能', '文件上传'],
    desc: '简单弄一下，返回的都是服务器统一返回的文件'
  };
  uploadUrl = environment.production ? '/api/file/test/upload/document/' : '/site/api/file/test/upload/document/';
  fileList: NzUploadFile[] = [];
  fileFormList: NzUploadFile[] = [];
  validateForm!: FormGroup;
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  handleChange(info: NzUploadChangeParam): void {
    if (info.type === 'success') {
      if (info.file.response.code === 0) {
        this.message.success(`服务器上返回的文件路径：${info.file.response.data.data}`);
      }
    }
  }

  uploadFn(e: NzUploadChangeParam): void {
    if (e.type === 'success') {
      if (e.file.response.code === 0) {
        this.validateForm.get('file')?.setValue(e.file.response.data.data);
      }
    }
  }

  resetForm(): void {
    this.validateForm.reset();
    this.fileFormList = [];
  }

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      file: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
