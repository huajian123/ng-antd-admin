import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@widget/base-modal';
import { AppendFormModalService } from '@widget/biz-widget/form/append-form-modal/append-form-modal.service';

/*
 * 任务对象
 * */
export interface TaskObj {
  id: number;
  taskName: string;
  taskDesc: string;
  taskEvaluate: null;
  equipmentId: number;
  equipmentName: string;
  systemName: string;
  systemId: number;
  taskState: number;
  userName: string;
  taskStateName: string;
  taskUserId: string | string[];
  checkPeriod: string;
  createTime: number;
  updateTime: number;
  endTime: number;
  startTime: number;
  finishRate: number;
}

// 任务搜索条件
export enum TaskStateSearchEnum {
  NoStarted,
  Processing,
  Complete,
  Overdue,
  All
}

// 任务搜索条件
export enum TaskStateSearchCheckPeriodEnum {
  DayCheck,
  MonthCheck,
  QuarterlyCheck,
  YearCheck,
  All
}

@Component({
  selector: 'app-append-form',
  templateUrl: './append-form.component.html',
  styleUrls: ['./append-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppendFormComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '表单增删示例',
    breadcrumb: ['首页', '组件', 'Form', '表单增删'],
    desc: '表单增删示例'
  };
  taskStateSearchEnum = TaskStateSearchEnum;
  taskState = TaskStateSearchEnum.All;
  taskCheckPeriodState = TaskStateSearchCheckPeriodEnum.All;
  pageObj = {
    pageSize: 3,
    pageNum: 1
  };
  showTaskList: TaskObj[] = [];
  showAllTaskList: TaskObj[] = [
    {
      id: 1,
      taskName: '一个任务',
      taskDesc: '一个任务',
      taskEvaluate: null,
      equipmentId: 1,
      equipmentName: '一个任务',
      systemName: '一个任务',
      systemId: 1,
      taskState: 1,
      userName: '小华',
      taskStateName: '一个任务',
      taskUserId: '一个任务',
      checkPeriod: '一个任务',
      createTime: 1,
      updateTime: 1,
      endTime: 1,
      startTime: 1,
      finishRate: 1
    },
    {
      id: 2,
      taskName: '一个任务',
      taskDesc: '一个任务',
      taskEvaluate: null,
      equipmentId: 1,
      equipmentName: '一个任务',
      systemName: '一个任务',
      systemId: 1,
      taskState: 1,
      userName: '小张',
      taskStateName: '一个任务',
      taskUserId: '一个任务',
      checkPeriod: '一个任务',
      createTime: 1,
      updateTime: 1,
      endTime: 1,
      startTime: 1,
      finishRate: 1
    },
    {
      id: 1,
      taskName: '一个任务',
      taskDesc: '一个任务',
      taskEvaluate: null,
      equipmentId: 1,
      equipmentName: '一个任务',
      systemName: '一个任务',
      systemId: 1,
      taskState: 1,
      userName: '小林',
      taskStateName: '一个任务',
      taskUserId: '一个任务',
      checkPeriod: '一个任务',
      createTime: 1,
      updateTime: 1,
      endTime: 1,
      startTime: 1,
      finishRate: 1
    },
    {
      id: 1,
      taskName: '一个任务',
      taskDesc: '一个任务',
      taskEvaluate: null,
      equipmentId: 1,
      equipmentName: '一个任务',
      systemName: '一个任务',
      systemId: 1,
      taskState: 1,
      userName: '小子',
      taskStateName: '一个任务',
      taskUserId: '一个任务',
      checkPeriod: '一个任务',
      createTime: 1,
      updateTime: 1,
      endTime: 1,
      startTime: 1,
      finishRate: 1
    }
  ];
  taskCheckPeriodStateEnum = TaskStateSearchCheckPeriodEnum;
  loading = false;
  constructor(private modalService: AppendFormModalService, private cdr: ChangeDetectorRef) {}

  pageSizeChange(event: number): void {
    this.pageObj = { ...this.pageObj, pageSize: event };
    this.getData(1);
  }

  searchTask(event: number, type: 'checkPeriod' | 'taskState'): void {
    this.pageObj = { ...this.pageObj, pageNum: 1 };

    this.showAllTaskList = this.showAllTaskList.filter(item => {
      return true;
    });

    this.pageSizeChange(this.pageObj.pageSize);
  }

  add(): void {
    this.modalService.show({ nzTitle: '新增' }).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.showAllTaskList.push(modalValue);
      this.getData(1);
      console.log(modalValue);
    });
  }

  onEllipsisChange(ellipsis: boolean): void {
    // console.log(ellipsis);
  }

  // 分页获取数据
  getData(event: number = this.pageObj.pageNum): void {
    this.pageObj = { ...this.pageObj, pageNum: event };
    this.showTaskList = [...this.showAllTaskList.slice((this.pageObj.pageNum - 1) * this.pageObj.pageSize, this.pageObj.pageNum * this.pageObj.pageSize)];
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getData(1);
  }
}
