import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [SharedModule, LoginRoutingModule, LoginComponent]
})
export class LoginModule {}
