import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicRoutingModule } from '@app/pages/comp/basic/basic-routing.module';
import { BasicComponent } from '@app/pages/comp/basic/basic.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [SharedModule, CommonModule, BasicRoutingModule]
})
export class BasicModule {}
