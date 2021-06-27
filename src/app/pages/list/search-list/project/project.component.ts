import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SearchListService} from '../../../../core/services/store/biz-store-service/search-list/search-list.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {

  constructor(private searchListService: SearchListService) {
    this._onReuseInit();
  }

  _onReuseInit(): void {
    this.searchListService.setCurrentSearchListComponentStore('搜索列表（项目）');
  }

  ngOnInit(): void {
  }

}
