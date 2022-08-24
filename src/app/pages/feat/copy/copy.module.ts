import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { CopyRoutingModule } from './copy-routing.module';
import { CopyComponent } from './copy.component';

@NgModule({
  declarations: [CopyComponent],
  imports: [SharedModule, CopyRoutingModule, ClipboardModule]
})
export class CopyModule {}
