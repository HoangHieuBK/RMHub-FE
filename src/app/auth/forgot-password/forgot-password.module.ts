import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';

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
      ForgotPasswordRoutingModule
   ],
   declarations: [
      ForgotPasswordComponent
   ],
   providers: [],
   exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
