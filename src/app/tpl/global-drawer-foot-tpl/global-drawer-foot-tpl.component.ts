import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

export abstract class GlobalDrawerFootTplComponentToken {
  componentTpl!: TemplateRef<any>;
  readonly sureEmitter = new EventEmitter<void>();
  readonly cancelEmitter = new EventEmitter<void>();
  abstract sure(): void;
  abstract cancel(): void;
}

@Component({
  selector: 'app-global-drawer-foot-tpl',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './global-drawer-foot-tpl.component.html',
  providers: [{ provide: GlobalDrawerFootTplComponentToken, useExisting: GlobalDrawerFootTplComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalDrawerFootTplComponent implements GlobalDrawerFootTplComponentToken {
  @ViewChild('componentTpl', { static: true }) componentTpl!: TemplateRef<any>;
  @Output() readonly sureEmitter = new EventEmitter<void>();
  @Output() readonly cancelEmitter = new EventEmitter<void>();
  sure(): void {
    this.sureEmitter.emit();
  }

  cancel(): void {
    this.cancelEmitter.emit();
  }
}
