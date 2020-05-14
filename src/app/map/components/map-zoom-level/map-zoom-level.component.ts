import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rmhub-map-zoom-level',
    templateUrl: './map-zoom-level.component.html',
    styleUrls: ['./map-zoom-level.component.scss']
})
export class MapZoomLevelComponent implements OnInit {
    @Input() currentZoomLevel: string;
    constructor() { }

    ngOnInit() {
    }

}
