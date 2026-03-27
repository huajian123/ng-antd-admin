import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {}
