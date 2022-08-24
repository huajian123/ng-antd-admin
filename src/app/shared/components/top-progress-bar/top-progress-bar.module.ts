import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TopProgressBarComponent } from './top-progress-bar.component';

@NgModule({
  declarations: [TopProgressBarComponent],
  imports: [CommonModule],
  exports: [TopProgressBarComponent]
})
export class TopProgressBarModule {}
