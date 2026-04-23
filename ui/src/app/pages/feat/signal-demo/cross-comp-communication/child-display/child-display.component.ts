import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-child-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDescriptionsModule, NzTagModule],
  template: `
    <nz-descriptions nzBordered [nzColumn]="1" nzSize="small">
      <nz-descriptions-item nzTitle="value()">{{ value() }}</nz-descriptions-item>
      <nz-descriptions-item nzTitle="upperValue()">
        <nz-tag nzColor="blue">{{ upperValue() }}</nz-tag>
      </nz-descriptions-item>
    </nz-descriptions>
  `
})
export class ChildDisplayComponent {
  readonly value = input.required<string>();
  readonly upperValue = computed(() => this.value().toUpperCase());
}
