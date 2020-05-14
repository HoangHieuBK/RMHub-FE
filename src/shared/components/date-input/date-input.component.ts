import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'rmhub-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss']
})
export class InputDateComponent implements OnInit {

    @Input() isIcon: boolean;
    @Input() isDisable: boolean;
    @Input() datePicker: any;
    @Output() valueOfDate: EventEmitter<any> = new EventEmitter<any>();

    formControl: any;

    constructor() { }

    ngOnInit(): void {
        this.formControl = new FormControl(this.datePicker);
    }

    changeDate(value): void {
        this.valueOfDate.emit(value);
    }
}
