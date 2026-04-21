import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-heavy-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NzTagModule],
  template: `
    <nz-card [nzBodyStyle]="{ padding: '16px' }" style="border-radius: 8px; border: 1px solid #f0f0f0;">
      <div class="left-start-center" style="gap: 12px">
        <span style="font-size: 32px">{{ icon() }}</span>
        <div>
          <div style="font-weight: 600; font-size: 14px">{{ title() }}</div>
          <div style="color: #8c8c8c; font-size: 12px; margin-top: 2px">{{ desc() }}</div>
        </div>
      </div>
      <div style="margin-top: 12px; display: flex; gap: 6px; flex-wrap: wrap">
        @for (tag of tags(); track tag) {
          <nz-tag [nzColor]="color()">{{ tag }}</nz-tag>
        }
      </div>
    </nz-card>
  `
})
export class HeavyCard {
  readonly icon = input('📦');
  readonly title = input('Heavy Component');
  readonly desc = input('');
  readonly tags = input<string[]>([]);
  readonly color = input('#1890ff');
}
