import { Component, OnInit, Input } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import { isNullOrUndefined } from 'util';
@Component({
    selector: 'rmhub-marker-speed',
    templateUrl: './marker-speed.component.html',
    styleUrls: ['./marker-speed.component.scss']
})
export class MarkerSpeedComponent implements OnInit {
    @Input() alertDeviceData: any;
    defaultSpeed = CommonConstant.CONSTANT_MAP.defaultValueMesure ;
    dramSpeed = 'km/h';
    constructor() {
    }

    ngOnInit() {

    }
    updateStyleContent(alert): Object {
        let objStyle: Object = { 'background-color': CommonConstant.CONSTANT_MAP.defaultColor };
        if (alert && alert.color) {
            objStyle = { 'background-color': alert.color };
        }
        return objStyle;
    }
    showValueSpeed(_value) {
        if (isNullOrUndefined(_value) || _value === this.defaultSpeed) {
            return this.defaultSpeed;
        }
        return _value + ' ' + this.dramSpeed;
    }
}
