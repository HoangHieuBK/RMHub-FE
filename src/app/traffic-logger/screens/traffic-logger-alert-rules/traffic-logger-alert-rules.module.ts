import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';

import { RMHubAlertRulesRoutingModule } from './traffic-logger-alert-rules-routing.module';
import { TrafficLoggerAlertRulesComponent } from './traffic-logger-alert-rules.component';
import { TranslateModule } from '@ngx-translate/core';
import { TrafficAlertFormModule } from '@app/traffic-logger/components/traffic-alert-form.module';
import { TrafficAlertFormComponent } from '@app/traffic-logger/components/traffic-alert-form/traffic-alert-form.component';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { CommonConstant } from '@shared/common/constant.common';



const customNotifierOptions: NotifierOptions = CommonConstant.CONFIG_NOTIFIER;

@NgModule({
   imports: [
      CommonModule,
      SharedComponentModule,
      ReactiveFormsModule,
      FormsModule,
      TranslateModule,
      TrafficAlertFormModule,
      NotifierModule.withConfig(customNotifierOptions),
      RMHubAlertRulesRoutingModule
   ],
   declarations: [TrafficLoggerAlertRulesComponent],
   entryComponents: [TrafficAlertFormComponent]
})
export class RMHubTrafficLoggerAlertRulesModule { }
