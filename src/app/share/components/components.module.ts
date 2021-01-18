import {NgModule} from '@angular/core';
import {PageHeaderModule} from './page-header/page-header.module';
import {AntTableModule} from './ant-table/ant-table.module';


@NgModule({
  declarations: [],
  imports: [
    PageHeaderModule, AntTableModule,
  ],
  exports: [
    PageHeaderModule, AntTableModule,
  ]
})
export class ComponentsModule {
}
