import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * 此组件用于在tab刷新时临时跳转用
 */
@Component({
  selector: 'app-refresh-empty',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ''
})
export class RefreshEmptyComponent {}
