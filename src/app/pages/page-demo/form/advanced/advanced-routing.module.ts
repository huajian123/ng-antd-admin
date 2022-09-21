import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvancedComponent } from './advanced.component';

const routes: Routes = [{ path: '', component: AdvancedComponent, data: { title: 'Biểu mẫu nâng cao', key: 'advanced-form' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedRoutingModule {}
