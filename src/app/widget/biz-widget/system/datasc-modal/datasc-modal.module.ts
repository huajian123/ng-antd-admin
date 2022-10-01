import { NgModule } from '@angular/core';
import { DatascModalComponent } from './datasc-modal.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [DatascModalComponent],
  imports: [SharedModule]
})
export class DatascModalModule { }
