import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from '@shared/components/shared-component.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { WSDeviceEffects } from './store/effects/weather-station-devices.effects';
import { RmhubWeatherStationRoutingModule } from './weathe-stationr-routing.module';
import { WeatherStationSandbox } from './weather-station.sandbox';
import { RmhubWeatherApiClient } from './services/weather-station-device-api-client.service';
import { WeatherStationDeviceService } from './services/weather-station-device.service';
import { WSAlertEffects } from './store/effects/weather-station-alert.effects';
import { AlertApiClient } from './services/weather-station-alert-api-client.service';
import { WeatherStationSocketService } from './services/weather-station-socket.service';


@NgModule({
    imports: [
        CommonModule,
        RmhubWeatherStationRoutingModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        StoreModule.forFeature('weather-station', reducers),
        EffectsModule.forFeature([WSDeviceEffects, WSAlertEffects]),
    ],
    declarations: [],
    providers: [
        AlertApiClient,
        WeatherStationSocketService,
        RmhubWeatherApiClient,
        WeatherStationDeviceService,
        WeatherStationSandbox
    ]
})
export class RmhubWeatherStationModule { }
