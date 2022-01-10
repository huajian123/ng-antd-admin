import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";

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
