import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';

@Component({
    selector: 'rmhub-select-box',
    templateUrl: './select-box.component.html',
    styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

    @Input() colorSelectItem = CommonConstant.COLOR_ALERT;
    @Input() selectItemContent = CommonConstant.ALERT_LEVELS;
    @Input() disable: number;
    @Input() valueSlt: number;
    @Input() highlighBorder: boolean;
    borderColorInput =  CommonConstant.Border_Input_Invalid;

    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    selectedItem(value?: any) {
        this.valueSlt = value;
        this.change.emit(value);
    }
}
