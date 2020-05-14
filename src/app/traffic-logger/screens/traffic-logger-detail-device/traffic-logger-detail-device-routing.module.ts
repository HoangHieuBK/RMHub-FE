import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrafficLoggerDetailDeviceComponent } from './traffic-logger-detail-device.component';

const routes: Routes = [
   {
      path: '',
      component: TrafficLoggerDetailDeviceComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RMHubDetailTrafficRoutingModule { }
