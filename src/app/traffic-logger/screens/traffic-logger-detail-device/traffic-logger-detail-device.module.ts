import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RMHubDetailTrafficRoutingModule } from './traffic-logger-detail-device-routing.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { TrafficLoggerDetailDeviceComponent } from './traffic-logger-detail-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { CommonConstant } from '@shared/common/constant.common';

const customNotifierOptions: NotifierOptions = CommonConstant.CONFIG_NOTIFIER;


@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule,
      SharedComponentModule,
      NotifierModule.withConfig(customNotifierOptions),
      RMHubDetailTrafficRoutingModule
   ],
   declarations: [TrafficLoggerDetailDeviceComponent]
})
export class RMHubTrafficLoggerDetailDeviceModule { }
