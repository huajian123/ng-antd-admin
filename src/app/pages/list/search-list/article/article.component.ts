import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {SearchListService} from '../../../../core/services/store/biz-store-service/search-list/search-list.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {

  constructor(private searchListService: SearchListService) {
    this._onReuseInit();
  }

  _onReuseInit(): void {
    this.searchListService.setCurrentSearchListComponentStore('搜索列表（文章）');
  }

  ngOnInit(): void {
  }

}
