import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrafficLoggerReportsComponent } from './traffic-logger-reports.component';

const routes: Routes = [
   {
      path: '',
      component: TrafficLoggerReportsComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RMHubReportsRoutingModule { }
