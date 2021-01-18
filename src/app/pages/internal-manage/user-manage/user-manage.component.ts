import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
