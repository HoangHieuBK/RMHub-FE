import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RmhubWeatherStationDetailRoutingModule } from './weather-station-detail-routing.module';
import { WeatherStationDetailComponent } from './weather-station-detail.component';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { TranslateModule } from '@ngx-translate/core';
import { NotifierModule } from 'angular-notifier';
import { CommonConstant } from '@shared/common/constant.common';

const customNotifierOptions = CommonConstant.CONFIG_NOTIFIER;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RmhubWeatherStationDetailRoutingModule,
        SharedComponentModule,
        TranslateModule,
        NotifierModule.withConfig(customNotifierOptions)
    ],
    declarations: [WeatherStationDetailComponent]
})
export class RmhubDetailWeatherModule { }
