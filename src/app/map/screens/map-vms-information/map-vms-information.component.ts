import { Component, OnInit, Output, Input, EventEmitter, ViewChild, SimpleChanges, ElementRef, OnChanges } from '@angular/core';

@Component({
    selector: 'rmhub-map-vms-information',
    templateUrl: './map-vms-information.component.html',
    styleUrls: ['./map-vms-information.component.scss']
})
export class MapVmsInformationComponent implements OnInit, OnChanges {

    @Output() closePopup: EventEmitter<any> = new EventEmitter();
    @Output() btnSendClick: EventEmitter<any> = new EventEmitter();
    @Input() typeActive = '';
    @Input() markerData: any;
    @ViewChild('closeModal') closeModal: ElementRef;
    infoData: any = {};
    arr_position = [0, 0];
    isMove = false;
    greenColor: 'green';

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['markerData'].currentValue) {
            this.infoData = { ...this.markerData.vmsData };
        }
        if (this.markerData !== undefined) {
            this.typeActive = this.markerData['color'];
        }
    }

    onClosePopup() {
        this.closePopup.emit();
    }

    onMouseDown(e) {
        const popup = document.getElementById('modalInformation');
        this.arr_position = [popup.offsetLeft - e.clientX, popup.offsetTop - e.clientY];
        this.isMove = true;
    }

    onMouseMove(event) {
        event.preventDefault();
        if (this.isMove) {
            const popup = document.getElementById('modalInformation');
            popup.style.left = event.clientX + this.arr_position[0] + 'px';
            popup.style.top = event.clientY + this.arr_position[1] + 'px';
        }
    }

    onMouseUp(event) {
        this.isMove = false;
    }

    onMouseUpDocument(event) {
        this.isMove = false;
    }

    onBtnSendClick() {
        this.markerData.vmsData = { ...this.infoData };
        this.closeModal.nativeElement.click();
        this.btnSendClick.emit();
    }
}
