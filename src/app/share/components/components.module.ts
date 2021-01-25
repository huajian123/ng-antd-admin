import {NgModule} from '@angular/core';
import {PageHeaderModule} from './page-header/page-header.module';
import {AntTableModule} from './ant-table/ant-table.module';
import {FooterSubmitModule} from './footer-submit/footer-submit.module';

const MODULES = [FooterSubmitModule, PageHeaderModule, AntTableModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [
    ...MODULES
  ]
})
export class ComponentsModule {
}
