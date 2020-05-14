import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapSandbox } from '@app/map/map.sandbox';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';
import { TranslateService } from '@ngx-translate/core';
import { WeatherStation } from '@app/weather-stations/models';
import { checkResponseOk } from '@shared/utilites/function.common';

@Component({
    selector: 'rmhub-map-set-location',
    templateUrl: './map-set-location.component.html',
    styleUrls: ['./map-set-location.component.scss']
})
export class MapSetLocationComponent implements OnInit, OnDestroy {
    @Input() deviceData: any[];
    @Output() closePopup: EventEmitter<any> = new EventEmitter();
    @Output() removePopup: EventEmitter<any> = new EventEmitter();
    @Input() typeActive = '';
    deviceSelected: WeatherStation;
    popUpModel: ConfirmPopupModel;
    content: string;

    public subscription = new Subscription();

    styleScroll = { 'height': '185px', 'overflow-y': 'scroll', 'overflow-x': 'hidden' };
    maxSizeScroll = 5;

    @ViewChild('scroll') scroll: ElementRef;

    status = 1;
    deploymentId = 1;
    statusRegistration = 'Registered';
    messageGrid: string;
    isSearching = false;
    disableEmitData = false;

    @Input() deviceType;
    @Input() positionDevice: any;
    @Output() deviceInfo: EventEmitter<any> = new EventEmitter();
    @Output() updateData: EventEmitter<any> = new EventEmitter();
    @Output() configPopup: EventEmitter<any> = new EventEmitter();

    constructor(private mapSanBox: MapSandbox, private translate: TranslateService) { }

    ngOnInit() {
        this.searchDispatchAction(this.status, +this.deviceType, this.deploymentId, '');
        this.registerDevice();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    registerDevice() {
        this.subscription.add(this.mapSanBox.searchDeviceData$.subscribe((data: any) => {
            if (!data) {
                return;
            }
            if (checkResponseOk(data)) {
                this.showMess(data.data);
                this.deviceData = data.data;
                this.deviceSelected = this.deviceData[0];
                this.updateData.emit();
            }
        }));
    }

    showMess(devices: any[]) {
        if (devices.length === 0) {
            if (this.isSearching) {
                this.messageGrid = 'Grid_Message.NoSearchResult';
            } else {
                this.messageGrid = 'Grid_Message.NoRecordsShown';
            }
        } else {
            this.messageGrid = '';
        }
    }

    searchDispatchAction(status: number, deviceType: number, deploymentId: number, name: string) {
        this.mapSanBox.searchDevice({ status: status, deviceType: deviceType, deploymentId: deploymentId, name: name });
    }

    searchDeviceByName(name) {
        this.isSearching = true;
        this.searchDispatchAction(this.status, +this.deviceType, this.deploymentId, name);
    }

    selectDevice(dv: any) {
        this.deviceSelected = dv;
    }

    submitPopupInfo() {
        if (this.deviceSelected && this.deviceSelected.registration === this.statusRegistration) {
            this.initConfirmPopup();
            this.configPopup.emit(this.popUpModel);
        }
        if (this.deviceSelected && this.deviceSelected.registration !== this.statusRegistration) {
            this.submit();
        }
    }

    submit() {
        const position = { longitude: this.positionDevice.lat, latitude: this.positionDevice.lng };
        if (!this.disableEmitData) {
            this.mapSanBox.setLocationDevice({ position: position, id: this.deviceSelected.id });
            this.disableEmitData = true;
        }
        this.removePopup.emit();
    }

    onClosePopup() {
        this.closePopup.emit();
    }

    // Create confirm popup
    initConfirmPopup() {
        this.popUpModel = new ConfirmPopupModel({
            type: 0,
            title: 'Map.Confirm-Popup.title',
            id: 'setLocation',
            content: '[' + this.deviceSelected.name + ']' + ' ' + this.translate.instant('Map.Confirm-Popup.content'),
            textYes: 'Map.Confirm-Popup.textYes',
            textNo: 'Map.Confirm-Popup.textNo',
            funcYes: () => {
                this.submit();
            },
            funcNo: null,
            funcClose: null
        });
    }

    setScroll(lengthOfDevices: number): Object {
        if (lengthOfDevices > this.maxSizeScroll) {
            return this.styleScroll;
        }
        return {};
    }

}
