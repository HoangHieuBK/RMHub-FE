import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'rmhub-maker-register-device',
    templateUrl: './maker-register-device.component.html',
    styleUrls: ['./maker-register-device.component.scss']
})
export class MakerRegisterDeviceComponent implements OnInit {

    @Output() closePopup: EventEmitter<any> = new EventEmitter();
    @Output() typeDevice: EventEmitter<any> = new EventEmitter();
    device: string;
    typeActive = 'green';
    constructor() { }

    ngOnInit() {
    }

    cancelRegister() {
        this.closePopup.emit();
    }

    createMaker() {
        if (this.device !== undefined) {
            this.typeDevice.emit(this.device);
        }
    }
}
