import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { IconSelComponent } from './icon-sel.component';

@NgModule({
  declarations: [IconSelComponent],
  exports: [IconSelComponent],
  imports: [SharedModule]
})
export class IconSelModule {}
