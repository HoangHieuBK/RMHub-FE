import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rmhub-error-validate',
    templateUrl: './error-validate.component.html',
    styleUrls: ['./error-validate.component.css']
})
export class ErrorValidateComponent implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('control') control: any;
    // tslint:disable-next-line:no-input-rename
    @Input('control-name') controlName: any;

    constructor() { }

    get message() {
        for (const err in this.control.errors) {
            if (this.control.touched) {
                return this.getErrorMessage(err, this.control.errors[err]);
            }
        }
        return null;
    }

    getErrorMessage(err, value) {
        const message = {
            'required': `${this.controlName} Required`,
            'minlength': `${this.controlName} must be greater than ${value.requiredLength} characters`,
            'maxlength': `${this.controlName} must be less than ${value.requiredLength} characters`,
        };
        return message[err];
    }
    ngOnInit() {
    }

}
