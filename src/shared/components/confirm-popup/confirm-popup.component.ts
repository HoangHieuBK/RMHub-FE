import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';

@Component({
    selector: 'rmhub-confirm-popup',
    templateUrl: './confirm-popup.component.html',
    styleUrls: ['./confirm-popup.component.scss'],
})

export class ConfirmPopupComponent implements OnInit {
    @Input() popUpModel: ConfirmPopupModel;
    @Input() expandHeaderName: string;

    constructor() { }
    ngOnInit() {
    }

    initPopupModel() {
        this.popUpModel = new ConfirmPopupModel({
            type: 1,
            title: '',
            id: '',
            content: '',
            textYes: '',
            textNo: '',
            funcYes: null,
            funcNo: null,
            funcClose: null
        });
    }

    onButtonClicked(key: string) {
        switch (key) {
            case 'yes':
                if (typeof this.popUpModel.funcYes === 'function') {
                    this.popUpModel.funcYes();
                }
                break;
            case 'no':
                if (typeof this.popUpModel.funcNo === 'function') {
                    this.popUpModel.funcNo();
                }
                break;
            case 'close':
                if (typeof this.popUpModel.funcClose === 'function') {
                    this.popUpModel.funcClose();
                }
                break;
        }
    }
    updateStyleElement(option): string {
        switch (option) {
            case 1:
            case 3: {
                return 'color-confirm';
            }
            case 0:
            case 2: {
                return 'color-alert';
            }
        }
    }
    showElement(option): boolean {
        switch (option) {
            case 0:
            case 1: {
                return true;
            }
            case 3:
            case 2: {
                return false;
            }
        }
    }
}
