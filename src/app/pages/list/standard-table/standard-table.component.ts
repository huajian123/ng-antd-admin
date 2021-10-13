import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PageHeaderType} from '../../../shared/components/page-header/page-header.component';
import {NzProgressStatusType} from 'ng-zorro-antd/progress/typings';

@Component({
  selector: 'app-standard-table',
  templateUrl: './standard-table.component.html',
  styleUrls: ['./standard-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandardTableComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '标准列表',
    breadcrumb: ['首页', '列表页面', '标准列表']
  };
  isSpinning = false;
  list: {
    id: number;
    name: string;
    desc: string;
    avatar: string;
    owner: string;
    owner_id: string;
    time: string;
    progress: number;
    progress_status: NzProgressStatusType
  }[] = [
    {
      id: 1,
      name: 'Alipay',
      desc: '那是一种内在的东西， 他们到达不了，也无法触及的',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      owner: '付小小',
      owner_id: '1',
      time: '2020-11-18 15:12',
      progress: 75,
      progress_status: 'active'
    },
    {
      id: 2,
      name: 'Angular',
      desc: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      owner: '曲丽丽',
      owner_id: '2',
      time: '2020-11-19 07:51',
      progress: 93,
      progress_status: 'exception'
    },
    {
      id: 3,
      name: 'Ant Design',
      desc: '生命就像一盒巧克力，结果往往出人意料',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      owner: '林东东',
      owner_id: '3',
      time: '2020-11-19 05:51',
      progress: 94,
      progress_status: 'active'
    },
    {
      id: 4,
      name: 'Ant Design Pro',
      desc: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      owner: '周星星',
      owner_id: '4',
      time: '2020-11-19 03:51',
      progress: 93,
      progress_status: 'active'
    },
    {
      id: 5,
      name: 'Bootstrap',
      desc: '那时候我只会想自己想要什么，从不想自己拥有什么',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      owner: '吴加好',
      owner_id: '5',
      time: '2020-11-19 01:51',
      progress: 91,
      progress_status: 'exception'
    },
  ];

  constructor() {
  }

  edit(item: any): void {
  }

  deleteItem(item: any): void {

  }

  ngOnInit(): void {
  }

}
