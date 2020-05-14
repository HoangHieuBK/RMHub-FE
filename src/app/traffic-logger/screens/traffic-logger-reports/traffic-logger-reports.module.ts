import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RMHubReportsRoutingModule } from './traffic-logger-reports-routing.module';
import { TrafficLoggerReportsComponent } from './traffic-logger-reports.component';

@NgModule({
   imports: [
      CommonModule,
      RMHubReportsRoutingModule
   ],
   declarations: [TrafficLoggerReportsComponent]
})
export class RMHubTrafficLoggerReportsModule { }
