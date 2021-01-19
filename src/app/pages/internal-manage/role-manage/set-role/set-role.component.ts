import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetRoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
