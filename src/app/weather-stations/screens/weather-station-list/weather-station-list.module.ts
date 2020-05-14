import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxPaginationModule } from 'ngx-pagination';
import { WeatherStationListComponent } from './weather-station-list.component';
import { RmhubWeatherStationListRoutingModule } from './weather-station-list-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';

/**
 * Custom angular notifier options
 */
const customNotifierOptions = CommonConstant.CONFIG_NOTIFIER;

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        SharedComponentModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        NotifierModule.withConfig(customNotifierOptions),
        RmhubWeatherStationListRoutingModule
    ],
    declarations: [WeatherStationListComponent]
})
export class RmhubWeatherStationListModule { }
