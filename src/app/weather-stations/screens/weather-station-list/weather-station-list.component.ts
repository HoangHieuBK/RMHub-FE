import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';
import { CommonConstant } from '@shared/common/constant.common';
import { WeatherStation } from '@app/weather-stations/models/weather-station.interface';
import { isNull } from 'lodash-es';
import { sortObject, setDefaultNAValue, setStyleScroll, transformStatusList, checkResponseOk, transformStatus } from '@shared/utilites/function.common';
import { Subscription } from 'rxjs';
import { WeatherStationSandbox } from '@app/weather-stations/weather-station.sandbox';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import * as uuid from 'uuid';
import { WSDeviceService } from '@app/weather-stations/services/ws-device.service';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'rmhub-weather-station-list-device',
    templateUrl: './weather-station-list.component.html',
    styleUrls: ['./weather-station-list.component.scss']
})
export class WeatherStationListComponent implements OnInit, OnDestroy, AfterViewInit {
    popUpModel: ConfirmPopupModel;
    configPagination: any = {};
    recordOfAPage: number[] = CommonConstant.RECORD_OF_A_PAGE;
    weather: WeatherStation;
    weathers: WeatherStation[] = [];
    totalRecord: number;
    element: any;
    keySearch: string;
    sortName = { name: null, status: null, registration: null, lastUpdate: true };

    keyword: string;
    checkPagination = true;
    showContent = true;
    isSearching = false;
    fieldSearch: any;

    private subscription = new Subscription();
    @ViewChild('devices_content') devices_content: ElementRef;
    @ViewChild('popupTimeout') popupTimeout: ElementRef;
    setScroll: any;

    time_out = CommonConstant.LOADING_EFFECT;
    timer: any;
    typeOfDevice = 1;
    notifySuccess = 'success';
    notifyFailed = 'error';
    requestId: string;
    hideMessageGrid = true;

    constructor(
        private router: Router,
        private notifier: NotifierService,
        private translate: TranslateService,
        public wsSandbox: WeatherStationSandbox,
        private wsDeviceService: WSDeviceService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.getWSDeviceAcion();
        this.registerEvents();
        for (const key in CommonConstant.CONFIG_PAGINATION) {
            if (CommonConstant.CONFIG_PAGINATION.hasOwnProperty(key)) {
                this.configPagination[key] = CommonConstant.CONFIG_PAGINATION[key];
            }
        }
        this.setOldStatePage();
    }

    ngAfterViewInit() {
        this.listenMessageDeleteFromDetail();
    }

    ngOnDestroy() {
        this.wsDeviceService.detailSide = false;
        this.subscription.unsubscribe();
        this.wsSandbox.wsDeviceResetState();
        clearTimeout(this.timer);
    }

    registerEvents() {
        this.subscription.add(this.wsSandbox.getWSDeviceMisisuData$.subscribe(data => {
            if (!data) {
                return;
            }
            if (!isNullOrUndefined(data.status) && data.status.code === CommonConstant.STATUS_RES.Accepted) {
                this.wsSandbox.getWSDevicesSocket({ requestId: this.requestId });
            } else {
                this.loadingEffect(false);
            }
        }));
        this.subscription.add(this.wsSandbox.getWSDeviceSocketData$.subscribe(data => {
            if (!data) {
                return;
            }
            this.isSearching = false;
            if (!isNullOrUndefined(data.requestId) && data.requestId === this.requestId && !isNullOrUndefined(data.status) && data.status === CommonConstant.STATUS_RES.Success) {
                this.loadingEffect(false);
                this.setData(data);
            } else {
                this.onViewDevicesChange();
            }
        }));
        this.subscription.add(this.wsSandbox.weatherData$.subscribe(data => {
            if (!data) {
                return;
            }
            this.hideMessageGrid = false;
            if (checkResponseOk(data)) {
                this.setData(data);
            }
        }));
        this.subscription.add(this.wsSandbox.deleteWSDeviceData$.subscribe(data => {
            if (!data) {
                return;
            }
            if (checkResponseOk(data)) {
                this.deleteWeather(data);
                this.translate.get('Notifier.Device-Setting.delete-success').subscribe(message => this.notifier.notify(this.notifySuccess, message));
            }
        }));
    }

    setData(data) {
        this.weathers = data.data;
        if (data.data.length > 0) {
            transformStatusList(this.weathers);
            this.reSortData(this.fieldSearch);
            this.setNAValueDevices(this.weathers);
            this.totalRecord = this.weathers.length;
            this.onViewDevicesChange();
            return;
        }
        this.onViewDevicesChange();
    }

    onViewDevicesChange() {
        this.setScroll = this.setScrollTable();
        this.setEndItemPerPage();
    }

    showMessageGrid(ws: WeatherStation[]) {
        if (!this.hideMessageGrid) {
            if (ws) {
                if (ws.length === 0 && this.isSearching) {
                    return 'Grid_Message.NoSearchResult';
                } else if (ws.length === 0 && !this.isSearching) {
                    return 'Grid_Message.NoRecordsShown';
                }
                return '';
            }
            return 'Grid_Message.NoRecordsShown';
        }
    }

    setNAValueDevices(devices: WeatherStation[]) {
        devices.forEach(item => {
            setDefaultNAValue(item);
        });
    }

    getWSDeviceMivisuAction() {
        this.requestId = uuid.v4();
        this.wsSandbox.getWSDevicesMivisu({ deviceType: this.typeOfDevice, requestId: this.requestId, deploymentId: 1 });
    }

    getWSDeviceAcion() {
        this.wsSandbox.getWSDevices({ deviceType: this.typeOfDevice, deploymentId: 1 });
    }

    refreshEvent() {
        this.loadingEffect(true);
        this.getWSDeviceMivisuAction();
    }

    loadingEffect(status) {
        if (status) {
            this.showContent = false;
            this.timer = setTimeout(() => {
                this.showContent = true;
                this.translate.get(CommonConstant.TXT_POPUP_ALERT.content_sync).subscribe(message => this.notifier.notify(this.notifyFailed, message));
                this.wsSandbox.wsDeviceResetState();
            }, this.time_out);
        } else {
            this.showContent = true;
            if (this.time_out) {
                clearTimeout(this.timer);
            }
        }
    }

    changeItemsPerPage(event: number) {
        this.configPagination.itemsPerPage = +event;
        this.configPagination.endItemPerPage = this.configPagination.itemsPerPage;
        this.configPagination.currentPage = 1;
        this.configPagination.beginItemPerPage = 1;
        this.configPagination.endItemPerPage = +event;
        this.wsDeviceService.preNumberRecords = +event;
        this.onViewDevicesChange();
    }

    // get Pagination
    getPagination(event: any) {
        const itemsPerPageCurrent = this.configPagination.itemsPerPage;
        this.configPagination.currentPage = event;
        this.configPagination.endItemPerPage = itemsPerPageCurrent * event;
        this.wsDeviceService.preNumberPaging = event;
        if (event === 1) {
            this.configPagination.beginItemPerPage = 1;
        } else {
            this.configPagination.beginItemPerPage = this.configPagination.itemsPerPage * (this.configPagination.currentPage - 1) + 1;
        }
        this.onViewDevicesChange();
    }

    setEndItemPerPage() {
        this.configPagination.endItemPerPage = this.configPagination.currentPage * this.configPagination.itemsPerPage;
        if (this.totalRecord <= this.configPagination.endItemPerPage) {
            this.configPagination.endItemPerPage = this.totalRecord;
        }
    }

    setScrollTable() {
        this.cdr.detectChanges();
        return setStyleScroll(CommonConstant.Style_Scroll.heightOfTable, this.devices_content.nativeElement.offsetHeight);
    }

    // Create confirm popup
    initConfirmPopup() {
        this.popUpModel = new ConfirmPopupModel({
            type: 1,
            title: 'Confirm-Popup.title_device',
            id: CommonConstant.TXT_POPUP_DELETE.id,
            content: 'Confirm-Popup.content_device',
            textYes: 'Confirm-Popup.textYes',
            textNo: 'Confirm-Popup.textNo',
            funcYes: () => {
                this.deleteWSDeviceAction(this.weather.id);
            },
            funcNo: null,
            funcClose: null

        });
    }

    deleteWSDeviceAction(no: any) {
        this.wsSandbox.deleteWSDevice(no);
    }

    deleteWeather(data) {
        if (!isNullOrUndefined(data.data) && data.data.length > 0) {
            const index = this.weathers.findIndex(item => item.id === data.data[0].id);
            this.weathers[index] = data.data[0];
            transformStatus(this.weathers[index]);
        }
    }

    listenMessageDeleteFromDetail() {
        if (this.wsDeviceService.messageDeleteSuccess === CommonConstant.STATUS_RES.Success) {
            this.translate.get('Notifier.Device-Setting.delete-success').subscribe(message => this.notifier.notify(this.notifySuccess, message));
        }
        this.wsDeviceService.messageDeleteSuccess = null;
    }

    setWeather(weather: any) {
        if (weather.registration === CommonConstant.REGISTRATION_DEVICE[1]) {
            this.weather = weather;
            this.initConfirmPopup();
        } else {
            this.popUpModel = null;
        }
    }

    // sort data list user using function sortObject
    sortData(field: any) {
        let choices = true;
        if (!isNull(this.sortName[field])) {
            choices = this.sortName[field];
        }
        this.weathers = sortObject(this.weathers, field, choices);
        this.sortName[field] = !choices;

        for (const key in this.sortName) {
            if (this.sortName.hasOwnProperty(key)) {
                this.element = this.sortName[key];
                if (key !== field) {
                    this.sortName[key] = null;
                }
            }
        }
        this.fieldSearch = this.sortName;
    }

    reSortData(fieldSearch: any) {
        if (fieldSearch) {
            Object.keys(fieldSearch).forEach((key) => {
                if (fieldSearch[key] !== null) {
                    this.weathers = sortObject(this.weathers, key, !fieldSearch[key]);
                    return;
                }
            });
        }
    }

    // search name of device
    enterSearch() {
        this.isSearching = true;
        this.wsSandbox.getWSDevices({ deviceType: this.typeOfDevice, deviceName: this.keySearch, deploymentId: 1 });
    }

    routerLink(no: number) {
        this.wsDeviceService.deviceSide = true;
        this.router.navigateByUrl(CommonConstant.URL_WEATHER_STATION.detail + '/' + no);
    }

    setOldStatePage() {
        if (this.wsDeviceService.detailSide) {
            this.configPagination.itemsPerPage = this.wsDeviceService.preNumberRecords;
            this.configPagination.currentPage = this.wsDeviceService.preNumberPaging;
        } else {
            this.wsDeviceService.resetOldStatePage();
        }
    }

    translateStatus(status: string) {
        return this.wsDeviceService.translateStatusField(status);
    }

    translateRegistration(registration: string) {
        return this.wsDeviceService.translateRegistrationField(registration);
    }

    updateStyleShowing() {
        if (this.translate.currentLang === CommonConstant.Languages.hu) {
            return {
                display: 'none'
            };
        }
    }

    disableDeleteIcon(registration: string) {
        if (registration === CommonConstant.REGISTRATION_DEVICE[1]) {
            return '';
        }
        return 'nohover';
    }
}
