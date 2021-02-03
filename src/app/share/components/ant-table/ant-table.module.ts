import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AntTableComponent} from './ant-table.component';
import {SHARED_ZORRO_MODULES} from '../../shared-zorro.module';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
  declarations: [AntTableComponent],
    imports: [
        CommonModule,
        SHARED_ZORRO_MODULES,
        PipesModule
    ],
  exports: [
    AntTableComponent
  ]
})
export class AntTableModule {
}
