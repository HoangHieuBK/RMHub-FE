import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'rmhub-map-edit-vms',
    templateUrl: './map-edit-vms.component.html',
    styleUrls: ['./map-edit-vms.component.scss']
})
export class MapEditVmsComponent implements OnInit {

    @Input() editData: any = {};
    @Input() typeActive: any;
    @Output() saveVms: EventEmitter<any> = new EventEmitter<any>();
    remainLetter = 23;
    constructor() { }

    ngOnInit() {
    }

    onBtnSendClick() {
        this.saveVms.emit();
    }

    onKey(value: any): void {
        const length = value.target.value.length;
        if (value) {
            this.remainLetter = 23 - length;
        }
    }

}
