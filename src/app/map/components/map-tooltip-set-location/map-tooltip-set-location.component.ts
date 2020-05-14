import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rmhub-map-tooltip-set-location',
    templateUrl: './map-tooltip-set-location.component.html',
    styleUrls: ['./map-tooltip-set-location.component.scss']
})
export class MapTooltipSetLocationComponent implements OnInit {
    @Input() positionDevice: any;
    constructor() { }

    ngOnInit() {
    }

}
