import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'rmhub-map-traffic-sign',
    templateUrl: './map-traffic-signs.component.html',
    styleUrls: ['./map-traffic-signs.component.scss']
})
export class MapTrafficSignComponent implements OnInit {

    @Input() arr_img: any[];
    @Input() typeActive: any;
    @Input() currentActive: any;
    @Input() id: any;
    @Output() getImg: EventEmitter<any> = new EventEmitter<any>();
    @Output() saveSelectImg: EventEmitter<any> = new EventEmitter<any>();
    constructor() { }

    ngOnInit() {
    }

    onBtnSaveCommandClickL() {
        this.saveSelectImg.emit();
    }

    getImg1(i) {
        this.getImg.emit(i);
    }

}
