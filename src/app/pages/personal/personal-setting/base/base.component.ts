import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fnCheckForm} from '../../../../utils/tools';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnInit {
  @Input() data!: { label: string };
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private msg: NzMessageService) {
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null],
      invitedCommenter: [null],
      weights: [null],
      isPublic: [null],
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

  ngOnInit(): void {
    this.initForm();
    console.log(this.data);
  }

}
