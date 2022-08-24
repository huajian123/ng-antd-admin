import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';

import { RichTextRoutingModule } from './rich-text-routing.module';
import { RichTextComponent } from './rich-text.component';

@NgModule({
  declarations: [RichTextComponent],
  imports: [SharedModule, EditorModule, RichTextRoutingModule]
})
export class RichTextModule {}
