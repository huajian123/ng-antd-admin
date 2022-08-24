import { NgModule } from '@angular/core';

import { DescRoutingModule } from '@app/pages/comp/desc/desc-routing.module';
import { DescComponent } from '@app/pages/comp/desc/desc.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DescComponent],
  imports: [SharedModule, DescRoutingModule]
})
export class DescModule {}
