import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherStationDetailComponent } from './weather-station-detail.component';

const routes: Routes = [
    {
        path: '',
        component: WeatherStationDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RmhubWeatherStationDetailRoutingModule { }
