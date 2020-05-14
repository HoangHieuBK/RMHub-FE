import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';

import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthApiClientService } from './auth-api-client.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthSandbox } from './auth.sandbox';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
   imports: [
      CommonModule,
      SharedComponentModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      HttpClientModule,
      // Third party modules
      TranslateModule,
      SimpleNotificationsModule,
      AuthRoutingModule,
   ],
   declarations: [
      LoginComponent
   ],
   providers: [
      AuthService,
      AuthApiClientService,
      AuthSandbox
   ],
   exports: [LoginComponent]
})
export class AuthModule { }
