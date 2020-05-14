import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrafficLoggerAlertRulesComponent } from './traffic-logger-alert-rules.component';

const routes: Routes = [
   {
      path: '',
      component: TrafficLoggerAlertRulesComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RMHubAlertRulesRoutingModule { }
