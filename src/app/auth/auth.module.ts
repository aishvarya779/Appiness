import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  declarations: [LoginComponent, SignupComponent],
  providers: [AuthService]
})
export class AuthModule {}
