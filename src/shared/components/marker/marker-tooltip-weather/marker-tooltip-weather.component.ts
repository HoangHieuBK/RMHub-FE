import { Component, OnInit, Input } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
@Component({
    selector: 'rmhub-marker-tooltip-weather',
    templateUrl: './marker-tooltip-weather.component.html',
    styleUrls: ['./marker-tooltip-weather.component.scss']
})
export class MarkerTooltipWeatherComponent implements OnInit {

    constructor() { }
    @Input() alertDeviceData: any;
    ngOnInit() {
    }
    updateStyleContent(alert): Object {
        let objStyle: Object = {};
        if (alert && alert.color) {
            objStyle = { 'background-color': alert.color };
        }
        return objStyle;
    }
}
