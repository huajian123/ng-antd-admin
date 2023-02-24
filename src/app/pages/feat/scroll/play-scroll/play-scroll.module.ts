import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { PlayScrollRoutingModule } from './play-scroll-routing.module';
import { PlayScrollComponent } from './play-scroll.component';

@NgModule({
    imports: [SharedModule, PlayScrollRoutingModule, PlayScrollComponent]
})
export class PlayScrollModule {}
