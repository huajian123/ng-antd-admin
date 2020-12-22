import {NgModule} from '@angular/core';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';

import {
  FontSizeOutline
} from '@ant-design/icons-angular/icons';

const icons = [FontSizeOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    {provide: NZ_ICONS, useValue: icons}
  ]
})
export class IconsProviderModule {
}
