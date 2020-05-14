import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';

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
      ChangePasswordRoutingModule
   ],
   declarations: [
      ChangePasswordComponent
   ],
   providers: [],
   exports: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
