import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InputCurrencyComponent } from './input-currency.component';
import { CurrencyInputDirective } from './intput-currency.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SHARED_ZORRO_MODULES } from '@app/shared/shared-zorro.module';

@NgModule({
  declarations: [
    InputCurrencyComponent,
    CurrencyInputDirective
  ],
  imports: [
     CommonModule, FormsModule,ReactiveFormsModule , SHARED_ZORRO_MODULES
  ],
  exports: [InputCurrencyComponent],
  providers: [CurrencyPipe]
})
export class InputCurrencyModule { }
