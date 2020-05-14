import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'rmhub-choose-location',
    templateUrl: './choose-location.component.html',
    styleUrls: ['./choose-location.component.scss']
})
export class ChooseLocationComponent implements OnInit {

    constructor() { }
    @Output()
    render = new EventEmitter<boolean>();
    ngOnInit() {
    }
    setLocation() {
        this.render.emit(true);
    }
}
