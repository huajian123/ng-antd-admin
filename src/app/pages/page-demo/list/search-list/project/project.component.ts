import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SearchListStoreService } from '@store/biz-store-service/search-list/search-list-store.service';
import { NumberLoopPipe } from '../../../../../shared/pipes/number-loop.pipe';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgStyle, NgFor, NgIf } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { WaterMarkComponent } from '../../../../../shared/components/water-mark/water-mark.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzCardModule, WaterMarkComponent, NzGridModule, NgStyle, NzTagModule, NgFor, NgIf, NzIconModule, NzButtonModule, NzDividerModule, NzSelectModule, FormsModule, NzTypographyModule, NzAvatarModule, NzToolTipModule, NumberLoopPipe]
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
    { name: '类目一', isChecked: false },
    { name: '类目二', isChecked: false },
    { name: '类目三', isChecked: false },
    { name: '类目四', isChecked: false },
    { name: '类目五', isChecked: false },
    { name: '类目六', isChecked: false },
    { name: '类目七', isChecked: false },
    { name: '类目八', isChecked: false },
    { name: '类目九', isChecked: false },
    { name: '类目十', isChecked: false },
    { name: '类目十一', isChecked: false },
    { name: '类目十二', isChecked: false }
  ];

  constructor(private searchListService: SearchListStoreService) {
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

  ngOnInit(): void {}
}
