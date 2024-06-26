import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-user-member-manage',
  templateUrl: './user-member-manage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzTableModule, NzInputModule, FormsModule, NzPopconfirmModule, NzButtonModule, NzWaveModule, NzIconModule]
})
export class UserMemberManageComponent implements OnInit {
  // 表格
  editCache: Record<string, { edit: boolean; data: ItemData }> = {};
  listOfData: ItemData[] = [];
  constructor() {}

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }
    this.listOfData = data;
    this.updateEditCache();
  }
}
