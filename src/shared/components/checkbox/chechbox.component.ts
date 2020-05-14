import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'rmhub-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})

export class RMHCheckboxComponent implements OnInit, OnDestroy {
    checkboxValue = false;
    haveLabel = false;
    ckblabel = '';
    containerClass = 'container container-none-label-width';

    @Output() ckbValChange = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCkbClick = new EventEmitter();
    @Input() value;
    @Input() isDisable;
    @Input() whiteSpace = 'inherit';
    @Input()
    get ckbVal() {
        return this.checkboxValue;
    }

    set ckbVal(val) {
        this.checkboxValue = val;
        this.ckbValChange.emit(this.checkboxValue);
    }

    @Input() set labelText(val: string) {
        if (val.length > 0) {
            this.ckblabel = val;
            this.haveLabel = true;
            this.containerClass = 'container container-label-width';
        } else {
            this.haveLabel = false;
            this.containerClass = 'container container-none-label-width';
        }
    }

    constructor() {
    }
    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }

    toggleVisibility(e) {
        this.ckbVal = e.target.checked;
    }
}

