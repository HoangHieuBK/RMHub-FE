import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WeatherStation } from '@app/weather-stations/models/weather-station.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonConstant } from '@shared/common/constant.common';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';
import { Subscription } from 'rxjs';
import { WeatherStationSandbox } from '@app/weather-stations/weather-station.sandbox';
import { setDefaultNAValue, checkResponseOk } from '@shared/utilites/function.common';
import { WSDeviceService } from '@app/weather-stations/services/ws-device.service';
import { isNullOrUndefined } from 'util';
import { MapSandbox } from '@app/map/map.sandbox';
import { ValidationService } from '@shared/utilites/validation.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

declare let $;
@Component({
    selector: 'rmhub-weather-station-detail',
    templateUrl: './weather-station-detail.component.html',
    styleUrls: ['./weather-station-detail.component.scss']
})
export class WeatherStationDetailComponent implements OnInit, OnDestroy {

    popUpModel: ConfirmPopupModel;
    popupAlert: ConfirmPopupModel;
    wsFrm: FormGroup;
    weather: WeatherStation = new WeatherStation();
    wsRef = new WeatherStation();
    idPopup = 'popupDeleteWSDetail';
    isEditGps = false;

    naValue = CommonConstant.NA;
    patternNumber = CommonConstant.Pattern_Decimal;

    wsDevicesLink = CommonConstant.URL_WEATHER_STATION.list;

    messageLongValid: string;
    messageLatValid: string;
    hideMessageLongValid = false;
    hideMessageLatValid = false;

    outOfRangeLongMess: string;
    outOfRangeLatMess: string;

    activeDevice = 1;
    notifySuccess = 'success';
    longText = 'longitude';
    latText = 'latitude';
    borderColorInput = CommonConstant.Border_Input_Invalid;
    min_value_lat = -CommonConstant.MaxMin_Lat;
    max_value_lat = CommonConstant.MaxMin_Lat;
    min_value_long = -CommonConstant.MaxMin_Long;
    max_value_long = CommonConstant.MaxMin_Long;

    @ViewChild('latInput') latInput: ElementRef;
    private subscription = new Subscription();

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private wsDeviceService: WSDeviceService,
        public wsSandbox: WeatherStationSandbox,
        private mapSanBox: MapSandbox,
        private notifier: NotifierService,
        private translate: TranslateService,
        private validationService: ValidationService,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.createForm();
        this.registerEvent();
        this.getWSDevice();
        this.onRefresh();
    }

    ngOnDestroy() {
        this.wsDeviceService.deviceSide = false;
        this.subscription.unsubscribe();
        this.wsSandbox.wsDeviceResetState();
        this.mapSanBox.resetAllState();
    }

    onRefresh() {
        this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.isEditGps = false;
                this.closeModal();
                this.getWSDevice();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById(this.idPopup + '_close');
        if (modal) {
            modal.click();
        }
    }

    openPopupDuplicateCoordinate(res) {
        this.initPopupAlertDuplicateCoord(res.data.deviceName);
        this.cdr.detectChanges();
        $('#duplicateCoordinateWS').modal();
    }

    getWSDevice() {
        const param = this.route.snapshot.paramMap.get('id');
        this.wsSandbox.detailWSDevices(param);
    }

    registerEvent() {
        this.subscription.add(this.wsSandbox.detailWSDeviceData$.subscribe(data => {
            if (!data) {
                return;
            }
            if (checkResponseOk(data) && data.data[0] && data.data[0].name.includes(CommonConstant.Device_Name_Type[0])) {
                this.weather = data.data[0];
            } else {
                this.weather = this.wsRef;
            }
            this.pathValue();
        }));
        this.subscription.add(this.wsSandbox.deleteWSDeviceData$.subscribe(data => {
            if (!data) {
                return;
            }
            if (checkResponseOk(data) && data.data[0]) {
                this.weather = data.data[0];
                this.pathValue();
                this.translate.get('Notifier.Device-Setting.delete-success').subscribe(message => this.notifier.notify(this.notifySuccess, message));
            }
        }));
        this.subscription.add(this.mapSanBox.setLocationData$.subscribe(data => {
            if (!data) {
                return;
            }
            if (checkResponseOk(data) && data.data[0]) {
                this.weather = data.data[0];
                this.pathValue();
                this.isEditGps = false;
                this.enableValidator();
                this.notifier.notify(this.notifySuccess, this.translate.instant('Map.Notifier.Change_Location_Success'));
            }
            if (!isNullOrUndefined(data.status) && data.status === CommonConstant.STATUS_RES.Conflict) {
                const res = JSON.parse(data._body);
                this.openPopupDuplicateCoordinate(res);
            }
        }));
    }

    createForm() {
        this.wsFrm = this.fb.group({
            physical_address: [''],
            logical_address: [''],
            longitude: ['', Validators.required],
            latitude: ['', Validators.required],
            motorway: [''],
            status: [''],
            registration: [''],
            lastUpdate: [''],
            atKilometers: [''],
            atMeters: ['']
        });
    }

    pathValue() {
        const ws = setDefaultNAValue(this.weather);
        this.wsFrm.patchValue({
            ...ws
        });
    }

    setStatus(status: number) {
        if (!isNullOrUndefined(status) && 0 <= status && status <= CommonConstant.STATUS_DEVICE.length - 1) {
            return CommonConstant.STATUS_DEVICE[status];
        }
        return CommonConstant.NA;
    }

    doDeleteWS() {
        this.wsSandbox.deleteWSDevice(this.weather.id);
    }

    deleteWS() {
        if (this.isDeletable(this.weather)) {
            this.initConfirmPopup();
        } else {
            this.popUpModel = null;
        }
    }

    editGPSDevice() {
        if (this.isEditable(this.weather)) {
            if (this.weather.registration !== CommonConstant.REGISTRATION_DEVICE[1]) {
                this.wsFrm.get(this.longText).setValue('');
                this.wsFrm.get(this.latText).setValue('');
            }
            this.isEditGps = true;
            this.latInput.nativeElement.focus();
        }
    }

    isDeletable(ws: WeatherStation) {
        return !isNullOrUndefined(ws) && ws.registration === CommonConstant.REGISTRATION_DEVICE[1];
    }

    isEditable(ws: WeatherStation) {
        return !isNullOrUndefined(ws) && ws.status === this.activeDevice;
    }

    saveChange() {
        if (this.isOutOfRangeValue() && this.weather.registration === CommonConstant.REGISTRATION_DEVICE[1]) {
            this.initPopupChangeLocation();
        } else if (this.isOutOfRangeValue() && this.weather.registration === CommonConstant.REGISTRATION_DEVICE[0]) {
            this.saveChangeEditGps();
        }
        if (!this.isOutOfRangeValue()) {
            this.popUpModel = null;
        }
    }

    isOutOfRangeValue() {
        return this.isOutOfRangeLatValue() && this.isOutOfRangeLongValue() && !this.messageLongValid && !this.messageLatValid;
    }

    saveChangeEditGps() {
        if (this.weather.id !== null && this.wsFrm.valid) {
            const position = { longitude: this.wsFrm.get(this.longText).value, latitude: this.wsFrm.get(this.latText).value };
            this.mapSanBox.setLocationDevice({ position: position, id: this.weather.id });
        }
    }

    isOutOfRangeLatValue() {
        const checkLat = this.wsFrm.get(this.latText).value >= -CommonConstant.MaxMin_Lat && this.wsFrm.get(this.latText).value <= CommonConstant.MaxMin_Lat;
        if (!checkLat) {
            this.outOfRangeLatMess = 'Map.Validator.OutOfRange_Value';
        } else {
            this.outOfRangeLatMess = null;
        }
        return checkLat;
    }

    isOutOfRangeLongValue() {
        const checkLong = this.wsFrm.get(this.longText).value >= -CommonConstant.MaxMin_Long && this.wsFrm.get(this.longText).value <= CommonConstant.MaxMin_Long;
        if (!checkLong) {
            this.outOfRangeLongMess = 'Map.Validator.OutOfRange_Value';
        } else {
            this.outOfRangeLongMess = null;
        }
        return checkLong;
    }

    cancelChangeEditGps() {
        this.isEditGps = false;
        this.messageLongValid = null;
        this.messageLatValid = null;
        this.outOfRangeLongMess = null;
        this.outOfRangeLatMess = null;
        this.enableValidator();
        this.pathValue();
    }

    checkErrorGetDetailDevice(ws: WeatherStation) {
        if (!isNullOrUndefined(ws.id)) {
            for (const key in ws) {
                if (key !== 'id' && ws[key] !== this.naValue) {
                    return false;
                }
            }
            return true;
        }
        return true;
    }

    routerLink() {
        if (this.wsDeviceService.deviceSide) {
            this.wsDeviceService.detailSide = true;
        }
        this.router.navigateByUrl(this.wsDevicesLink);
    }

    latitudeFocusOut() {
        if (this.isEditGps) {
            this.messageLatValid = this.validationService.checkCommonValidator(this.wsFrm, this.latText);
            if (!this.messageLatValid) {
                this.messageLatValid = this.regexLat_Long(this.latText);
            }
            this.isOutOfRangeLatValue();
        }
    }

    longitudeFocusOut() {
        if (this.isEditGps) {
            this.messageLongValid = this.validationService.checkCommonValidator(this.wsFrm, this.longText);
            if (!this.messageLongValid) {
                this.messageLongValid = this.regexLat_Long(this.longText);
            }
            this.isOutOfRangeLongValue();
        }
    }

    regexLat_Long(typeCoord: string) {
        if (!this.patternNumber.test(this.wsFrm.get(typeCoord).value)) {
            return 'Common_Validator.pattern';
        }
        return '';
    }

    disableValidator() {
        if (isNullOrUndefined(this.messageLongValid)) {
            this.hideMessageLongValid = true;
        }
        if (isNullOrUndefined(this.messageLatValid)) {
            this.hideMessageLatValid = true;
        }
    }

    enableValidator() {
        this.hideMessageLongValid = false;
        this.hideMessageLatValid = false;
    }

    translateStatus(status: string) {
        return this.wsDeviceService.translateStatusField(status);
    }

    translateRegistration(registration: string) {
        return this.wsDeviceService.translateRegistrationField(registration);
    }

    // Create confirm popup delete from maps
    initConfirmPopup() {
        this.popUpModel = new ConfirmPopupModel({
            type: 1,
            title: 'Confirm-Popup.title_device',
            id: this.idPopup,
            content: 'Confirm-Popup.content_device',
            textYes: 'Confirm-Popup.textYes',
            textNo: 'Confirm-Popup.textNo',
            funcYes: () => {
                this.doDeleteWS();
            },
            funcNo: null,
            funcClose: null
        });
    }

    // Create confirm popup change location device from maps
    initPopupChangeLocation() {
        this.popUpModel = new ConfirmPopupModel({
            type: 0,
            title: 'Map.Confirm-Popup.title',
            id: 'setLocationWSDetail',
            content: '[' + this.weather.name + ']' + ' ' + this.translate.instant('Map.Confirm-Popup.content'),
            textYes: 'Map.Confirm-Popup.textYes',
            textNo: 'Map.Confirm-Popup.textNo',
            funcYes: () => {
                this.saveChangeEditGps();
            },
            funcNo: null,
            funcClose: null
        });
    }

    // Create confirm popup change location device from maps
    initPopupAlertDuplicateCoord(dvName: string) {
        this.popupAlert = new ConfirmPopupModel({
            type: 3,
            title: 'Common.Popup.Popup_Duplicate_Coordinate.title',
            id: 'duplicateCoordinateWS',
            content: this.translate.instant('Common.Popup.Popup_Duplicate_Coordinate.content', {Device_name: dvName}),
            textYes: 'Common.Popup.Popup_Duplicate_Coordinate.textYes',
            funcYes: null,
            funcNo: null,
            funcClose: null
        });
    }
}
