import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { isNullOrUndefined } from 'util';
@Component({
    selector: 'rmhub-weather-map',
    templateUrl: './rmhub-weather-map.component.html',
    styleUrls: ['./rmhub-weather-map.component.scss']
})
export class RmhubWeatherMapComponent implements OnInit {

    @Input() deviceData: any;
    @Input() typeActive = '';
    @Input() titleWeather = '';
    @Output() closePopup: EventEmitter<any> = new EventEmitter();
    @Input() alertDeviceData: any;

    isShowMore = false;
    colorOrange = '#F2994A';
    colorGreen = '#219653';
    actionShowMore: EventEmitter<any> = new EventEmitter();
    commonConstant = CommonConstant;
    defaultValue = CommonConstant.CONSTANT_MAP.defaultValueMesure;
    statusDevice = CommonConstant.MapMesureWeather.valueTechnicalNormal;
    valueRawTemperature = 0.1;
    formatDate = 'dd/MM/yyyy HH:mm';
    valueAfterComma = 2;
    statusDeviceError = CommonConstant.MapMesureWeather.valueTechnicalError;
    constructor(
        private router: Router,
        public datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.alertDeviceData = {
            externalId: '',
            surfaceTemperature: this.defaultValue,
            surfaceStatus: this.defaultValue,
            freezingTemperature: this.defaultValue,
            waterFilmHeight: this.defaultValue,
            airTemperature: this.defaultValue,
            airHumidity: this.defaultValue,
            dewPointTemperature: this.defaultValue,
            precipitationHeight: this.defaultValue,
            windSpeedMin: this.defaultValue,
            windSpeedMax: this.defaultValue,
            typeOfPrecipitation: this.defaultValue,
            intensityOfPrecipitation: this.defaultValue,
            windDirection: this.defaultValue,
            atmosphericPressure: this.defaultValue,
            winterConditionsWarning: this.defaultValue,
            winterPrecipitationsWarning: this.defaultValue,
            communication: {
                value_real: null,
                value_convert: this.defaultValue
            },
            gateOpen: {
                value_real: null,
                value_convert: this.defaultValue
            },
            powerDefault: {
                value_real: null,
                value_convert: this.defaultValue
            },
            updated_at: null
        };

    }

    onClosePopup() {
        this.closePopup.emit();
    }

    showMoreInfo() {
        this.isShowMore = !this.isShowMore;
        this.actionShowMore.emit();
    }
    routerUrl(id = '') {
        if (id) {
            this.router.navigateByUrl(CommonConstant.URL_WEATHER_STATION.detail + '/' + id);
        }
    }
    updateStyleElement(target: number | Array<number> = null) {
        let objStyle: Object = { 'background': this.colorGreen };
        if (!isNullOrUndefined(target)) {
            if (typeof target === 'number') {
                if (target === this.statusDeviceError) {
                    objStyle = { 'background': this.colorOrange };
                }
            }
            if (Array.isArray(target)) {
                if (target.length >= 2) {
                    if ((target[0] === this.statusDeviceError && !isNullOrUndefined(target[0]))
                        || (target[1] === this.statusDeviceError && !isNullOrUndefined(target[1]))) {
                        objStyle = { 'background': this.colorOrange };
                    }
                }
            }
        }
        return objStyle;
    }
    updateValue(_value: number) {
        let _valueChange = this.defaultValue;
        if (!isNullOrUndefined(_value) && typeof _value === 'number') {
            _valueChange = (_value * this.valueRawTemperature).toFixed(this.valueAfterComma);
        }
        return _valueChange;
    }
    updateValueOfDate(_value: string | Date) {
        let _valueChange = this.defaultValue;
        if (_value) {
            _valueChange = this.datePipe.transform(_value, this.formatDate);
        }
        return _valueChange;
    }
    updateStyleSurfaceStatus(_value) {
        let objStyle: Object = {};
        if (!isNullOrUndefined(_value)) {
            objStyle = { 'background': _value };
        }
        return objStyle;
    }
}
