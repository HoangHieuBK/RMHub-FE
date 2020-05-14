import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { RMHubListTrafficRoutingModule } from './traffic-logger-list-device-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrafficLoggerListDeviceComponent } from './traffic-logger-list-device.component';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';

const customNotifierOptions: NotifierOptions = CommonConstant.CONFIG_NOTIFIER;

@NgModule({
   imports: [
      CommonModule,
      NgxPaginationModule,
      SharedComponentModule,
      TranslateModule,
      ReactiveFormsModule,
      FormsModule,
      NotifierModule.withConfig(customNotifierOptions),
      RMHubListTrafficRoutingModule
   ],
   declarations: [TrafficLoggerListDeviceComponent]
})
export class RMHubTrafficLoggerListDeviceModule { }
