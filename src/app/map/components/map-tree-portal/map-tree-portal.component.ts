import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'rmhub-map-tree-portal',
    templateUrl: './map-tree-portal.component.html',
    styleUrls: ['./map-tree-portal.component.scss']
})
export class MapTreePortalComponent implements OnInit {

    @Input() ar: any[];
    @Output() chooseActiveEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() chooseActiveChildEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() templateShowEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() showFolderEvent: EventEmitter<any> = new EventEmitter<any>();
    constructor() { }

    ngOnInit() {
    }

    chooseActive(i) {
        this.chooseActiveEvent.emit(i);
    }

    showFolder(i) {
        this.showFolderEvent.emit(i);
    }

    chooseActiveChild(i, j) {
        const value = {i, j};
        this.chooseActiveEvent.emit(value);

    }

    templateShow() {
        this.templateShowEvent.emit();
    }

}
