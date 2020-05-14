import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input, AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AlertTraffic} from '@app/traffic-logger/models';
import {ConfirmPopupModel} from '@shared/models/shared/confirm-popup.model';
import {CommonConstant} from '@shared/common/constant.common';
import {AlertTrafficService} from '@app/traffic-logger/services/traffic-logger-alert.service';
import {isNullOrUndefined} from 'util';
import {ValidationService} from '@shared/utilites/validation.service';

@Component({
    selector: 'rmhub-traffic-alert-form',
    templateUrl: './traffic-alert-form.component.html',
    styleUrls: ['./traffic-alert-form.component.css']
})
export class TrafficAlertFormComponent implements OnInit, AfterViewInit {

    alertFrm: FormGroup;
    @ViewChild('colorAlert') colorAlert: ElementRef;
    @ViewChild('focusDescription') focusDes: ElementRef;

    @Input() buttonShow: boolean;
    @Input() isSetting = false;
    @Input() disableButton = false;
    @Input() checkMinGreaterMax = false;
    @Input() checkLevelDuplicate = false;
    @Input() checkSpeedOverlap = false;
    @Input() alerts: AlertTraffic[] = [];

    messageDescriptionFocusOut: string;
    messageMinFocusOut: string;
    messageMaxFocusOut: string;
    messageLevelFocusOut: string;

    disableMessageDescription = false;
    disableMessageMin = false;
    disableMessageMax = false;
    disableMessageLevel = false;


    @Output() listenFromParentToChild: EventEmitter<any> = new EventEmitter<any>();

    @Output() deleteEventData: EventEmitter<any> = new EventEmitter<any>();
    @Output() addEventData: EventEmitter<any> = new EventEmitter<any>();
    @Output() editEventData: EventEmitter<any> = new EventEmitter<any>();

    @Output() editAlertIdToParentFirsth: EventEmitter<any> = new EventEmitter<any>();
    @Output() rePatchValueFromParentToChild: EventEmitter<any> = new EventEmitter<any>();

    alert: any = {id: null, description: '', min: 0, max: 0, level: null};
    popUpModel: ConfirmPopupModel;
    arrAlertColor = CommonConstant.COLOR_ALERT;
    conditionAlert = CommonConstant.CONDITION_ALERT;
    patternValue = CommonConstant.FORMAT_NUMBER;
    borderColorInput = CommonConstant.Border_Input_Invalid;
    minValue = 0;
    maxValue = 1000;
    maxLengthDes = 50;
    maxLengthMinMax = 4;
    timeout = 200;
    checkEditAction = false;

    constructor(
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private validateService: ValidationService,
        private trafficAlertService: AlertTrafficService
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.patchValueForm();
        this.focusDescriprionInit();
        this.initConfirmPopup();
        this.checkDescriptionRequired();
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        this.listenEventData();
        this.rePatchValueFromParentToChild.subscribe((data: any) => {
            if (!isNullOrUndefined(data)) {
                this.alert = data;
                this.checkMinGreaterMax = false;
                this.disableCheckValidate();
                this.alertFrm.reset();
                this.patchValueForm();
                this.initConfirmPopup();
            }
        });
    }

    focusDescriprionInit() {
        if (isNullOrUndefined(this.alert.id)) {
            this.focusDes.nativeElement.focus();
        }
    }


    listenEventData() {
        this.listenFromParentToChild.subscribe((data) => {
            if (data === CommonConstant.ACTION_SUBMIT_DATA.create) {
                this.alert = this.getValueFrm();
                this.messageLevelFocusOut = this.validateService.checkCommonValidator(this.alertFrm, 'level'); // checkLevel when click submit right now
                this.checkMinGreaterMax = (+this.alert.min >= +this.alert.max);
                this.checkLevelDuplicate = this.eventCheckLevel(this.alert, this.alerts);
                this.checkSpeedOverlap = this.checkIntersect(this.alert, this.alerts);
                this.addEmitAlertToParent();
            }

            if (data === CommonConstant.ACTION_SUBMIT_DATA.edit) {
                this.alert = Object.assign({}, this.alert, this.getValueFrm());
                const arrAlertEdit = this.alerts.filter((item) => item.id !== this.alert.id); // array alerts for edit event
                this.checkMinGreaterMax = (+this.alert.min >= +this.alert.max);
                this.checkLevelDuplicate = this.eventCheckLevel(this.alert, arrAlertEdit);
                this.checkSpeedOverlap = this.checkIntersect(this.alert, arrAlertEdit);
                this.editEmitAlertToParent();
            }
        });
    }


    addEmitAlertToParent() {
        if (this.alertFrm.valid && !this.checkMinGreaterMax && !this.checkLevelDuplicate && !this.checkSpeedOverlap) {
            this.addEventData.emit(this.alert);
        }
    }

    editEmitAlertToParent() {
        if (this.alertFrm.valid && !this.checkMinGreaterMax && !this.checkLevelDuplicate && !this.checkSpeedOverlap) {
            this.editEventData.emit(this.alert);
        }
    }

    clickButtonEditAlertFirst() {
        this.focusDes.nativeElement.focus();
        this.editAlertIdToParentFirsth.emit(this.alert.id);
        this.isSetting = true;
        this.checkEditAction = true;
    }

    createForm() {
        this.alertFrm = this.fb.group({
            description: ['', [Validators.required, Validators.maxLength(this.maxLengthDes)]],
            min: ['0', [Validators.required, Validators.max(this.maxValue), Validators.maxLength(this.maxLengthMinMax)]],
            max: ['0', [Validators.required, Validators.max(this.maxValue), Validators.maxLength(this.maxLengthMinMax)]],
            level: ['', [Validators.required]],
        });
    }

    patchValueForm() {
        this.alertFrm.patchValue({
            ...this.alert
        });
        if (this.alert) {
            this.colorAlert.nativeElement.style.background = this.alert.color;
        }
    }

    getValueFrm() {
        return {
            description: this.alertFrm.get('description').value,
            min: this.alertFrm.get('min').value,
            max: this.alertFrm.get('max').value,
            level: this.alertFrm.get('level').value,
            color: CommonConstant.COLOR_ALERT[this.alertFrm.get('level').value - 1]
        };
    }

    setColor(event) {
        const level = event.target.value;
        if (level !== '') {
            this.colorAlert.nativeElement.style.background = CommonConstant.COLOR_ALERT[level - 1];
        } else {
            this.colorAlert.nativeElement.style.background = 'none';
        }
        this.alertFrm.get('level').setValue(level);
    }

    deleteAlert() {
        this.deleteEventData.emit(this.alert);
    }


    // Create confirm popup
    initConfirmPopup() {
        this.popUpModel = new ConfirmPopupModel({
            type: CommonConstant.TXT_POPUP_DELETE.type,
            title: CommonConstant.TXT_POPUP_DELETE.title2,
            id: this.alert.id,
            content: CommonConstant.TXT_POPUP_DELETE.content2,
            textYes: CommonConstant.TXT_POPUP_DELETE.textYes,
            textNo: CommonConstant.TXT_POPUP_DELETE.textNo,
            funcYes: () => {
                this.deleteAlert();
            },
            funcNo: null,
            funcClose: null
        });
    }

    checkDescriptionRequired() {
        const desFrm = this.alertFrm.get('description');
        desFrm.valueChanges.subscribe((data: any) => {
            if (isNullOrUndefined(data) || data.toString().trim() === '') {
                desFrm.setErrors({
                    required: true
                });
            }
        });
    }

    checkDescriptionFocusOut() {
        this.messageDescriptionFocusOut = this.validateService.checkCommonValidator(this.alertFrm, 'description');
    }

    checkMinFocusOut() {
        this.messageMinFocusOut = this.validateService.checkCommonValidator(this.alertFrm, 'min');
    }

    checkMaxFocusOut() {
        this.messageMaxFocusOut = this.validateService.checkCommonValidator(this.alertFrm, 'max');
    }

    checkLevelFocusOut() {
        this.messageLevelFocusOut = this.validateService.checkCommonValidator(this.alertFrm, 'level');
    }

    disableCheckValidate() {
        this.messageDescriptionFocusOut = null;
        this.messageMinFocusOut = null;
        this.messageMaxFocusOut = null;
        this.messageLevelFocusOut = null;
    }

    eventCheckLevel(alert: AlertTraffic, arrAlert: AlertTraffic[]): boolean {
        return arrAlert.findIndex(item => item.level === +alert.level) > -1;
    }

    checkArrayIntersect(a: Array<number>, b: Array<number>): boolean {
        const check1 = (b[0] >= a[0]) && (b[0] < a[1]); // -----a[0]-------b[0]------a[1]------ trường hợp b[0] nằm giữa a[0] và a[1], trả về true
        const check2 = (b[1] >= a[0]) && (b[1] < a[1]); // -----a[0]-------b[1]------a[1]------ trường hợp b[1] nằm giữa a[0] và a[1], trả về true
        const check3 = (b[0] <= a[0] && a[0] <= b[1]) || (b[0] <= a[1] && a[1] <= b[1]); // trường hợp -----b[0]-------a[0]------b[1]------ hoặc -----b[0]-------a[1]------b[1]------
        return (check1 || check2 || check3);
    }

    checkIntersect(alert: AlertTraffic, arrAlerts: AlertTraffic[]): boolean {
        let check = false;
        const arrSpeed = [+alert.min, +alert.max];
        for (const entry of arrAlerts) {
            const arrSpeedRest = [+entry.min, +entry.max];
            if (this.checkArrayIntersect(arrSpeedRest, arrSpeed)) {
                check = true;
                break;
            }
        }
        return check;
    }
}
