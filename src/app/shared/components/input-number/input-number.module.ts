import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { InputNumberComponent } from './input-number.component';
import { NumberInputDirective } from './input-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SHARED_ZORRO_MODULES } from '@app/shared/shared-zorro.module';



@NgModule({
  declarations: [
    InputNumberComponent,
    NumberInputDirective
  ],
  imports: [
     CommonModule, FormsModule,ReactiveFormsModule, SHARED_ZORRO_MODULES
  ],
  exports: [InputNumberComponent],
  providers: [DecimalPipe]
})
export class InputNumberModule { }
