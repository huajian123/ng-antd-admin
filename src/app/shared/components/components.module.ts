import { NgModule } from '@angular/core';

import { LockScreenModule } from '@shared/components/lock-screen/lock-screen.module';
import { TreeTableModule } from '@shared/components/tree-table/tree-table.module';

import { AntTableModule } from './ant-table/ant-table.module';
import { ChatModule } from './chat/chat.module';
import { FooterSubmitModule } from './footer-submit/footer-submit.module';
import { PageHeaderModule } from './page-header/page-header.module';
import { TopProgressBarModule } from './top-progress-bar/top-progress-bar.module';
import { WaterMarkModule } from './water-mark/water-mark.module';

const MODULES = [LockScreenModule, TreeTableModule, FooterSubmitModule, ChatModule, PageHeaderModule, AntTableModule, TopProgressBarModule, WaterMarkModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES]
})
export class ComponentsModule {}
