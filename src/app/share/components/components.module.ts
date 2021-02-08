import {NgModule} from '@angular/core';
import {PageHeaderModule} from './page-header/page-header.module';
import {AntTableModule} from './ant-table/ant-table.module';
import {FooterSubmitModule} from './footer-submit/footer-submit.module';
import {TopProgressBarModule} from './top-progress-bar/top-progress-bar.module';

const MODULES = [FooterSubmitModule, PageHeaderModule, AntTableModule, TopProgressBarModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [
    ...MODULES
  ]
})
export class ComponentsModule {
}
