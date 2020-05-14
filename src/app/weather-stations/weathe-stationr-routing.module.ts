import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RmhubWeatherStationListModule } from './screens/weather-station-list/weather-station-list.module';
import { RmhubDetailWeatherModule } from './screens/weather-station-detail/weather-station-detail.module';
import { CommonConstant } from '@shared/common/constant.common';
import { RMHubWeatherStationAlertSettingsModule } from './screens/weather-station-alert-settings/weather-station-alert-settings.module';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: CommonConstant.URL_WEATHER_STATION.list,
                loadChildren: () => RmhubWeatherStationListModule,
                data: { preload: true }
            },
            {
                path: CommonConstant.URL_WEATHER_STATION.detail + '/:id',
                loadChildren: () => RmhubDetailWeatherModule,
                data: { preload: true }
            },
            {
                path: CommonConstant.URL_WEATHER_STATION.alert,
                loadChildren: () => RMHubWeatherStationAlertSettingsModule,
                data: { preload: true }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RmhubWeatherStationRoutingModule { }
