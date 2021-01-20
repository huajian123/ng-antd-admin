import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {BasicConfirmModalComponent} from '../../../base-modal';

@Component({
  selector: 'app-inter-add-edit',
  templateUrl: './inter-add-edit.component.html',
  styleUrls: ['./inter-add-edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterAddEditComponent extends BasicConfirmModalComponent implements OnInit {

  addEditForm!: FormGroup;

  constructor(private modalRef: NzModalRef, private fb: FormBuilder) {
    super();
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      roleName: [null, [Validators.required]],
      roleDesc: [null],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected getCurrentValue(): any {
    return {
      test: 'ok'
    };
  }

}
