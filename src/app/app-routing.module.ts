import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RmhubMapManagetmentModule } from './map/rmhub-map.module';
import { RMHubTrafficLoggerModule } from './traffic-logger/traffic-logger.module';
import { RmhubWeatherStationModule } from './weather-stations/weather-station.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => RmhubMapManagetmentModule,
        data: { preload: true }
    },
    {
        path: '',
        loadChildren: () => RMHubTrafficLoggerModule,
        data: { preload: true }
    },
    {
        path: '',
        loadChildren: () => RmhubWeatherStationModule,
        data: { preload: true }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
