import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {AlertTraffic} from '@app/traffic-logger/models';
import {CommonConstant} from '@shared/common/constant.common';
import {AlertTrafficService} from '@app/traffic-logger/services/traffic-logger-alert.service';
import {TrafficAlertFormComponent} from '@app/traffic-logger/components/traffic-alert-form/traffic-alert-form.component';
import {of, Subscription} from 'rxjs';
import {NotifierService} from 'angular-notifier';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmPopupModel} from '@shared/models/shared/confirm-popup.model';
import {TrafficLoggerDevicesSandbox} from '@app/traffic-logger/traffic-logger.sandbox';
import {isNullOrUndefined} from 'util';
import {isNumber} from '@node_modules/@types/lodash-es';

@Component({
    selector: 'rmhub-traffic-logger-alert-rules',
    templateUrl: './traffic-logger-alert-rules.component.html',
    styleUrls: ['./traffic-logger-alert-rules.component.scss']
})

export class TrafficLoggerAlertRulesComponent implements OnInit, AfterViewInit, OnDestroy {


    alerts: AlertTraffic[] = [];
    preAlert: AlertTraffic;
    alertAddData: any;
    alertEditData: any;
    alertDeleteData: any;
    idAlertEdit: number;
    componentRefCurrent: ComponentRef<any>;
    alertComponentArr: any[] = [];
    popUpModelAddAlert: ConfirmPopupModel;

    isSettingAlert = false;
    isValidForm = true;
    isCreating = false;
    checkOpenAddAlertPopUp = false;
    disableEmitData = false;
    hideMessageGrid = true;

    disable = 'disable';
    enable = 'enable';
    notifySuccess = 'success';
    maxAmountAlert = 3;
    subscriptions = new Subscription();

    @ViewChild('container', {read: ViewContainerRef,}) viewContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private alertSettingService: AlertTrafficService,
        private cd: ChangeDetectorRef,
        private notifier: NotifierService,
        private translate: TranslateService,
        private alertSandbox$: TrafficLoggerDevicesSandbox
    ) {

    }

    ngOnInit() {
        this.dispatchAction();
        this.selectDataFromStore();
        this.initAddAlertPopup();
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.alertSandbox$.resetListAlert();
        this.alertSandbox$.resetCreateAlert();
        this.alertSandbox$.resetEditAlert();
        this.alertSandbox$.resetDeleteAlert();
    }

    dispatchAction() {
        this.alertSandbox$.loadTrafficAlertListFunc();
    }

    selectDataFromStore() {
        /* select list alert from store*/
        this.subscriptions.add(this.alertSandbox$.TrafficAlertListData$.subscribe((response: any) => {
            if (!response) {
                return;
            }
            if (response && response.data) {
                this.hideMessageGrid = false;
                this.alerts = response.data;
                this.alertSettingService.alerts = response.data;
                if (!this.isAlertsEmpty()) {
                    this.loadAllAlertComponent();
                    this.listenEditDataFromAlertForm();
                    this.listenDataDeleteFromAlertForm();
                    this.eventCheckOpenAddAlert();
                }
            }
        }));

        /* select create alert from store*/
        this.subscriptions.add(this.alertSandbox$.TrafficAlertCreateData$.subscribe((response: any) => {
            if (!response) {
                return;
            }
            this.disableEmitData = false;
            if (response && response.data) {
                this.alertAddData = response.data[0];
                this.addAlert();
            }

        }));

        /* select edit alert from store*/
        this.subscriptions.add(this.alertSandbox$.TrafficAlertEditData$.subscribe((response: any) => {
            if (!response) {
                return;
            }
            this.disableEmitData = false;
            if (response.data) {
                this.alertEditData = response.data[0];
                this.editAlert();
            }
        }));

        /* select delete alert from store*/
        this.subscriptions.add(this.alertSandbox$.TrafficAlertDeleteData$.subscribe((response: any) => {
            if (response && response.data) {
                this.deleteAlert();
            }
        }));

    }

    getAlertsFromService() {
        this.alerts = this.alertSettingService.getAlerts();
    }

    eventCheckOpenAddAlert() {
        if (this.alerts && this.alerts.length >= this.maxAmountAlert) {
            this.checkOpenAddAlertPopUp = true;
        } else {
            this.checkOpenAddAlertPopUp = false;
        }

    }

    // check list of alerts if it's empty
    isAlertsEmpty(): boolean {
        this.getAlertsFromService();
        if (this.alerts && this.alerts.length === 0) {
            return true;
        }
        return false;
    }


    // create a new form alert
    createDynamicAlertComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TrafficAlertFormComponent);
        this.componentRefCurrent = this.viewContainerRef.createComponent(componentFactory);
        this.alertComponentArr.push(this.componentRefCurrent);
        return this.componentRefCurrent;
    }

    // data is gotten from DB RMHub is filled in corresponding to alert form
    fillDataToDynamicComponent(i: number) {
        const componentRef = this.createDynamicAlertComponent();
        componentRef.instance.alert = Object.assign({}, this.alerts[i]);
    }

    // load all of list alert and show it on screen
    loadAllAlertComponent() {
        if (this.alerts) {
            for (let i = 0; i < this.alerts.length; ++i) {
                this.fillDataToDynamicComponent(i);
            }
        }

    }

    // this is event click Add new alert and new empty alert form is shown
    createAlertComponent() {
        this.componentRefCurrent = this.createDynamicAlertComponent();
        this.componentRefCurrent.instance.isSetting = true;
        this.componentRefCurrent.instance.buttonShow = true;
        this.componentRefCurrent.instance.alerts = this.alertSettingService.getAlerts();
        this.isSettingAlert = true;
        this.isCreating = true;
        this.disableEnableButton(this.disable, this.alertComponentArr);
    }

    submitData() {
        if (this.isCreating) {
            this.componentRefCurrent.instance.addEventData.subscribe(alert => {
                this.alertAddData = alert;
            });
            this.componentRefCurrent.instance.listenFromParentToChild.emit(CommonConstant.ACTION_SUBMIT_DATA.create);
            if (this.alertAddData && !this.disableEmitData) {
                this.alertSandbox$.loadTrafficAlertCreateFunc(this.alertAddData);
                this.disableEmitData = true;
            }


        } else {
            this.componentRefCurrent.instance.listenFromParentToChild.emit(CommonConstant.ACTION_SUBMIT_DATA.edit);
            if (this.alertEditData && !this.disableEmitData) {
                const bodyAlertEditData = {
                    description: this.alertEditData.description,
                    min: this.alertEditData.min,
                    max: this.alertEditData.max,
                    level: this.alertEditData.level,
                    color: this.alertEditData.color
                };
                this.alertSandbox$.loadTrafficAlertEditFunc({id: this.alertEditData.id, body: bodyAlertEditData});
                this.disableEmitData = true;
            }
        }
    }

    addAlert() {
        if (this.alertAddData) {
            this.componentRefCurrent.instance.rePatchValueFromParentToChild.emit(this.alertAddData);
            this.alertSettingService.createAlert(this.alertAddData);
            this.componentRefCurrent.instance.isSetting = false;
            this.componentRefCurrent.instance.buttonShow = false;
            this.componentRefCurrent.instance.alert = this.alertAddData;
            this.isSettingAlert = false;
            this.isCreating = false;
            this.listenEditDataFromAlertForm();
            this.listenDataDeleteFromAlertForm();
            this.alertAddData = undefined;
            this.translate.get('Notifier.Alert-Setting.add-success').subscribe(data => this.notifier.notify(this.notifySuccess, data));
        }
        this.disableEnableButton(this.enable, this.alertComponentArr);
        this.eventCheckOpenAddAlert();
    }

    editAlert() {
        if (this.alertEditData) {
            this.componentRefCurrent.instance.rePatchValueFromParentToChild.emit(this.alertEditData);
            const componentRef = this.getComponentEditing(this.idAlertEdit);
            componentRef.instance.isSetting = false;
            componentRef.instance.buttonShow = false;
            this.isSettingAlert = false;
            componentRef.instance.alert = this.alertEditData;
            this.alertSettingService.updateAlert(this.alertEditData);
            this.getAlertsFromService();
            this.disableEnableButton(this.enable, this.alertComponentArr);
            this.alertEditData = undefined;
            this.translate.get('Notifier.Alert-Setting.edit-success').subscribe(data => this.notifier.notify(this.notifySuccess, data));

        }
    }

    deleteAlert() {
        if (this.alertDeleteData) {
            this.alertSettingService.deleteAlert(this.alertDeleteData.id);
            this.getAlertsFromService();
            this.eventCheckOpenAddAlert();
            this.alertDeleteData = null;
            this.removeComponent(this.componentRefCurrent);
            this.translate.get('Notifier.Alert-Setting.delete-success').subscribe(data => this.notifier.notify(this.notifySuccess, data));
        }
    }


    listenDataDeleteFromAlertForm() {
        this.alertComponentArr.forEach(item => {
            item.instance.deleteEventData.subscribe(alert => {
                this.alertDeleteData = alert;
                this.alertSandbox$.loadTrafficAlertDeleteFunc(alert.id);
                this.componentRefCurrent = this.getComponentEditing(alert.id);
                item.destroy();
            });
        });
    }


    listenEditDataFromAlertForm() {
        this.alertComponentArr.forEach(item => {
            item.instance.editAlertIdToParentFirsth.subscribe((idAlert) => {
                this.disableEnableButton(this.disable, this.alertComponentArr);
                this.componentRefCurrent = this.getComponentEditing(idAlert);
                this.preAlert = this.alerts.find((object: AlertTraffic) => object.id === idAlert);
                this.idAlertEdit = idAlert;
                this.isSettingAlert = true;
                this.componentRefCurrent.instance.alerts = this.alertSettingService.getAlerts();
                this.componentRefCurrent.instance.editEventData.subscribe((data) => {
                    this.alertEditData = data;
                });
            });
        });

    }

    getComponentEditing(id: number) {
        return this.alertComponentArr[this.alerts.indexOf(this.alerts.find(item => item.id === id))];
    }

    removeComponent(componentCurrent: any) {
        const index = this.alertComponentArr.findIndex(item => item.instance.alert.id === componentCurrent.instance.alert.id);
        if (index > -1) {
            this.alertComponentArr.splice(index, 1);
        }
    }

    // this function show that if setting is, icon delete and edit will be enable or otherwise
    disableEnableButton(action: string, alertComponentArr: any) {
        for (let i = 0; i < alertComponentArr.length; ++i) {
            if (action === this.disable) {
                alertComponentArr[i].instance.disableButton = true;
            } else {
                alertComponentArr[i].instance.disableButton = false;
            }
        }
    }

    // return original view
    resetState() {
        this.disableEmitData = false;
        this.componentRefCurrent.instance.isSetting = false;
        this.componentRefCurrent.instance.checkSpeedOverlap = false;
        this.componentRefCurrent.instance.checkLevelDuplicate = false;
        this.componentRefCurrent.instance.checkMinGreaterMax = false;
        this.componentRefCurrent.instance.rePatchValueFromParentToChild.emit(this.preAlert);
    }

    disableMessageValid() {
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageDescriptionFocusOut)) {
            this.componentRefCurrent.instance.disableMessageDescription = true;
        }
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageMinFocusOut)) {
            this.componentRefCurrent.instance.disableMessageMin = true;
        }
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageMaxFocusOut)) {
            this.componentRefCurrent.instance.disableMessageMax = true;
        }
        if (isNullOrUndefined(this.componentRefCurrent.instance.messageLevelFocusOut)) {
            this.componentRefCurrent.instance.disableMessageLevel = true;
        }
    }

    enableMessageValid() {
        this.componentRefCurrent.instance.disableMessageDescription = false;
        this.componentRefCurrent.instance.disableMessageMin = false;
        this.componentRefCurrent.instance.disableMessageMax = false;
        this.componentRefCurrent.instance.disableMessageLevel = false;
    }

    // called of setting new alert, cancel event
    cancelSetting() {
        if (this.isCreating) {
            if (this.componentRefCurrent) {
                this.removeComponent(this.componentRefCurrent);
                this.componentRefCurrent.destroy();
            }
        } else {
            this.enableMessageValid();
        }
        this.isCreating = false;
        this.isSettingAlert = false;
        this.resetState();
        this.disableEnableButton(this.enable, this.alertComponentArr);
    }


    // Create alert popup
    initAddAlertPopup() {
        this.popUpModelAddAlert = new ConfirmPopupModel({
            type: CommonConstant.TXT_POPUP_ALERT.type,
            title: CommonConstant.TXT_POPUP_ALERT.title,
            id: CommonConstant.TXT_POPUP_ALERT.id,
            content: CommonConstant.TXT_POPUP_ALERT.content,
            textYes: CommonConstant.TXT_POPUP_ALERT.textYes,
            textNo: CommonConstant.TXT_POPUP_ALERT.textNo,
            funcYes: null,
            funcNo: null,
            funcClose: null
        });
    }

}
