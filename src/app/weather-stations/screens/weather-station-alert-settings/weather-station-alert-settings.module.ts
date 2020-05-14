import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStationAlertSettingsComponent } from './weather-station-alert-settings.component';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RMHubDumbComponentModule } from '@app/weather-stations/components/dumb.component';
import { RmhubWeatherStationAlertSettingRoutingsModule } from './weather-station-alert-settings-routing.module';
import { AlertSettingFormComponent } from '@app/weather-stations/components/alert-setting-form/alert-setting-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotifierModule } from 'angular-notifier';
import { CommonConstant } from '@shared/common/constant.common';
/**
 * Custom angular notifier options
 */
const customNotifierOptions = CommonConstant.CONFIG_NOTIFIER;

@NgModule({
    imports: [
        CommonModule,
        SharedComponentModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        NotifierModule.withConfig(customNotifierOptions),
        RmhubWeatherStationAlertSettingRoutingsModule,
        RMHubDumbComponentModule,
    ],
    declarations: [WeatherStationAlertSettingsComponent],
    entryComponents: [AlertSettingFormComponent]
})
export class RMHubWeatherStationAlertSettingsModule { }
