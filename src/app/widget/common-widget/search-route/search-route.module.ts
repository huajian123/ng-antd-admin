import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRouteComponent } from './search-route.component';
import {SHARED_ZORRO_MODULES} from "../../../shared/shared-zorro.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SearchRouteComponent
  ],
    imports: [
        CommonModule,
        SHARED_ZORRO_MODULES,
        FormsModule
    ]
})
export class SearchRouteModule { }
