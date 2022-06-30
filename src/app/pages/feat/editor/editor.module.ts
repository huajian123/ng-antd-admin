import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    // EditorModule,
    EditorRoutingModule,
    MonacoEditorModule.forRoot()
  ]
})
export class EditorModule { }
