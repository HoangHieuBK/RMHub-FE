import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rmhub-map-vms-info',
    templateUrl: './map-vms-info.component.html',
    styleUrls: ['./map-vms-info.component.scss']
})
export class MapVmsInfoComponent implements OnInit {

    @Input() typeActive: any;

    constructor() { }

    ngOnInit() {
    }

    onMouseDown(i) {

    }

    onMouseUp(i) {
    }

}
