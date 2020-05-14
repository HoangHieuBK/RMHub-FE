import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Traffic } from '@app/traffic-logger/models';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonConstant } from '@shared/common/constant.common';
import { TrafficLoggerDevicesSandbox } from '@app/traffic-logger/traffic-logger.sandbox';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { TrafficLoggerService } from '@app/traffic-logger/services/traffic-logger.service';
import { filter } from 'rxjs/operators';
import { ValidationService } from '@shared/utilites';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

declare let $;
@Component({
    selector: 'rmhub-traffic-logger-detail-device',
    templateUrl: './traffic-logger-detail-device.component.html',
    styleUrls: ['./traffic-logger-detail-device.component.scss']
})

export class TrafficLoggerDetailDeviceComponent implements OnInit, OnDestroy {
    popUpModel: ConfirmPopupModel;
    popUpModelChangeLocation: ConfirmPopupModel;
    popUpModelDupplicateGPS: ConfirmPopupModel;

    tlFrm: FormGroup;
    traffic: Traffic = {
        id: null,
        name: '',
        status: null,
        registration: '',
        lastUpdate: null,
        logical_address: '',
        physical_address: '',
        latitude: null,
        longitude: null,
        atKilometers: null,
        atMeters: null,
        motorway: '',
        external_id: '',
    };
    _traffic: any = {};
    name = CommonConstant.CONSTANT_MAP.defaultValueMesure;
    lastUpdate = CommonConstant.CONSTANT_MAP.defaultValueMesure;
    status_device = CommonConstant.CONSTANT_MAP.defaultValueMesure;
    registration_status = CommonConstant.CONSTANT_MAP.defaultValueMesure;
    checkStatusErrorResponse = false;
    value_na = CommonConstant.CONSTANT_MAP.defaultValueMesure;
    param: string;
    subscription = new Subscription();
    checkEdit = true;
    checkStatus = false;
    checkRegistration = false;
    patternValue = CommonConstant.Pattern_Decimal;

    messageLatFocusOut: string;
    messageLongFocusOut: string;

    disableMessageLat = false;
    disableMessageLong = false;
    borderColorInput = CommonConstant.Border_Input_Invalid;

    minLat = -90;
    maxLat = 90;
    minLong = -180;
    maxLong = 180;

    @ViewChild('focusLat') focusLat: ElementRef;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private notifier: NotifierService,
        private translate: TranslateService,
        private trafficDetailSandbox$: TrafficLoggerDevicesSandbox,
        private trafficService: TrafficLoggerService,
        private validateService: ValidationService,
        private cdr: ChangeDetectorRef

    ) {
        this.createForm();
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const param = this.route.snapshot.paramMap.get('id');
            this.trafficDetailSandbox$.loadTrafficLoggerDevicesDetailFunc(param);
            if ($('#' + CommonConstant.TXT_POPUP_DELETE.id)) {
                $('#' + CommonConstant.TXT_POPUP_DELETE.id).hide();
            }
        });
    }


    ngOnInit() {
        this.registerEvent();
        this.initConfirmPopup();
    }

    selectDataFromStore(_response: any) {
        this.checkStatusErrorResponse = false;
        this.traffic = _response.data[0];
        if (this.traffic && this.traffic.external_id.includes('TC')) {
            for (const key in this.traffic) {
                if (this.traffic.hasOwnProperty(key)) {
                    if (this.traffic[key] !== null && this.traffic[key] !== undefined) {
                        this._traffic[key] = this.traffic[key];
                    }
                }
            }
            this.tlFrm.patchValue({
                ...this._traffic
            });
            this.patchValueLatLongForm();
            if (!isNullOrUndefined(this._traffic.status)) {
                switch (this._traffic.status) {
                    case 0: {
                        this.checkStatus = false;
                        this.status_device = 'Common.List.Status.Inactive';
                        break;
                    }
                    case 1: {
                        this.checkStatus = true;
                        this.status_device = 'Common.List.Status.Active';
                        break;
                    }
                    default: {
                        this.checkStatus = false;
                        this.status_device = CommonConstant.CONSTANT_MAP.defaultValueMesure;
                        break;
                    }
                }
            }
            if (!isNullOrUndefined(this._traffic.registration)) {
                switch (this._traffic.registration) {
                    case 'Registered': {
                        this.checkRegistration = true;
                        this.registration_status = 'Common.List.Registration.Registered';
                        break;
                    }
                    case 'Unregistered': {
                        this.checkRegistration = false;
                        this.registration_status = 'Common.List.Registration.Unregistered';
                        break;
                    }
                    default: {
                        this.checkRegistration = false;
                        this.registration_status = CommonConstant.NA;
                        break;
                    }
                }
            }
            if (!isNullOrUndefined(this._traffic.name)) {
                this.name = this._traffic.name;
            }
            if (!isNullOrUndefined(this._traffic.lastUpdate)) {
                this.lastUpdate = this._traffic.lastUpdate;
            }
        } else {
            this.resetDataBackDefault();
        }
    }

    registerEvent() {
        // listen data after get detail device
        this.subscription.add(this.trafficDetailSandbox$.TrafficLoggerDevicesDetailData$.subscribe((response: any) => {
            if (!response) {
                this.resetDataBackDefault();
                return;
            }
            if (!isNullOrUndefined(response) && !isNullOrUndefined(response.status) && !isNullOrUndefined(response.status.code) && (response.status.code === CommonConstant.STATUS_RES.Success)) {
                this.selectDataFromStore(response);
            }
        }));

        // listen data after edit GPS
        this.subscription.add(this.trafficDetailSandbox$.EditGPSCoordinateData$.subscribe((response: any) => {
            if (!response) {
                return;
            }
            if (!isNullOrUndefined(response) && !isNullOrUndefined(response.status) && !isNullOrUndefined(response.status.code) && (response.status.code === CommonConstant.STATUS_RES.Success)) {
                this.checkEdit = true;
                this.selectDataFromStore(response);
                this.translate.get('Map.Notifier.Change_Location_Success').subscribe(data => this.notifier.notify(CommonConstant.typeNotification, data));
            }
            if (!isNullOrUndefined(response) && !isNullOrUndefined(response.status) && (response.status === 409)) {
                const res = JSON.parse(response._body);
                this.initConfirmPopupDupplicateGPS(res.data.deviceName);
                this.cdr.detectChanges();
                $('#dupplicateGPS').modal();
            }
        }));

        // listen data after remove
        this.subscription.add(this.trafficDetailSandbox$.TrafficLoggerDevicesDeleteData$.subscribe((response: any) => {
            if (!response) {
                this.resetDataBackDefault();
                return;
            }
            if (!isNullOrUndefined(response) && !isNullOrUndefined(response.status) && !isNullOrUndefined(response.status.code) && (response.status.code === CommonConstant.STATUS_RES.Success)) {
                this.trafficService.messageSuccess = CommonConstant.STATUS_RES.Success;
                this.selectDataFromStore(response);
                this.translate.get('Notifier.Device-Setting.delete-success').subscribe(data => this.notifier.notify(CommonConstant.typeNotification, data));
            }
        }));
    }

    createForm() {
        this.tlFrm = this.fb.group({
            name: [this.value_na],
            logical_address: [this.value_na],
            physical_address: [this.value_na],
            status: [this.value_na],
            longitude: [this.value_na, [Validators.required, Validators.pattern(this.patternValue), Validators.min(this.minLong), Validators.max(this.maxLong)]],
            latitude: [this.value_na, [Validators.required, Validators.pattern(this.patternValue), Validators.min(this.minLat), Validators.max(this.maxLat)]],
            motorway: [this.value_na],
            registration: [this.value_na],
            lastUpdate: [this.value_na],
            atMeters: [this.value_na],
            atKilometers: [this.value_na]
        });
    }

    getValueForm() {
        return {
            longitude: this.tlFrm.get('longitude').value,
            latitude: this.tlFrm.get('latitude').value
        };
    }

    patchValueLatLongForm() {
        if (isNullOrUndefined(this.traffic.latitude)) {
            this.tlFrm.get('latitude').setValue(this.value_na);
        } else {
            this.tlFrm.get('latitude').setValue(this.traffic.latitude);
        }

        if (isNullOrUndefined(this.traffic.longitude)) {
            this.tlFrm.get('longitude').setValue(this.value_na);
        } else {
            this.tlFrm.get('longitude').setValue(this.traffic.longitude);
        }
    }

    resetDataBackDefault() {
        this.checkStatusErrorResponse = true;
        this.checkEdit = true;
        this.checkStatus = false;
        this.checkRegistration = false;
        this.lastUpdate = CommonConstant.CONSTANT_MAP.defaultValueMesure;
        this.status_device = CommonConstant.CONSTANT_MAP.defaultValueMesure;
        this.registration_status = CommonConstant.CONSTANT_MAP.defaultValueMesure;
        this.value_na = CommonConstant.CONSTANT_MAP.defaultValueMesure;
        this.name = CommonConstant.CONSTANT_MAP.defaultValueMesure;
        this.traffic = {
            id: null,
            name: '',
            status: null,
            registration: '',
            lastUpdate: null,
            logical_address: '',
            physical_address: '',
            latitude: null,
            longitude: null,
            atKilometers: null,
            atMeters: null,
            motorway: '',
            external_id: '',
        };
        this.tlFrm.reset({
            name: [this.value_na],
            logical_address: [this.value_na],
            physical_address: [this.value_na],
            status: [this.value_na],
            longitude: [this.value_na],
            latitude: [this.value_na],
            motorway: [this.value_na],
            registration: [this.value_na],
            lastUpdate: [this.value_na],
            atMeters: [this.value_na],
            atKilometers: [this.value_na]
        });
        this.disableCheckValidate();
    }

    callPopupRemove() {
        if (!this.checkStatusErrorResponse && this.traffic.registration === CommonConstant.REGISTRATION_DEVICE[1]) {
            this.cdr.detectChanges();
            $('#popupDelete').modal();
        }
    }


    // Create confirm popup remove device
    initConfirmPopup() {
        this.popUpModel = new ConfirmPopupModel({
            type: CommonConstant.TXT_POPUP_DELETE.type,
            title: CommonConstant.TXT_POPUP_DELETE.title1,
            id: CommonConstant.TXT_POPUP_DELETE.id,
            content: CommonConstant.TXT_POPUP_DELETE.content1,
            textYes: CommonConstant.TXT_POPUP_DELETE.textYes,
            textNo: CommonConstant.TXT_POPUP_DELETE.textNo,
            funcYes: () => {
                this.deleteTL();
            },
            funcNo: null,
            funcClose: null
        });
    }

    // Create confirm popup change location
    initConfirmPopupChangeLocation() {
        this.popUpModelChangeLocation = new ConfirmPopupModel({
            type: 0,
            title: 'Map.Confirm-Popup.title',
            id: 'editGPS',
            content: '[' + this.traffic.name + ']' + ' ' + this.translate.instant('Map.Confirm-Popup.content'),
            textYes: 'Map.Confirm-Popup.textYes',
            textNo: 'Map.Confirm-Popup.textNo',
            funcYes: () => {
                this.saveEditGPS();
            },
            funcNo: null,
            funcClose: null
        });
    }

    // Create confirm popup dupplicate gps when edit GPS coordinate
    initConfirmPopupDupplicateGPS(name: string) {
        this.popUpModelDupplicateGPS = new ConfirmPopupModel({
            type: 3,
            title: 'Confirm-Popup.title_dupplicateGps',
            id: 'dupplicateGPS',
            content: this.translate.instant('Confirm-Popup.content_dupplicateGps', { Device_name: name}),
            textYes: 'Confirm-Popup.textYes_dupplicateGps',
            textNo: null,
            funcYes: null,
            funcNo: null,
            funcClose: null
        });
    }


    deleteTL() {
        this.trafficDetailSandbox$.loadTrafficLoggerDevicesDeleteFunc(this.traffic.id);
    }

    clickEditGPSCoordinate() {
        this.focusLat.nativeElement.focus();
        this.checkEdit = false;
        if (!this.checkStatusErrorResponse && this.traffic.registration === CommonConstant.REGISTRATION_DEVICE[0]) {
            this.tlFrm.get('latitude').setValue(this.traffic.latitude);
            this.tlFrm.get('longitude').setValue(this.traffic.longitude);
        }
    }

    editGPSCoordinate() {
        this.checkLatFocusOut();
        this.checkLongFocusOut();
        if (this.tlFrm.valid && this.traffic.registration === CommonConstant.REGISTRATION_DEVICE[1]) {
            this.initConfirmPopupChangeLocation();
            this.cdr.detectChanges();
            $('#editGPS').modal();
        }
        if (this.tlFrm.valid && this.traffic.registration === CommonConstant.REGISTRATION_DEVICE[0]) {
           this.saveEditGPS();
        }
    }

    saveEditGPS() {
        const position = this.getValueForm();
        this.trafficDetailSandbox$.editGPSCoordinateFunc({ position: position, id: this._traffic.id });
    }

    cancelEditGPSCoordinate() {
        this.checkEdit = true;
        this.disableCheckValidate();
        this.patchValueLatLongForm();
        this.enableMessageValid();
    }

    routerLink() {
        this.router.navigate([CommonConstant.URL_TRAFFIC_LOGGER.list]);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.trafficDetailSandbox$.resetDetailDevice();
        this.trafficDetailSandbox$.resetDeleteDevice();
        this.trafficDetailSandbox$.resetEditGPS();
    }

    checkLatFocusOut() {
        this.messageLatFocusOut = this.validateService.checkCommonValidator(this.tlFrm, 'latitude');
        if (!this.messageLatFocusOut) {
            this.messageLatFocusOut = this.regexLat_Long('latitude');
        }
    }
    checkLongFocusOut() {
        this.messageLongFocusOut = this.validateService.checkCommonValidator(this.tlFrm, 'longitude');
        if (!this.messageLongFocusOut) {
            this.messageLongFocusOut = this.regexLat_Long('longitude');
        }
    }

    regexLat_Long(typeCoord: string) {
        if (!this.patternValue.test(this.tlFrm.get(typeCoord).value)) {
            return 'Common_Validator.pattern';
        }
        return '';
    }

    disableCheckValidate() {
        this.messageLatFocusOut = null;
        this.messageLongFocusOut = null;
    }

    disableMessageValid() {
        if (isNullOrUndefined(this.messageLatFocusOut)) {
            this.disableMessageLat = true;
        }
        if (isNullOrUndefined(this.messageLongFocusOut)) {
            this.disableMessageLong = true;
        }
    }

    enableMessageValid() {
        this.disableMessageLat = false;
        this.disableMessageLong = false;
    }
}
