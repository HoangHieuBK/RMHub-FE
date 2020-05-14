import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDeviceStatusComponent } from './map-status-devices/map-status-devices.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { MapListPortalComponent } from './map-list-portal/map-list-portal.component';
import { MapTrafficSignComponent } from './map-traffic-signs/map-traffic-signs.component';
import { MapEditVmsComponent } from './map-edit-vms/map-edit-vms.component';
import { MapVmsManageComponent } from './map-vms-manage/map-vms-manage.component';
import { MapTreePortalComponent } from './map-tree-portal/map-tree-portal.component';
import { MapVmsInfoComponent } from './map-vms-info/map-vms-info.component';
import { MapZoomLevelComponent } from './map-zoom-level/map-zoom-level.component';
import { ChooseLocationComponent } from './choose-location/choose-location.component';
import { MapSetLocationComponent } from './map-set-location/map-set-location.component';
import { TranslateModule } from '@ngx-translate/core';
import { MapTooltipSetLocationComponent } from './map-tooltip-set-location/map-tooltip-set-location.component';

const components = [
    MapDeviceStatusComponent,
    MapListPortalComponent,
    MapTrafficSignComponent,
    MapEditVmsComponent,
    MapTreePortalComponent,
    MapVmsManageComponent,
    MapVmsInfoComponent,
    MapZoomLevelComponent,
    ChooseLocationComponent,
    MapSetLocationComponent,
    MapTooltipSetLocationComponent
];

@NgModule({
    imports: [
        CommonModule,
        SharedComponentModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
    ],
    exports: [components],
    declarations: [components],
    entryComponents: [ChooseLocationComponent, MapSetLocationComponent, MapTooltipSetLocationComponent]
})
export class RMHubMapComponentModule { }
