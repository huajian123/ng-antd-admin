import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ModalBtnStatus } from '@widget/base-modal';
import { TaskModalService } from '@widget/biz-widget/task/task-modal.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule } from '@angular/forms';

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  tags?: string[];
  assignee?: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-list-panel',
  imports: [DragDropModule, FormsModule, NzCardModule, NzIconModule, NzTagModule, NzButtonModule, NzInputModule, NzBadgeModule, NzEmptyModule, NzTooltipModule],
  templateUrl: './task-list-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './task-list-panel.component.less'
})
export class TaskListPanelComponent {
  searchKeyword = signal('');
  private taskModalService = inject(TaskModalService);

  columns = signal<Column[]>([
    {
      id: 'todo',
      title: '未开始',
      color: '#8c8c8c',
      tasks: [
        {
          id: 1,
          title: 'Kubernetes cluster meeting',
          description: '讨论集群扩容方案和监控告警配置',
          status: 'todo',
          priority: 'high',
          dueDate: '2026-03-22',
          tags: ['DevOps', 'K8s'],
          assignee: 'Alice'
        },
        {
          id: 4,
          title: '修复移动端布局问题',
          status: 'todo',
          priority: 'medium',
          dueDate: '2026-03-23',
          tags: ['Bug', 'Mobile']
        },
        {
          id: 5,
          title: '代码 Review：支付模块',
          status: 'todo',
          priority: 'low',
          dueDate: '2026-03-28',
          tags: ['Review'],
          assignee: 'Dave'
        }
      ]
    },
    {
      id: 'in-progress',
      title: '进行中',
      color: '#1890ff',
      tasks: [
        {
          id: 2,
          title: '完成 Angular 信号状态管理重构',
          description: '将现有组件迁移到 signal-based 状态管理',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2026-03-25',
          tags: ['Frontend', 'Angular'],
          assignee: 'Bob'
        },
        {
          id: 6,
          title: '设计新版登录页',
          description: '参考 Figma 稿完成响应式布局',
          status: 'in-progress',
          priority: 'medium',
          dueDate: '2026-03-24',
          tags: ['UI'],
          assignee: 'Carol'
        }
      ]
    },
    {
      id: 'done',
      title: '已完成',
      color: '#52c41a',
      tasks: [
        {
          id: 3,
          title: '更新 API 文档',
          description: '补充新增接口的 Swagger 注释',
          status: 'done',
          priority: 'medium',
          dueDate: '2026-03-20',
          tags: ['Docs'],
          assignee: 'Carol'
        }
      ]
    }
  ]);

  columnIds = computed(() => this.columns().map(c => c.id));

  // 过滤后的列（根据搜索关键词）
  filteredColumns = computed(() => {
    const keyword = this.searchKeyword().toLowerCase().trim();
    if (!keyword) return this.columns();

    return this.columns().map(col => ({
      ...col,
      tasks: col.tasks.filter(
        task =>
          task.title.toLowerCase().includes(keyword) ||
          task.description?.toLowerCase().includes(keyword) ||
          task.tags?.some(tag => tag.toLowerCase().includes(keyword)) ||
          task.assignee?.toLowerCase().includes(keyword)
      )
    }));
  });

  priorityColor: Record<TaskPriority, string> = {
    high: 'red',
    medium: 'orange',
    low: 'default'
  };

  priorityLabel: Record<TaskPriority, string> = {
    high: '紧急',
    medium: '中等',
    low: '普通'
  };

  drop(event: CdkDragDrop<Task[]>, targetColId: TaskStatus) {
    const cols = this.columns();
    const fromColId = event.previousContainer.id as TaskStatus;
    const toColId = targetColId;

    if (fromColId === toColId) {
      // 同列排序
      this.columns.update(list =>
        list.map(col => {
          if (col.id !== fromColId) return col;
          const tasks = [...col.tasks];
          moveItemInArray(tasks, event.previousIndex, event.currentIndex);
          return { ...col, tasks };
        })
      );
    } else {
      // 跨列移动
      const fromCol = cols.find(c => c.id === fromColId)!;
      const toCol = cols.find(c => c.id === toColId)!;
      const fromTasks = [...fromCol.tasks];
      const toTasks = [...toCol.tasks];
      transferArrayItem(fromTasks, toTasks, event.previousIndex, event.currentIndex);

      this.columns.update(list =>
        list.map(col => {
          if (col.id === fromColId) return { ...col, tasks: fromTasks };
          if (col.id === toColId) return { ...col, tasks: toTasks.map(t => ({ ...t, status: toColId })) };
          return col;
        })
      );
    }
  }

  openAddTaskModal() {
    this.taskModalService.show({ nzTitle: '新增任务' }).subscribe(res => {
      if (res.status === ModalBtnStatus.Ok) {
        const formValue = res.modalValue;
        const task: Task = {
          id: Date.now(),
          title: formValue.title,
          description: formValue.description,
          status: 'todo',
          priority: formValue.priority,
          tags: formValue.tags?.length > 0 ? formValue.tags : undefined,
          assignee: formValue.assignee,
          dueDate: formValue.dueDate ? new Date(formValue.dueDate).toISOString().split('T')[0] : undefined
        };
        this.columns.update(list => list.map(col => (col.id === 'todo' ? { ...col, tasks: [task, ...col.tasks] } : col)));
      }
    });
  }

  openEditTaskModal(colId: TaskStatus, task: Task) {
    this.taskModalService
      .show(
        { nzTitle: '编辑任务' },
        {
          id: task.id,
          title: task.title,
          description: task.description,
          priority: task.priority,
          tags: task.tags,
          assignee: task.assignee,
          dueDate: task.dueDate
        }
      )
      .subscribe(res => {
        if (res.status === ModalBtnStatus.Ok) {
          const formValue = res.modalValue;
          this.columns.update(list =>
            list.map(col => {
              if (col.id !== colId) return col;
              return {
                ...col,
                tasks: col.tasks.map(t =>
                  t.id === task.id
                    ? {
                        ...t,
                        title: formValue.title,
                        description: formValue.description,
                        priority: formValue.priority,
                        tags: formValue.tags?.length > 0 ? formValue.tags : undefined,
                        assignee: formValue.assignee,
                        dueDate: formValue.dueDate ? new Date(formValue.dueDate).toISOString().split('T')[0] : undefined
                      }
                    : t
                )
              };
            })
          );
        }
      });
  }

  deleteTask(colId: TaskStatus, taskId: number) {
    this.columns.update(list => list.map(col => (col.id === colId ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) } : col)));
  }

  isOverdue(dueDate?: string): boolean {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date(new Date().toDateString());
  }

  isToday(dueDate?: string): boolean {
    if (!dueDate) return false;
    return dueDate === new Date().toISOString().split('T')[0];
  }
}
