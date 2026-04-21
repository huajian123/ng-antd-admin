import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

export type DynCardTheme = 'blue' | 'green' | 'purple' | 'orange';

const THEME_MAP: Record<DynCardTheme, { bg: string; color: string; tag: string }> = {
  blue:   { bg: '#e6f7ff', color: '#1890ff', tag: 'blue' },
  green:  { bg: '#f6ffed', color: '#52c41a', tag: 'success' },
  purple: { bg: '#f9f0ff', color: '#722ed1', tag: 'purple' },
  orange: { bg: '#fff7e6', color: '#fa8c16', tag: 'orange' }
};

@Component({
  selector: 'app-dyn-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NzButtonModule, NzTagModule],
  template: `
    <nz-card [nzBodyStyle]="{ padding: '20px' }" [style.border-color]="themeStyle().color" class="b-r-8" style="border-width: 2px;">
      <div class="left-start-center m-b-8" style="gap: 12px">
        <span class="sp-28">{{ icon() }}</span>
        <div>
          <div style="font-weight: 600; font-size: 15px">{{ title() }}</div>
          <div class="sp-12 m-t-5" style="color: #8c8c8c">通过 setInput() 注入</div>
        </div>
        <nz-tag style="margin-left: auto" [nzColor]="themeStyle().tag">{{ theme() }}</nz-tag>
      </div>
      <p class="sp-12 m-b-8" style="color: #595959">{{ desc() }}</p>
      <button nz-button [style.border-color]="themeStyle().color" [style.color]="themeStyle().color" (click)="destroy.emit()">
        销毁此组件
      </button>
    </nz-card>
  `
})
export class DynCard {
  readonly title = input('动态组件');
  readonly desc = input('');
  readonly icon = input('📦');
  readonly theme = input<DynCardTheme>('blue');
  readonly destroy = output<void>();

  get themeStyle() {
    return () => THEME_MAP[this.theme()];
  }
}
