import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { IconSelComponent } from './icon-sel.component';

@NgModule({
    exports: [IconSelComponent],
    imports: [SharedModule, IconSelComponent]
})
export class IconSelModule {}
