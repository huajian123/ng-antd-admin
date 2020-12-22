import {NgModule} from '@angular/core';
import {SHARED_ZORRO_MODULES} from './shared-zorro.module';

const MODULES = [
  ...SHARED_ZORRO_MODULES
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class ShareModule {
}
