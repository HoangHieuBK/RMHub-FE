import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getRandomArrayElement } from '@shared/utilites';
import { CommonConstant } from '@shared/common/constant.common';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'rmhub-popup-traffic',
    templateUrl: './maker-popup-traffic.component.html',
    styleUrls: ['./maker-popup-traffic.component.scss']
})
export class MakerPopupTrafficComponent implements OnInit {

    @Input() deviceData: any;
    @Input() typeActive = '';
    @Input() titleTraffic = '';
    @Output() closePopup: EventEmitter<any> = new EventEmitter();
    statusOfTrafficMap = '';
    @Input() alertDeviceData: any;
    defaultColor = '#FF2D2D';
    defaultWith = '-webkit-fill-available';
    updated_at = null;
    defaultValue = CommonConstant.CONSTANT_MAP.defaultValueMesure;
    commonConstant = CommonConstant;
    formatDate = 'dd/MM/yyyy HH:mm';
    classTileBar = {
        default: 'green',
        error: 'black'
    };
    constructor(
        private router: Router,
        public datePipe: DatePipe
    ) {

    }

    ngOnInit() {
        this.alertDeviceData = {
            flow: this.defaultValue,
            averageSpeed: this.defaultValue,
            occupationRate: this.defaultValue,
            communication: {
                value_convert: this.defaultValue
            },
            power: this.defaultValue,
            system: this.defaultValue,
        };
    }

    onClosePopup() {
        this.closePopup.emit();
    }
    updateStyleTitleTime(alert, action = true) {
        let objStyle: Object;
        if (action) {
            if (!alert || !alert.description) {
                objStyle = { 'width': this.defaultWith };
            }
        } else {
            if (alert && alert.color) {
                objStyle = { 'background-color': alert.color };

            }
        }
        return objStyle;
    }
    routerUrl(id = '') {
        if (id) {
            this.router.navigateByUrl(CommonConstant.URL_TRAFFIC_LOGGER.detail + '/' + id);
        }
    }
    updateValueOfDate(_value: string | Date) {
        let _valueChange = this.defaultValue;
        if (_value) {
            _valueChange = this.datePipe.transform(_value, this.formatDate);
        }
        return _valueChange;
    }
    updateTitlePopup(_status) {
        let objStyle = this.classTileBar.default;
        if (_status && _status !== this.commonConstant.MapMesureTraffic.communicationNormal) {
            objStyle = this.classTileBar.error;
        }
        return objStyle;
    }
}
