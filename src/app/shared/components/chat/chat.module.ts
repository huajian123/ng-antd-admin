import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {SHARED_ZORRO_MODULES} from '../../shared-zorro.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ChatComponent],
  exports: [
    ChatComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SHARED_ZORRO_MODULES,
    CommonModule
  ]
})
export class ChatModule { }
