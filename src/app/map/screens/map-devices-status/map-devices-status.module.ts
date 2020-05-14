import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapDevicesStatusRoutingModule } from './map-devices-status-routing.module';
import { MapDevicesStatusComponent } from './map-devices-status.component';
import { RMHubMapComponentModule } from '@app/map/components/map-component.module';

@NgModule({
  imports: [
    CommonModule,
    MapDevicesStatusRoutingModule,
    RMHubMapComponentModule
  ],
  exports: [MapDevicesStatusComponent],
  declarations: [MapDevicesStatusComponent]
})
export class RMHubMapDevicesStatusModule { }
