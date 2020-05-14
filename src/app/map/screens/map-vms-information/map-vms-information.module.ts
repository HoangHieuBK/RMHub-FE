import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapVmsInformationComponent } from './map-vms-information.component';
import { RMHubMapComponentModule } from '@app/map/components/map-component.module';

@NgModule({
  imports: [
    CommonModule,
    RMHubMapComponentModule
  ],
  exports: [MapVmsInformationComponent],
  declarations: [MapVmsInformationComponent]
})
export class RMHubMapVmsInformationModule { }
