import { ChangeDetectionStrategy, Component, TemplateRef, output, OutputEmitterRef, Signal, viewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export abstract class GlobalDrawerFootTplComponentToken {
  componentTpl!: Signal<TemplateRef<NzSafeAny>>;
  readonly sureEmitter: OutputEmitterRef<void> | undefined;
  readonly cancelEmitter: OutputEmitterRef<void> | undefined;
  abstract sure(): void;
  abstract cancel(): void;
}

@Component({
  selector: 'app-global-drawer-foot-tpl',
  imports: [NzButtonModule],
  templateUrl: './global-drawer-foot-tpl.component.html',
  providers: [{ provide: GlobalDrawerFootTplComponentToken, useExisting: GlobalDrawerFootTplComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalDrawerFootTplComponent implements GlobalDrawerFootTplComponentToken {
  readonly componentTpl: Signal<TemplateRef<NzSafeAny>> = viewChild.required<TemplateRef<NzSafeAny>>('componentTpl');
  readonly sureEmitter = output<void>();
  readonly cancelEmitter = output<void>();
  sure(): void {
    this.sureEmitter.emit();
  }

  cancel(): void {
    this.cancelEmitter.emit();
  }
}
