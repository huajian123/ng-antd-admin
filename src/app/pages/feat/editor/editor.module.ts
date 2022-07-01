import { NgModule } from '@angular/core';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import {SharedModule} from "@shared/shared.module";
import { MonacoEditorModule } from 'ngx-monaco-editor';


@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    SharedModule,
    EditorRoutingModule,
    MonacoEditorModule.forRoot()
  ]
})
export class EditorModule { }
