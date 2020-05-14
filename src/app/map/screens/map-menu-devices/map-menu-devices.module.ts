import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapMenuDevicesRoutingModule } from './map-menu-devices-routing.module';
import { MapMenuDevicesComponent } from './map-menu-devices.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MapMenuDevicesRoutingModule,
    TranslateModule
  ],
  exports: [MapMenuDevicesComponent],
  declarations: [MapMenuDevicesComponent]
})
export class RMHubMapMenuDevicesModule { }
