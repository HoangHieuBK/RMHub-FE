import { TranslateService } from '@ngx-translate/core';
import { OnInit, Input, Component, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MarkerPopupCameraComponent } from './marker-popup-camera/marker-popup-camera.component';
import { MakerPopupInfoComponent } from './maker-popup-info/maker-popup-info.component';
import { MakerPopupVmsComponent } from './maker-popup-vms/maker-popup-vms.component';
import { MarkerPopupSosComponent } from './marker-popup-sos/marker-popup-sos.component';
import { RmhubWeatherMapComponent } from './rmhub-weather-map/rmhub-weather-map.component';
import { MakerPopupTrafficComponent } from './maker-popup-traffic/maker-popup-traffic.component';
import { MakerRegisterDeviceComponent } from './maker-register-device/maker-register-device.component';
import { CommonConstant } from '@shared/common/constant.common';
@Component({
    selector: 'rmhub-marker-popup',
    templateUrl: './marker-popup.component.html',
    styleUrls: ['./marker-popup.component.scss']
})

export class MarkerPopupComponent implements OnInit {

    @ViewChild('weatherComponent') weatherComponent: RmhubWeatherMapComponent;
    @ViewChild('trafficComponent') trafficComponent: MakerPopupTrafficComponent;
    @Input() deviceData: any;
    @Input() alertDeviceData: any;
    keyShowComponent = '';
    typeActive = '';
    commonConstant = CommonConstant;
    constructor(public translateService: TranslateService) {
    }

    ngOnInit() {
    }
}
