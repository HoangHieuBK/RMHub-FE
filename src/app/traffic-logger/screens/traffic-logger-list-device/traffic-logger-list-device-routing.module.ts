import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrafficLoggerListDeviceComponent } from './traffic-logger-list-device.component';

const routes: Routes = [
   {
      path: '',
      component: TrafficLoggerListDeviceComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RMHubListTrafficRoutingModule { }
