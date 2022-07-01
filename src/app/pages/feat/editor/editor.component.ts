import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnDestroy {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '代码编辑器，vscode的起源',
    breadcrumb: ['首页', '扩展功能', '代码编辑器'],
  };
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = 'function x() {\n\tconsole.log("Hello world!");\n}';

  constructor() {
  }

  initEditor(): void {

  }

  ngOnInit(): void {
    this.initEditor();
  }

  ngOnDestroy(): void {
    // this.monacoInstance.dispose()
  }

}
