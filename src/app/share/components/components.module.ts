import {NgModule} from '@angular/core';
import {PageHeaderModule} from './page-header/page-header.module';
import {AntTableModule} from './ant-table/ant-table.module';
import {FooterSubmitModule} from './footer-submit/footer-submit.module';
import {TopProgressBarModule} from './top-progress-bar/top-progress-bar.module';
import {WaterMarkModule} from './water-mark/water-mark.module';

const MODULES = [FooterSubmitModule, PageHeaderModule, AntTableModule, TopProgressBarModule, WaterMarkModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [
    ...MODULES
  ]
})
export class ComponentsModule {
}
