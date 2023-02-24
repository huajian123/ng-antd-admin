import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';

import { RichTextRoutingModule } from './rich-text-routing.module';
import { RichTextComponent } from './rich-text.component';

@NgModule({
    imports: [SharedModule, EditorModule, RichTextRoutingModule, RichTextComponent]
})
export class RichTextModule {}
