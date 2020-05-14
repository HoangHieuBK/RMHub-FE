import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherStationAlertSettingsComponent } from './weather-station-alert-settings.component';

const routes: Routes = [
    {
        path: '',
        component: WeatherStationAlertSettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RmhubWeatherStationAlertSettingRoutingsModule { }
