import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NzCardModule, NzAvatarModule, NzIconModule, NzListModule, NgOptimizedImage],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent {}
