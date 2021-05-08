import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone} from '@angular/core';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';

interface Task {
  name: string;
  group: string;
}

@Component({
  selector: 'app-except403',
/*  template: `
    <nz-result nzStatus="403" nzTitle="403" nzSubTitle="Sorry, you are not authorized to access this page.">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `,*/
  templateUrl: './except403.component.html',
  styleUrls: ['./except403.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Except403Component implements OnInit {

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '南京化工企业检测计划',
    breadcrumb: ['首页', '设备管理', '工作计划管理', '工作计划']
  };
  taskList: Task[] = [
    {name: '任务一', group: '今天'},
    {name: '任务2', group: '今天'},
    {name: '任务3', group: '明天'},
    {name: '任务4', group: '明天'},
    {name: '任务5', group: '下周'},
    {name: '任务6', group: '下周'},
  ];
  taskGroup: {
    group: string,
    groupItem: Task[]
  }[] = [];

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {
  }

  getTaskGroup(): void {
    this.taskGroup = this.taskList.reduce((r, {group}) => {
      // @ts-ignore
      if (!r.some(o => o.group === group)) {
        // @ts-ignore
        r.push({group, groupItem: this.taskList.filter(v => v.group === group)});
      }
      return r;
    }, []);
  }


  ngOnInit(): void {
    this.getTaskGroup();
    console.log(this.taskGroup);
  }


}
