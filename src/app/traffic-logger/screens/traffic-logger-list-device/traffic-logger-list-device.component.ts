import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';
import { NotifierService } from 'angular-notifier';
import { isNull } from 'lodash-es';
import * as uuid from 'uuid';

import { Traffic } from '../../models';
import { TrafficLoggerService } from '../../services/traffic-logger.service';
import { CommonConstant } from '@shared/common/constant.common';
import { sortObject, setStyleScroll } from '@shared/utilites/function.common';
import { from, Subscription } from 'rxjs';
import { TrafficLoggerDevicesSandbox } from '@app/traffic-logger/traffic-logger.sandbox';
import { isNullOrUndefined, isUndefined } from 'util';
import { TranslateService } from '@ngx-translate/core';
declare let $;
@Component({
    selector: 'rmhub-traffic-logger-list-device',
    templateUrl: './traffic-logger-list-device.component.html',
    styleUrls: ['./traffic-logger-list-device.component.scss']
})
export class TrafficLoggerListDeviceComponent implements OnInit, OnDestroy, AfterViewInit {

    popUpModel: ConfirmPopupModel; // Declare confirm popup
    selectedData: any;
    keyword: string;
    idTraffic: number;
    trafficLogger: any;
    configPagination: any = {};
    totalRecord: number;
    checkEmptyRecords = false;
    sortName: Object = { id: null, name: null, status: null, registration: null, lastUpdate: true };
    element: any;
    traffics: Traffic[] = [];
    showContent = true;
    checkActionSearch = false;
    deviceType = 2;
    requestId = uuid.v4();
    loading_effect = CommonConstant.LOADING_EFFECT;
    popUpModelSyncData: ConfirmPopupModel;
    isGETDataSuccess: boolean;
    hungLang = 'hu';

    current_Page = CommonConstant.CONFIG_PAGINATION.currentPage;
    items_PerPage = CommonConstant.CONFIG_PAGINATION.itemsPerPage;
    begin_ItemPerPage = CommonConstant.CONFIG_PAGINATION.beginItemPerPage;
    endItem_PerPage = CommonConstant.CONFIG_PAGINATION.endItemPerPage;
    RECORD_OF_A_PAGE = CommonConstant.RECORD_OF_A_PAGE;
    subscriptions = new Subscription();
    @ViewChild('remove_action') remove_action: ElementRef;
    @ViewChild('devices_content') devices_content: ElementRef;
    @ViewChild('sync_data') sync_data: ElementRef;
    @ViewChild('alertModal') alertModal: ElementRef;
    setScroll: any;
    timeOutRefresh: any;
    constructor(
        private router: Router,
        private trafficService: TrafficLoggerService,
        private notifier: NotifierService,
        private translate: TranslateService,
        private trafficSandbox$: TrafficLoggerDevicesSandbox,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {

        for (const key in CommonConstant.CONFIG_PAGINATION) {
            if (CommonConstant.CONFIG_PAGINATION.hasOwnProperty(key)) {
                this.configPagination[key] = CommonConstant.CONFIG_PAGINATION[key];
            }
        }
        this.setScroll = this.setScrollTable();
        this.selectDataFromStore();
        this.initConfirmPopup();
        this.initAddAlertPopupSyncData();
    }

    ngAfterViewInit() {
        // this.listenMessageFromDetail();

    }

    listenMessageFromDetail() {
        if (this.trafficService.messageSuccess === CommonConstant.STATUS_RES.Success) {
            this.translate.get('Notifier.Device-Setting.delete-success').subscribe(data => this.notifier.notify(CommonConstant.typeNotification, data));
        }
        this.trafficService.messageSuccess = null;
    }


    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.trafficSandbox$.resetListDevice();
        this.trafficSandbox$.resetCallApiSyncDevice();
        this.trafficSandbox$.resetSyncDevice();
        this.trafficSandbox$.resetDeleteDevice();
        this.clearTimeOutSyncData();
    }

    selectDataFromStore() {
        this.trafficSandbox$.loadTrafficLoggerDevicesFunc({ deviceType: this.deviceType });
        this.subscriptions.add(this.trafficSandbox$.TrafficLoggerDevicesData$.subscribe((response: any) => {
            if (!response) {
                return;
            }
            if (!isUndefined(response.data)) {
                this.traffics = response.data;
                if (this.traffics) {
                    this.setDataFromAction();
                } else {
                    this.checkEmptyRecords = true;
                }
            }
        }));

        // select data from delete action
        this.subscriptions.add(this.trafficSandbox$.TrafficLoggerDevicesDeleteData$.subscribe(response => {
            if (!response) {
                return;
            }
            if (!isNullOrUndefined(response.status) && !isNullOrUndefined(response.status.code) && !isNullOrUndefined(response.data) && response.status.code === CommonConstant.STATUS_RES.Success) {
                const index = this.traffics.findIndex((item) => item.id === this.idTraffic);
                const objTrafficDelete = response.data[0];
                this.traffics = Object.assign([], this.traffics, {[index]: objTrafficDelete});
                this.setDataFromAction();
                this.checkActionSearch = false;
                this.translate.get('Notifier.Device-Setting.delete-success').subscribe(data => this.notifier.notify(CommonConstant.typeNotification, data));
            }
        }));


        // select data from call api sync action
        this.subscriptions.add(this.trafficSandbox$.TrafficLoggerCallApiSyncData$.subscribe((response: any) => {

            if (!response) {
                return;
            }

            if (!isNullOrUndefined(response.status) && !isNullOrUndefined(response.status.code) && (response.status.code === 202)) {
                this.showContent = false;
                this.trafficSandbox$.loadTrafficLoggerSyncFunc({ reqId: this.requestId });
            } else {
                this.isGETDataSuccess = false;
                this.clearTimeOutSyncData();
                this.showContent = true;
            }
        }));


        // select data from call socket action
        this.subscriptions.add(this.trafficSandbox$.TrafficLoggerSyncData$.subscribe((response: any) => {
            if (!isNullOrUndefined(response) && response.data && response.requestId === this.requestId) {
                this.showContent = true;
                this.traffics = response.data;
                this.isGETDataSuccess = true;
                this.setDataFromAction();
                this.checkActionSearch = false;
                this.clearTimeOutSyncData();
            } else {
                this.isGETDataSuccess = false;
            }
        }));

    }

    setDataFromAction() {
        this.totalRecord = this.traffics.length;
        this.checkPaginationAfterAction();
        this.resortData();
        this.setScroll = this.setScrollTable();
    }

    setScrollTable() {
        this.cdr.detectChanges();
        return setStyleScroll(CommonConstant.Style_Scroll.heightOfTable, this.devices_content.nativeElement.offsetHeight);
    }


    loadingEffect(timer: number) {
        this.clearTimeOutSyncData();
        this.timeOutRefresh = setTimeout(() => {
            this.showContent = true;
            if (!this.isGETDataSuccess) {
                this.translate.get(CommonConstant.TXT_POPUP_ALERT.content_sync).subscribe(data => this.notifier.notify(CommonConstant.errorNotification, data));
                this.trafficSandbox$.resetSyncDevice();
                this.clearTimeOutSyncData();
            }
        }, timer);
    }

    clearTimeOutSyncData() {
        if (this.timeOutRefresh) {
            clearTimeout(this.timeOutRefresh);
        }
    }
    // refresh all list TL
    refreshALL() {
        this.showContent = false;
        this.loadingEffect(this.loading_effect); // after 30s function is called
        this.keyword = '';
        // sync data action
        this.trafficSandbox$.loadTrafficLoggerCallApiSyncFunc({ type: this.deviceType, reqId: this.requestId });
    }

    getTrafficById(id: number, traffic: Traffic) {
        this.idTraffic = id;
        this.trafficLogger = traffic;
        if (traffic.registration === CommonConstant.REGISTRATION_DEVICE[1]) {
            this.cdr.detectChanges();
            $('#popupDelete').modal();
        }
    }
    // Convert page to Create
    CreateTrafficLogger() {
        this.router.navigateByUrl(CommonConstant.URL_TRAFFIC_LOGGER.add);
    }


    // Convert page to Detail
    DetailTrafficLogger(id: number) {
        this.router.navigateByUrl(CommonConstant.URL_TRAFFIC_LOGGER.detail + `/${id}`);
    }

    // Show message
    public showNotification(type: string, message: string): void {
        this.notifier.notify(type, message);
    }



    deleteTraffic() {
        this.trafficSandbox$.loadTrafficLoggerDevicesDeleteFunc(this.idTraffic);
    }

    // Change items per page
    changeItemsPerPage(event: number) {
        this.configPagination.itemsPerPage = +event;
        this.configPagination.endItemPerPage = this.configPagination.itemsPerPage;
        this.configPagination.currentPage = this.current_Page;
        this.configPagination.beginItemPerPage = this.begin_ItemPerPage;
        if (this.totalRecord < event) {
            this.configPagination.endItemPerPage = this.totalRecord;
        } else {
            this.configPagination.endItemPerPage = +event;
        }
        this.setScroll = this.setScrollTable();
    }


    // get Pagination
    getPagination(event: any) {
        const itemsPerPageCurrent = this.configPagination.itemsPerPage;
        this.configPagination.currentPage = event;
        this.configPagination.endItemPerPage = itemsPerPageCurrent * event;
        if (this.configPagination.endItemPerPage > this.totalRecord) {
            this.configPagination.endItemPerPage = this.totalRecord;
        }
        if (event === this.begin_ItemPerPage) {
            this.configPagination.beginItemPerPage = this.begin_ItemPerPage;
        } else {
            this.configPagination.beginItemPerPage = this.configPagination.itemsPerPage * (this.configPagination.currentPage - this.begin_ItemPerPage) + this.current_Page;
        }
        this.setScroll = this.setScrollTable();
    }

    enterSearch(event: any) {
        this.keyword = event;
        this.searchByKeyword();
    }

    searchByKeyword() {
        this.checkActionSearch = true;
        this.trafficSandbox$.loadTrafficLoggerDevicesFunc({
            deviceType: this.deviceType,
            deviceName: this.keyword
        });
    }

    checkPaginationAfterAction() {
        if (this.totalRecord === CommonConstant.EMPTY_RECORD) {
            this.checkEmptyRecords = true;
        } else {
            this.checkEmptyRecords = false;
        }
        const itemsPerPageCurrent = this.configPagination.itemsPerPage;
        const currentPage = this.configPagination.currentPage;
        this.configPagination.endItemPerPage = itemsPerPageCurrent * currentPage;
        if (this.configPagination.endItemPerPage > this.totalRecord) {
            this.configPagination.endItemPerPage = this.totalRecord;
        }
        if (currentPage === this.begin_ItemPerPage) {
            this.configPagination.beginItemPerPage = this.begin_ItemPerPage;
        } else {
            this.configPagination.beginItemPerPage = this.configPagination.itemsPerPage * (this.configPagination.currentPage - this.begin_ItemPerPage) + this.current_Page;
        }
    }

    setStatus(status) {
        switch (status) {
            case 0: {
                return 'Common.List.Status.Inactive';
            }
            case 1: {
                return 'Common.List.Status.Active';
            }
            default: {
                return CommonConstant.NA;
            }
        }
    }

    setRegistration(registration: any) {
        switch (registration) {
            case 'Registered': {
                return 'Common.List.Registration.Registered';
            }
            case 'Unregistered': {
                return 'Common.List.Registration.Unregistered';
            }
            default: {
                return CommonConstant.NA;
            }
        }
    }

    transformStatusAndRegistrationList(arr: any[]) {
        arr.forEach(item => {
            item.status = this.setStatus(item.status);
            item.registration = this.setRegistration(item.registration);
        });
    }

    // sort data list user using function sortObject
    sortData(field: any) {
        let choices = true;
        if (!isNull(this.sortName[field])) {
            choices = this.sortName[field];
        }
        this.traffics = sortObject(this.traffics, field, choices);
        this.sortName[field] = !choices;

        for (const key in this.sortName) {
            if (this.sortName.hasOwnProperty(key)) {
                this.element = this.sortName[key];
                if (key !== field) {
                    this.sortName[key] = null;
                }
            }
        }
    }

    // resort data after an action
    resortData() {
        for (const key in this.sortName) {
            if (this.sortName.hasOwnProperty(key)) {
                let choice = true;
                if (!isNull(this.sortName[key]) && !this.checkEmptyRecords) {
                    choice = !this.sortName[key];
                    this.traffics = sortObject(this.traffics, key, choice);
                }

            }
        }
    }

    // Create confirm popup
    initConfirmPopup() {
        this.popUpModel = new ConfirmPopupModel({
            type: CommonConstant.TXT_POPUP_DELETE.type,
            title: CommonConstant.TXT_POPUP_DELETE.title1,
            id: CommonConstant.TXT_POPUP_DELETE.id,
            content: CommonConstant.TXT_POPUP_DELETE.content1,
            textYes: CommonConstant.TXT_POPUP_DELETE.textYes,
            textNo: CommonConstant.TXT_POPUP_DELETE.textNo,
            funcYes: () => {
                this.deleteTraffic();
            },
            funcNo: null,
            funcClose: null
        });
    }


    // Create alert popup sync data
    initAddAlertPopupSyncData() {
        this.popUpModelSyncData = new ConfirmPopupModel({
            type: CommonConstant.TXT_POPUP_ALERT.type,
            title: null,
            id: CommonConstant.TXT_POPUP_ALERT.id_sync,
            content: CommonConstant.TXT_POPUP_ALERT.content_sync,
            textYes: CommonConstant.TXT_POPUP_ALERT.textYes,
            textNo: CommonConstant.TXT_POPUP_ALERT.textNo,
            funcYes: null,
            funcNo: null,
            funcClose: null
        });
    }

    updateStyleShowing() {
        if (this.translate.currentLang === this.hungLang) {
            return {
                display: 'none'
            };
        }
    }
}
