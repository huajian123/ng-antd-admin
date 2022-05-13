import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {environment} from "@env/environment";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fnCheckForm} from "@utils/tools";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor(public message: NzMessageService, private fb: FormBuilder,) {
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.type === 'success') {
      if (info.file.response.code === 0) {
        this.message.success('服务器上返回的文件路径：' + info.file.response.data.data)
      }
    }
  }


  uploadFn(e: NzUploadChangeParam): void {
    if (e.type === 'success') {
      if (e.file.response.code === 0) {
        this.validateForm.get('file')?.setValue(e.file.response.data.data)
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
      file: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

}
