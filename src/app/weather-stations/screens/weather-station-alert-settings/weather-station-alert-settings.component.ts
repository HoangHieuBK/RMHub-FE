import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy, ComponentRef } from '@angular/core';
import { ALERT } from '@app/weather-stations/models/alert-setting.interface';
import { WSAlertSService } from '@app/weather-stations/services/ws-alert.service';
import { AlertSettingFormComponent } from '@app/weather-stations/components/alert-setting-form/alert-setting-form.component';
import { CommonConstant } from '@shared/common/constant.common';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { WeatherStationSandbox } from '@app/weather-stations/weather-station.sandbox';
import { isNullOrUndefined } from 'util';
import { checkResponseOk } from '@shared/utilites/function.common';

@Component({
    selector: 'rmhub-weather-station-alert-settings',
    templateUrl: './weather-station-alert-settings.component.html',
    styleUrls: ['./weather-station-alert-settings.component.scss']
})
export class WeatherStationAlertSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

    alerts: ALERT[] = [];
    alertCurrent: ALERT;
    preAlert: ALERT;
    componentRefs: ComponentRef<any>[] = [];
    componentRefCurrent: ComponentRef<any>;
    alertCodes = CommonConstant.ALERT_CODES;
    lengthOfAlerts: number;

    isCreating = false;
    isSettingAlert = false;
    isOverFlow = false;
    disableEmitData = false;
    hideMessageGrid = true;
    disableAddAlertButton = true;

    alertCodeWindLV1 = CommonConstant.ALERT_CODE_WIND[0];
    alertCodeWindLV2 = CommonConstant.ALERT_CODE_WIND[1];
    alertWinds = CommonConstant.ALERT_CODE_WIND;
    disable = 'disable';
    enable = 'enable';

    notifySuccess = 'success';
    messageSuccess = 'Success';
    styleScroll = { 'height': '575px', 'overflow-y': 'scroll', 'overflow-x': 'hidden' };

    condition = {
        greater: 1,
        less: 2,
        equal: 3
    };

    @ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
    @ViewChild('scroll') scroll: ElementRef;

    private subscription = new Subscription();

    maxSizeScroll = 7;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private notifier: NotifierService,
        private translate: TranslateService,
        public wsSandbox: WeatherStationSandbox,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.doGetAlertAction();
        this.registerEvents();
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.wsSandbox.wsAlertResetState();
    }

    // get data from sanbox
    registerEvents() {
        this.subscription.add(this.wsSandbox.getWSAlertData$.subscribe(data => {
            if (!data) {
                return;
            }
            this.disableAddAlertButton = false;
            this.hideMessageGrid = false;
            if (checkResponseOk(data)) {
                this.alerts = data.data;
                this.loadAllAlertComponent();
                this.checkAction();
                this.lengthOfAlerts = this.alerts.length;
            }
        }));
        this.subscription.add(this.wsSandbox.deleteWSAlertData$.subscribe(data => {
            if (!data) {
                return;
            }
            if (checkResponseOk(data)) {
                this.translate.get('Notifier.Alert-Setting.delete-success').subscribe(message => this.notifier.notify(this.notifySuccess, message));
                this.deleteAlert();
            }
        }));
        this.subscription.add(this.wsSandbox.addWSAlertData$.subscribe(data => {
            if (!data) {
                return;
            }
            this.disableEmitData = false;
            if (checkResponseOk(data)) {
                this.translate.get('Notifier.Alert-Setting.add-success').subscribe(message => this.notifier.notify(this.notifySuccess, message));
                if (data.data[0]) {
                    this.addAlert(data.data[0]);
                }
            }
        }));
        this.subscription.add(this.wsSandbox.editWSAlertData$.subscribe(data => {
            if (!data) {
                return;
            }
            this.disableEmitData = false;
            if (checkResponseOk(data)) {
                this.translate.get('Notifier.Alert-Setting.edit-success').subscribe(message => this.notifier.notify(this.notifySuccess, message));
                if (data.data[0]) {
                    this.editAlert(data.data[0]);
                }
            }

        }));
    }

    doGetAlertAction() {
        this.wsSandbox.getWSAlerts();
    }

    setScroll(lengthOfAlerts: number): Object {
        if (lengthOfAlerts >= this.maxSizeScroll) {
            return this.styleScroll;
        }
        return {};
    }

    // create a new form alert
    createDynamicAlertComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertSettingFormComponent);
        this.componentRefCurrent = this.viewContainerRef.createComponent(componentFactory);
        this.componentRefCurrent.instance.arrAlertCodes = this.availableAlertCode(); // get available alertCode
    }

    // load all of list alert and show it on screen
    loadAllAlertComponent() {
        this.alerts.forEach(alert => {
            this.createDynamicAlertComponent();
            this.addComponentRef(this.componentRefCurrent);
            this.componentRefCurrent.instance.alert = alert; // assign one by one alert's data is gotten form alertService to children' alert to path value to form
        });
    }

    // this is event click Add new alert and new empty alert form is shown
    createAlertComponent() {
        this.createDynamicAlertComponent();
        this.componentRefCurrent.instance.disableSelectAlertCode = false;
        this.componentRefCurrent.instance.isSetting = true;
        this.componentRefCurrent.instance.buttonShow = true;
        this.isSettingAlert = true;
        this.isCreating = true;
        this.disableEnableButton(this.disable, this.componentRefs);
        this.lengthOfAlerts = ++this.lengthOfAlerts;
    }

    // add new alert
    addAlert(alert: ALERT) {
        this.alertCurrent = alert;
        this.alerts.push(alert);
        this.setViewAlertAsFinishedAction(this.componentRefCurrent, alert);
        this.componentRefCurrent.instance.disableSelectAlertCode = true;
        this.isCreating = false;
        this.addComponentRef(this.componentRefCurrent); // after add successfully new alert component will be add list to management
        this.availableAlertCode(); // update available alertCode after add successfully
        this.checkNewAction(this.componentRefCurrent); // create a listen action from new alert
    }

    // delete a alert
    deleteAlert() {
        const index = this.alerts.findIndex(item => item.alertCode === this.alertCurrent.alertCode);
        this.alerts.splice(index, 1);
        this.removeComponentRef(this.componentRefCurrent);
        this.addAlertCode(this.alertCurrent.alertCode);
        this.alertCurrent = undefined;
        this.lengthOfAlerts = --this.lengthOfAlerts;
    }

    // edit a alert
    editAlert(alert: ALERT) {
        const index = this.alerts.findIndex(item => item.alertCode === alert.alertCode);
        this.alerts[index] = alert;
        this.setViewAlertAsFinishedAction(this.componentRefCurrent, alert);
    }

    setViewAlertAsFinishedAction(comptRef: ComponentRef<any>, alert: ALERT) {
        comptRef.instance.rePathValueToForm.emit(alert);
        this.isSettingAlert = false;
        comptRef.instance.isSetting = false;
        comptRef.instance.buttonShow = false;
        comptRef.instance.alert = this.alertCurrent;
        this.disableEnableButton(this.enable, this.componentRefs);
        this.alertCurrent = undefined;
    }

    // get correct component by parameter's alert
    getComponentRef(alert: ALERT) {
        for (let i = 0; i < this.componentRefs.length; ++i) {
            if (this.componentRefs[i].instance.alert.id === alert.id) {
                return this.componentRefs[i];
            }
        }
        return;
    }

    removeComponentRef(componentRef) {
        if (componentRef) {
            componentRef.destroy();
            this.componentRefs.splice(this.componentRefs.indexOf(componentRef), 1);
        }
    }

    addComponentRef(componentRef) {
        this.componentRefs.push(componentRef);
    }

    // listen click event of icon delete and edit
    checkAction() {
        this.componentRefs.forEach(item => {
            this.listenEditAction(item);
            this.listenDeleteAction(item);
        });
    }

    disableMessageValidate() {
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageAlertCodeInvalid)) {
            this.componentRefCurrent.instance.disableMessageAlertCode = true;
        }
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageContentInvalid)) {
            this.componentRefCurrent.instance.disableMessageContent = true;
        }
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageConditionInvalid)) {
            this.componentRefCurrent.instance.disableMessageCondition = true;
        }
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageValueInvalid)) {
            this.componentRefCurrent.instance.disableMessageValue = true;
        }
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageLevelInvalid)) {
            this.componentRefCurrent.instance.disableMessageLevel = true;
        }
    }
    enableMessageValidate() {
        this.componentRefCurrent.instance.disableMessageAlertCode = false;
        this.componentRefCurrent.instance.disableMessageContent = false;
        this.componentRefCurrent.instance.disableMessageCondition = false;
        this.componentRefCurrent.instance.disableMessageValue = false;
        this.componentRefCurrent.instance.disableMessageLevel = false;
        this.componentRefCurrent.instance.checkOnlySpacingContent = false;
    }

    checkNewAction(componentRefCurrent: any) {
        this.listenEditAction(componentRefCurrent);
        this.listenDeleteAction(componentRefCurrent);
    }

    listenEditAction(componentRefCurrent: any) {
        componentRefCurrent.instance.selectAlertEdit.subscribe((alert) => {
            this.isSettingAlert = true;
            this.preAlert = alert;
            this.componentRefCurrent = this.getComponentRef(alert);
            componentRefCurrent.instance.settingAlertData.subscribe((data) => {
                this.alertCurrent = data;
            });
            this.disableEnableButton(this.disable, this.componentRefs);
        });
    }

    listenDeleteAction(componentRefCurrent: any) {
        componentRefCurrent.instance.selectAlertDelete.subscribe(alert => {
            this.componentRefCurrent = this.getComponentRef(alert);
            this.alertCurrent = alert;
            this.wsSandbox.deleteWSAlerts(this.alertCurrent.id);
        });
    }

    submitData() {
        if (this.isCreating) {
            this.componentRefCurrent.instance.settingAlertData.subscribe(alert => {
                this.alertCurrent = alert;
            });
            this.componentRefCurrent.instance.settingAlert.emit(CommonConstant.ACTION_SUBMIT_DATA.create);
            if (this.checkValid(this.alertCurrent)) {
                if (!this.disableEmitData) {
                    this.wsSandbox.addWSAlerts(this.alertCurrent);
                    this.disableEmitData = true;
                }
            }
        } else {
            this.componentRefCurrent.instance.settingAlert.emit(CommonConstant.ACTION_SUBMIT_DATA.edit);
            if (this.checkValid(this.alertCurrent)) {
                if (!this.disableEmitData) {
                    this.wsSandbox.editWSAlerts(this.alertCurrent);
                    this.disableEmitData = true;
                }
            }
        }
    }

    checkValid(alert) {
        if (alert) {
            const check_1 = this.checkDuplicatedValue(alert);
            const check_2 = this.checkConstraintWindAlert(alert);
            return !check_1 && !check_2;
        }
        return;
    }

    // called of setting new alert, cancel event
    cancelSetting() {
        if (this.isCreating) {
            if (this.componentRefCurrent !== undefined) {
                this.componentRefCurrent.destroy();
            }
            this.lengthOfAlerts = --this.lengthOfAlerts;
        } else {
            this.returnViewState();
        }
        this.alertCurrent = undefined;
        this.isCreating = false;
        this.isSettingAlert = false;
        this.disableEnableButton(this.enable, this.componentRefs);
        this.disableValidator(this.componentRefCurrent);
    }

    // return original view if editing is not deployed
    returnViewState() {
        this.enableMessageValidate();
        this.disableEmitData = false;
        this.componentRefCurrent.instance.isSetting = false;
        this.componentRefCurrent.instance.rePathValueToForm.emit(this.preAlert);
    }

    // this function show that if setting is, icon delete and edit will be enable or otherwise
    disableEnableButton(action: string, componentRefs: any) {
        for (let i = 0; i < componentRefs.length; ++i) {
            if (action === this.disable) {
                componentRefs[i].instance.disableButton = true;
            } else {
                componentRefs[i].instance.disableButton = false;
            }
        }
    }

    // get available alertCode, it's used in selecting list alertCode
    availableAlertCode() {
        this.alerts.forEach(item => {
            this.alertCodes = this.alertCodes.filter(code => code.code !== item.alertCode);
        });
        this.alertCodes = this.sortAlertCodes(this.alertCodes);
        return this.alertCodes;
    }

    // add alertCode of alertCode's removed alert to alertCodes
    addAlertCode(alertCode) {
        const code = CommonConstant.ALERT_CODES.find(item => item.code === alertCode);
        this.alertCodes.push(code);
    }

    // sort alertCodes to improve UX
    sortAlertCodes(alertCodes: any[]) {
        const length = alertCodes.length;
        for (let i = 0; i < length - 1; ++i) {
            for (let j = i + 1; j < length; ++j) {
                if (alertCodes[i].no > alertCodes[j].no) {
                    const temp = alertCodes[i];
                    alertCodes[i] = alertCodes[j];
                    alertCodes[j] = temp;
                }
            }
        }
        return alertCodes;
    }

    checkDuplicatedValue(alert: ALERT) {
        const alertRef = this.alerts.find(item => item.alertCode !== alert.alertCode && item.value === alert.value);
        if (alertRef) {
            this.componentRefCurrent.instance.checkDuplicateValue = true;
            return true;
        }
        this.componentRefCurrent.instance.checkDuplicateValue = false;
        return false;
    }

    disableValidator(componentRef: any) {
        componentRef.instance.constraintCondition = false;
        componentRef.instance.constraintValue = false;
        componentRef.instance.checkDuplicateValue = false;
        componentRef.instance.isExceedValue = false;
        componentRef.instance.checkOnlySpacing = false;
    }

    // Beginning of functions to check constraint between WindAlertLV1 and WinAlertLV2
    checkConstraintWindAlert(winAlertData2: ALERT) {
        if (this.isWindAlert(winAlertData2) && !isNullOrUndefined(this.getWindAlerts())) {
            const winAlertData1 = this.getWindAlerts().find(item => item.alertCode !== winAlertData2.alertCode);
            if (winAlertData1 && winAlertData1.alertCode === this.alertWinds[0]) {
                return this.isWindAlertInvalid(winAlertData1, winAlertData2);
            } else if (winAlertData1 && winAlertData1.alertCode === this.alertWinds[1]) {
                return this.isWindAlertInvalid(winAlertData2, winAlertData1);
            }
        }
        return false;
    }

    isWindAlert(alert: ALERT) {
        for (let i = 0; i < this.alertWinds.length; ++i) {
            if (alert.alertCode === this.alertWinds[i]) {
                return true;
            }
        }
        return false;
    }

    isWindAlertInvalid(windAlert1, windAlert2) {
        const checkValue = this.isValueInvalid(windAlert1.value, windAlert2.value);
        const checkCondition = this.isConditionInvalid(windAlert1.condition, windAlert2.condition);
        if (checkValue || checkCondition ) {
            return true;
        }
        return false;
    }

    isConditionInvalid(condition_1, condition_2) {
        if ((condition_1 === this.condition.greater && condition_2 === this.condition.less)) {
            this.componentRefCurrent.instance.constraintCondition = true;
            return true;
        }
        this.componentRefCurrent.instance.constraintCondition = false;
        return false;
    }

    isValueInvalid(value_1, value_2) {
        if (value_1 >= value_2) {
            this.componentRefCurrent.instance.constraintValue = true;
            return true;
        }
        this.componentRefCurrent.instance.constraintValue = false;
        return false;
    }

    getWindAlerts() {
        const alertWin = this.alerts.filter(item => item.alertCode === this.alertCodeWindLV1 || item.alertCode === this.alertCodeWindLV2);
        if (alertWin.length !== 0) {
            return alertWin;
        }
        return null;
    }
    // END...
}
