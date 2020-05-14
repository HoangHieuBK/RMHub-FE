import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherStationListComponent } from './weather-station-list.component';

const routes: Routes = [
    {
        path: '',
        component: WeatherStationListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RmhubWeatherStationListRoutingModule { }
