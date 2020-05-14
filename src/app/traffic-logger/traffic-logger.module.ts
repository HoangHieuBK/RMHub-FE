import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { TrafficLoggerDevicesApiClient } from './services/traffic-logger-device-api-client.service';
import { TrafficLoggerDevicesService } from './services/traffic-logger-devices.service';
import {
    TrafficLoggerReducers, TrafficLoggerDeviceDetailReducers, TrafficLoggerDeviceDeleteReducers,
    TrafficLoggerAlertListLReducers, TrafficLoggerAlertCreateLReducers, TrafficLoggerAlertEditLReducers, TrafficLoggerAlertDeleteLReducers, TrafficLoggerSyncReducer, TrafficLoggerCallApiSyncReducer, EditGpsCoordinateTLReducers
} from './store';
import { TrafficLoggerDevicesEffects } from './store/effects/traffic-logger-list.effects';
import { RMHubTrafficRoutingModule } from './traffic-logger-routing.module';
import { TrafficLoggerDevicesSandbox } from './traffic-logger.sandbox';
import { TranslateModule } from '@ngx-translate/core';
import { TrafficLoggerDevicesDetailEffects } from './store/effects/traffic-logger-device-detail.effects';
import { TrafficLoggerAlertApiClient } from './services/traffic-alert-api-client.service';
import { TrafficAlertService } from './services/traffic-alert-devices.service';
import { TrafficAlertCreateEffects } from './store/effects/traffic-logger-alert-create-effects';
import { TrafficAlertDeleteEffects } from './store/effects/traffic-logger-alert-delete.effects';
import { TrafficAlertEditEffects } from './store/effects/traffic-logger-alert-edit.effects';
import { TrafficAlertListEffects } from './store/effects/traffic-logger-alert-list.effects';
import { TrafficLoggerDevicesDeleteEffects } from './store/effects/traffic-logger-device-delete.effects';
import { TrafficLoggerDevicesSyncEffects } from './store/effects/traffic-logger-sync.effects';
import { TrafficSocketAPI } from './services/traffic-socket.service';
import { EditGPSCoordinateEffects } from './store/effects/traffic-logger-device-editGps.effects';
import { MapApiClient } from '@app/map/services/map-api-client.service';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        SharedComponentModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        EffectsModule.forFeature([TrafficLoggerDevicesEffects, TrafficLoggerDevicesSyncEffects, TrafficLoggerDevicesDetailEffects,
            TrafficLoggerDevicesDeleteEffects, TrafficAlertCreateEffects, TrafficAlertDeleteEffects, TrafficAlertEditEffects, TrafficAlertListEffects, EditGPSCoordinateEffects]),


        StoreModule.forFeature('TrafficLoggerList', TrafficLoggerReducers),
        StoreModule.forFeature('TrafficLoggerDetail', TrafficLoggerDeviceDetailReducers),
        StoreModule.forFeature('TrafficLoggerDelete', TrafficLoggerDeviceDeleteReducers),
        StoreModule.forFeature('TrafficLoggerSync', TrafficLoggerSyncReducer),
        StoreModule.forFeature('TrafficLoggerCallApiSync', TrafficLoggerCallApiSyncReducer),
        StoreModule.forFeature('EditGpsCoordinate', EditGpsCoordinateTLReducers),

        StoreModule.forFeature('TrafficAlertList', TrafficLoggerAlertListLReducers),
        StoreModule.forFeature('TrafficAlertCreate', TrafficLoggerAlertCreateLReducers),
        StoreModule.forFeature('TrafficAlertEdit', TrafficLoggerAlertEditLReducers),
        StoreModule.forFeature('TrafficAlertDelete', TrafficLoggerAlertDeleteLReducers),


        RMHubTrafficRoutingModule
    ],

    declarations: [],

    providers: [TrafficLoggerDevicesSandbox, TrafficLoggerDevicesApiClient, TrafficLoggerDevicesService, TrafficLoggerAlertApiClient, TrafficAlertService, TrafficSocketAPI, MapApiClient]
})
export class RMHubTrafficLoggerModule { }
