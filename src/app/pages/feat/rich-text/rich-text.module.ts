import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RichTextRoutingModule } from './rich-text-routing.module';
import { RichTextComponent } from './rich-text.component';
import {SharedModule} from "@shared/shared.module";
import {EditorModule} from "@tinymce/tinymce-angular";


@NgModule({
  declarations: [
    RichTextComponent
  ],
  imports: [
    SharedModule,
    EditorModule,
    RichTextRoutingModule
  ]
})
export class RichTextModule { }
