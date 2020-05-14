import { Component, OnInit, ViewChild, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonConstant } from '@shared/common/constant.common';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';
import { ALERT } from '@app/weather-stations/models/alert-setting.interface';
import { isNullOrUndefined } from 'util';
import { ValidationService } from '@shared/utilites/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'rmhub-alert-setting-form',
    templateUrl: './alert-setting-form.component.html',
    styleUrls: ['./alert-setting-form.component.css']
})
export class AlertSettingFormComponent implements OnInit, AfterViewInit {

    alertFrm: FormGroup;
    @ViewChild('colorAlert') colorAlert: ElementRef;
    @ViewChild('selectCode') selectCode: ElementRef;
    @ViewChild('inputContent') inputContent: ElementRef;

    windAlerts: ALERT[];
    alert: ALERT = { alertCode: null, content: null, condition: null, value: 0, level: null };
    popUpModel: ConfirmPopupModel;

    dataMapping = CommonConstant.MAPPING_WS_ALERT_VALUE;
    arrAlertColor = CommonConstant.COLOR_ALERT;
    arrAlertCodes: any[] = [];
    conditionAlerts = CommonConstant.CONDITION_ALERT;
    conditionAlertsRef = [{ id: 1, condition: '>=' }, { id: 2, condition: '<=' }, { id: 3, condition: '=' }];

    isSetting = false;
    buttonShow: boolean;
    disableButton = false;
    showValidate = false;
    disableSelectAlertCode: boolean;
    isExceedValue = false;

    constraintCondition = false;
    constraintValue = false;
    checkDuplicateValue = false;
    checkOnlySpacingContent = false;

    maxLengthValue = 4;
    maxLengthContent = 100;
    exceedValue = 1000;
    timerShowMessage = 150;

    patternValue = CommonConstant.Pattern_Number;
    borderColorInput = CommonConstant.Border_Input_Invalid;

    settingAlert: EventEmitter<any> = new EventEmitter<any>();
    settingAlertData: EventEmitter<any> = new EventEmitter<any>();
    rePathValueToForm: EventEmitter<any> = new EventEmitter<any>();
    selectAlertDelete: EventEmitter<any> = new EventEmitter<any>();
    selectAlertEdit: EventEmitter<any> = new EventEmitter<any>();

    ALR_WIND_LEVEL1 = CommonConstant.ALERT_CODE_WIND[0];
    ALR_WIND_LEVEL2 = CommonConstant.ALERT_CODE_WIND[1];
    equalOperator = '=';

    isContentFocus = false;

    messageAlertCodeInvalid: string;
    messageContentInvalid: string;
    messageConditionInvalid: string;
    messageValueInvalid: string;
    messageLevelInvalid: string;

    disableMessageAlertCode = false;
    disableMessageContent = false;
    disableMessageCondition = false;
    disableMessageValue = false;
    disableMessageLevel = false;

    alertRef: any;
    disTranslate: boolean;
    contentRef: string;
    private subscription = new Subscription();

    constructor(private fb: FormBuilder, private validationService: ValidationService, public translate: TranslateService) {
    }

    ngOnInit() {
        this.createForm();
        this.pathValue();
        this.initConfirmPopup();
        this.focusOnAlertCode();
        this.translateContent();
    }

    ngAfterViewInit() {
        this.listenActionEventData();
        this.rePathValueToForm.subscribe((data) => {
            this.alert = data;
            this.disableValidate();
            this.alertFrm.reset();
            this.pathValue();
            this.setDefaultTranslate();
        });
    }

    listenActionEventData() {
        this.settingAlert.subscribe((act) => {
            if (act === CommonConstant.ACTION_SUBMIT_DATA.create) {
                this.alert = this.getValueFrm();
                this.initConfirmPopup();
                this.actionSettingAlert();
            } else if (act === CommonConstant.ACTION_SUBMIT_DATA.edit) {
                this.alert = this.getValueFrm(true);
                this.actionSettingAlert();
            }
        });
    }

    createForm() {
        this.alertFrm = this.fb.group({
            alertCode: ['', [Validators.required]],
            content: ['', [Validators.required, Validators.maxLength(this.maxLengthContent)]],
            condition: ['', [Validators.required]],
            value: ['', [Validators.required, Validators.maxLength(this.maxLengthValue)]],
            level: ['', [Validators.required]]
        });
    }

    pathValue() {
        this.alertFrm.patchValue({
            ...this.alert
        });
        this.colorAlert.nativeElement.style.background = this.alert.color;
    }

    getValueFrm(check = false) {
        let obj = {};
        if (check) {
            obj = { id: this.alert.id };
        }
        return Object.assign(obj, {
            alertCode: this.alertFrm.get('alertCode').value,
            content: this.alertFrm.get('content').value,
            condition: +this.alertFrm.get('condition').value,
            value: +this.alertFrm.get('value').value,
            level: +this.alertFrm.get('level').value,
            color: CommonConstant.COLOR_ALERT[this.alertFrm.get('level').value - 1]
        });
    }

    setDefaultTranslate() {
        this.disTranslate = false;
        this.subscription.unsubscribe();
    }

    setColor(event) {
        const level = event.target.value;
        if (level !== '') {
            this.colorAlert.nativeElement.style.background = CommonConstant.COLOR_ALERT[level - 1];
        } else {
            this.colorAlert.nativeElement.style.background = 'none';
        }
    }

    // when alert form is initiated, select alertCode is focused on
    focusOnAlertCode() {
        if (!this.alert.alertCode) {
            this.selectCode.nativeElement.focus();
        }
    }

    doEditAction() {
        this.conditionAlerts = this.showConditionForAlertType(this.alert.alertCode);
        this.showConditionForAlertType(this.alert.alertCode);
        this.inputContent.nativeElement.focus();
        this.selectAlertEdit.emit(this.alert);
        this.isSetting = true;
        this.disableSelectAlertCode = true;
    }

    deleteAlert() {
        this.selectAlertDelete.emit(this.alert);
    }

    actionSettingAlert() {
        this.validateAsSubmit();
        if (this.alertFrm.valid && !this.isExceedValue && !this.checkOnlySpacingContent) {
            this.settingAlertData.emit(this.alert);
        }
    }

    selectAlertCode(event) {
        this.disTranslate = false;
        const code = event.target.value;
        this.conditionAlerts = this.showConditionForAlertType(code);
        this.setDefaultContent();
        if (code !== '') {
            this.alertRef = this.dataMapping.find(item => item.alertCode === code);
            this.contentRef = this.translate.instant(this.alertRef.content);
            this.alertFrm.get('content').setValue(this.translate.instant(this.alertRef.content));
        } else {
            this.alertRef = null;
            this.contentRef = null;
            this.alertFrm.get('content').setValue('');
        }
        this.isContentFocus = false;
    }

    setDefaultContent() {
        const cdt = this.conditionAlerts.find(item => this.alert.condition === item.id);
        if (isNullOrUndefined(cdt)) {
            this.alertFrm.get('condition').setValue('');
        }
    }

    translateContent() {
        this.subscription.add(this.translate.onLangChange.subscribe(() => {
            const contentFrm = this.alertFrm.get('content').value;
            if (this.alertRef) {
                if (!this.disTranslate && contentFrm === this.contentRef) {
                    this.alertFrm.get('content').setValue(this.translate.instant(this.alertRef.content));
                }
                this.contentRef = this.translate.instant(this.alertRef.content);
            }
        }));
    }

    disableTranslateContent() {
        this.disTranslate = true;
    }

    showConditionForAlertType(alert_code: string) {
        if (alert_code !== '' && alert_code !== this.ALR_WIND_LEVEL1 && alert_code !== this.ALR_WIND_LEVEL2) {
            return CommonConstant.CONDITION_ALERT.filter(item => item.condition === this.equalOperator);
        }
        return this.conditionAlertsRef;
    }

    setCondition(no?: number) {
        const conditionAlert = this.conditionAlerts.find(item => item.id === no);
        if (conditionAlert) {
            return conditionAlert.condition;
        }
        return null;
    }

    checkValueExceed1000(value: number) {
        if (!isNullOrUndefined(value) && value > this.exceedValue) {
            return true;
        }
        return false;
    }

    // validator
    alertCodeFocusOut() {
        this.messageAlertCodeInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'alertCode');
    }
    contentFocusOut() {
        this.checkOnlySpacingContent = !(/\S/.test(this.alertFrm.get('content').value));
        this.isContentFocus = true;
        this.messageContentInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'content');
    }
    conditionFocusOut() {
        this.messageConditionInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'condition');
    }
    valueFocusOut() {
        this.messageValueInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'value');
        this.isExceedValue = this.checkValueExceed1000(this.alertFrm.get('value').value);
    }
    levelFocusOut() {
        this.messageLevelInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'level');
    }

    disableValidate() {
        this.messageAlertCodeInvalid = null;
        this.messageContentInvalid = null;
        this.messageConditionInvalid = null;
        this.messageValueInvalid = null;
        this.messageLevelInvalid = null;
        this.checkOnlySpacingContent = false;
    }

    validateAsSubmit() {
        this.messageAlertCodeInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'alertCode');
        this.messageContentInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'content');
        this.isContentFocus = true;
        this.messageConditionInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'condition');
        this.messageValueInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'value');
        this.isExceedValue = this.checkValueExceed1000(this.alertFrm.get('value').value);
        this.messageLevelInvalid = this.validationService.checkCommonValidator(this.alertFrm, 'level');
    }

    // Create confirm popup
    initConfirmPopup() {
        this.popUpModel = new ConfirmPopupModel({
            type: 1,
            title: 'Confirm-Popup.title_alert',
            id: this.alert.alertCode,
            content: 'Confirm-Popup.content_alert',
            textYes: 'Confirm-Popup.textYes',
            textNo: 'Confirm-Popup.textNo',
            funcYes: () => {
                this.deleteAlert();
            },
            funcNo: null,
            funcClose: null
        });
    }
}
