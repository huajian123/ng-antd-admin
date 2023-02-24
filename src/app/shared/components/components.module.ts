import { NgModule } from '@angular/core';

import { LockScreenModule } from '@shared/components/lock-screen/lock-screen.module';
import { TreeTableModule } from '@shared/components/tree-table/tree-table.module';

import { AntTableModule } from './ant-table/ant-table.module';






const MODULES = [LockScreenModule, TreeTableModule, AntTableModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES]
})
export class ComponentsModule {}
