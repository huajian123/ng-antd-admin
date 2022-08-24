import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';
import { ModalWrapService } from '@widget/base-modal';

import { SearchRouteComponent } from './search-route.component';
@NgModule({
  declarations: [SearchRouteComponent],
  imports: [CommonModule, SHARED_ZORRO_MODULES, FormsModule],
  providers: [ModalWrapService]
})
export class SearchRouteModule {}
