import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SearchListService} from '../../../../core/services/store/biz-store-service/search-list/search-list.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  expanded = false;
  allSelFlag = false;
  searchInfo = {
    owner: ['2', '3'],
    author: null,
    like: null
  };
  tagArray = [
    {name: '类目一', isChecked: false},
    {name: '类目二', isChecked: false},
    {name: '类目三', isChecked: false},
    {name: '类目四', isChecked: false},
    {name: '类目五', isChecked: false},
    {name: '类目六', isChecked: false},
    {name: '类目七', isChecked: false},
    {name: '类目八', isChecked: false},
    {name: '类目九', isChecked: false},
    {name: '类目十', isChecked: false},
    {name: '类目十一', isChecked: false},
    {name: '类目十二', isChecked: false}];

  constructor(private searchListService: SearchListService) {
    this._onReuseInit();
  }

  allSel(): void {
    this.allSelFlag = !this.allSelFlag;
    this.tagArray.forEach(item => {
      item.isChecked = this.allSelFlag;
    });
    this.tagArray = [...this.tagArray];
  }

  _onReuseInit(): void {
    this.searchListService.setCurrentSearchListComponentStore('搜索列表（项目）');
  }

  ngOnInit(): void {
  }

}
