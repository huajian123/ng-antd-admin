import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-personal-setting',
  templateUrl: './personal-setting.component.html',
  styleUrls: ['./personal-setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalSettingComponent implements OnInit {
  menus: Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'base',
      title: '基本设置',
      selected: true,
    },
    {
      key: 'security',
      title: '安全设置',
      selected: false,
    },
    {
      selected: false,
      key: 'binding',
      title: '账号绑定',
    },
    {
      selected: false,
      key: 'notification',
      title: '新消息通知',
    },
  ];

  constructor() {
  }

  to(item: { key: string }): void {
    // this.router.navigateByUrl(`/pro/account/settings/${item.key}`);
  }

  ngOnInit(): void {
  }

}
