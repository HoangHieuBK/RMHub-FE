import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';
import { RMHubMapVmsInformationModule } from '../map-vms-information/map-vms-information.module';
import { RMHubMapMenuDevicesModule } from '../map-menu-devices/map-menu-devices.module';
import { RMHubMapDevicesStatusModule } from '../map-devices-status/map-devices-status.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { RMHubMapVmsEditModule } from '../map-vms-edit/map-vms-edit.module';
import { RMHubMapComponentModule } from '@app/map/components/map-component.module';
import { NotifierModule } from 'angular-notifier';
import { CommonConstant } from '@shared/common/constant.common';

const customNotifierOptions = CommonConstant.CONFIG_NOTIFIER;

@NgModule({
    imports: [
        CommonModule,
        MapsRoutingModule,
        SharedComponentModule,
        RMHubMapVmsInformationModule,
        RMHubMapVmsInformationModule,
        RMHubMapMenuDevicesModule,
        RMHubMapDevicesStatusModule,
        RMHubMapVmsEditModule,
        RMHubMapComponentModule,
        NotifierModule.withConfig(customNotifierOptions),
    ],
    declarations: [MapsComponent]
})
export class RMHubMapsModule { }
