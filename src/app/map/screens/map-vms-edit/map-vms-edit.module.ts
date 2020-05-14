import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapVmsEditRoutingModule } from './map-vms-edit-routing.module';
import { MapVmsEditComponent } from './map-vms-edit.component';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RMHubMapComponentModule } from '@app/map/components/map-component.module';

@NgModule({
  imports: [
    CommonModule,
    MapVmsEditRoutingModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
    RMHubMapComponentModule
  ],
  exports: [MapVmsEditComponent],
  declarations: [MapVmsEditComponent]
})
export class RMHubMapVmsEditModule { }
