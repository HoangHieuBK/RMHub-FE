import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@shared/pipes/pipes.module';
import { CanDeactivateComponent } from './can-deactivate/can-deactivate.component';
import { MarkerPopupComponent } from './marker/marker-popup/marker-popup.component';
import { MarkerComponent } from './marker/marker.component';
import { TimeagoModule } from 'ngx-timeago';
import { ErrorValidateComponent } from './error-validate/error-validate.component';
import { RMHCheckboxComponent } from './checkbox/chechbox.component';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { MarkerPopupCameraComponent } from './marker/marker-popup/marker-popup-camera/marker-popup-camera.component';
import { MakerPopupInfoComponent } from './marker/marker-popup/maker-popup-info/maker-popup-info.component';
import { MakerPopupVmsComponent } from './marker/marker-popup/maker-popup-vms/maker-popup-vms.component';
import { MakerPopupVmsInfoComponent } from './marker/marker-popup/maker-popup-vms/maker-popup-vms-info/maker-popup-vms-info.component';
import { SafePipe } from './marker/marker-popup/marker-popup-camera/safe.pipe';
import { RmhubWeatherMapComponent } from './marker/marker-popup/rmhub-weather-map/rmhub-weather-map.component';
import { MarkerPopupSosComponent } from './marker/marker-popup/marker-popup-sos/marker-popup-sos.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { InputDateComponent } from './date-input/date-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakerPopupTrafficComponent } from './marker/marker-popup/maker-popup-traffic/maker-popup-traffic.component';
import { MakerRegisterDeviceComponent } from './marker/marker-popup/maker-register-device/maker-register-device.component';
import { LoaderComponent } from './loader/loader.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { MarkerSpeedComponent } from './marker/marker-speed/marker-speed.component';
import { RouterModule } from '@angular/router';
import { MarkerTooltipWeatherComponent } from './marker/marker-tooltip-weather/marker-tooltip-weather.component';


const DxUiModule = [
];

const SHARED_COMPONENTS = [
    CanDeactivateComponent,
    ErrorValidateComponent,
    RMHCheckboxComponent,
    MarkerPopupComponent,
    MarkerComponent,
    ConfirmPopupComponent,
    InputDateComponent,
    LoaderComponent,
    SelectBoxComponent,
    MarkerSpeedComponent
];
@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        DxUiModule,
        TimeagoModule,
        TranslateModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule
    ],
    declarations: [
        SHARED_COMPONENTS,
        MarkerPopupCameraComponent,
        MakerPopupInfoComponent,
        MakerPopupVmsComponent,
        MakerPopupVmsInfoComponent,
        SafePipe, MarkerPopupSosComponent,
        RmhubWeatherMapComponent,
        MakerPopupTrafficComponent,
        MakerRegisterDeviceComponent,
        MakerRegisterDeviceComponent,
        LoaderComponent,
        SelectBoxComponent,
        MarkerSpeedComponent,
        MarkerTooltipWeatherComponent,
    ],
    exports: [SHARED_COMPONENTS, TimeagoModule],
    providers: [DatePipe],
    entryComponents: [MarkerPopupComponent, MakerPopupVmsInfoComponent, MarkerSpeedComponent, MarkerTooltipWeatherComponent]
})
export class SharedComponentModule {
}
