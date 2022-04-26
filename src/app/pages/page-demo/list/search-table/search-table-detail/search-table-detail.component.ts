import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PageHeaderType} from '@shared/components/page-header/page-header.component';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fnCheckForm} from '@utils/tools';

@Component({
  selector: 'app-search-table-detail',
  templateUrl: './search-table-detail.component.html',
  styleUrls: ['./search-table-detail.component.less'],
})
export class SearchTableDetailComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '详情',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '列表页', '查询表格', '详情']
  };
  validateForm!: FormGroup;
  name = '';
  backUrl = '/default/page-demo/list/search-table';

  constructor(private routeParam: ActivatedRoute, public cdr: ChangeDetectorRef, private fb: FormBuilder) {
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
  }

  _onReuseDestroy():void{
    console.log('销毁了');
  }

  ngOnInit(): void {
    this.initForm();
    this.routeParam.queryParams.subscribe(
      params => {
        this.name= params['name'];
        this.validateForm.get('userName')?.setValue(this.name);
      }
    );
  }

}
