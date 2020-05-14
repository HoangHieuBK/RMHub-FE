import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as TrafficLoggerStore from './store';

import * as TrafficLoggerDevicesActions from './store/actions/traffic-logger-devices.actions';
import * as TrafficLoggerCallApiSyncActions from './store/actions/traffic-logger-call-api-sync.actions';
import * as TrafficLoggerSyncActions from './store/actions/traffic-logger-sync.actions';
import * as TrafficLoggerDevicesDetailActions from './store/actions/traffic-logger-device-detail.actions';
import * as TrafficLoggerDevicesDeleteActions from './store/actions/traffic-logger-device-delete.actions';
import * as EditGPSCoordinateActions from './store/actions/traffic-logger-device-editGPS.actions';

import * as TrafficAlertListActions from './store/actions/traffic-logger-alert-list.actions';
import * as TrafficAlertCreateActions from './store/actions/traffic-logger-alert-create-actions';
import * as TrafficAlertEditActions from './store/actions/traffic-logger-alert-edit.actions';
import * as TrafficAlertDeleteActions from './store/actions/traffic-logger-alert-delete.actions';




@Injectable()
export class TrafficLoggerDevicesSandbox extends Sandbox {
    constructor(
        protected appState$: Store<store.State>,
        private TrafficLoggerDevicesState$: Store<TrafficLoggerStore.TrafficLoggerDevicesState>,
        private TrafficLoggerCallApiSyncState$: Store<TrafficLoggerStore.TrafficLoggerCallApiSyncState>,
        private TrafficLoggerSyncState$: Store<TrafficLoggerStore.TrafficLoggerSyncState>,
        private TrafficLoggerDevicesDetailState$: Store<TrafficLoggerStore.TrafficLoggerDevicesDetailState>,
        private TrafficLoggerDevicesDeleteState$: Store<TrafficLoggerStore.TrafficLoggerDevicesDeleteState>,
        private EditGPSCoordinateState$: Store<TrafficLoggerStore.EditGpsCoordinateState>,

        private TrafficAlertListState$: Store<TrafficLoggerStore.TrafficAlertListState>,
        private TrafficAlertCreateState$: Store<TrafficLoggerStore.TrafficAlertCreateState>,
        private TrafficAlertEditState$: Store<TrafficLoggerStore.TrafficAlertEditState>,
        private TrafficAlertDeleteState$: Store<TrafficLoggerStore.TrafficAlertDeleteState>

    ) {
        super(appState$);
    }

    public TrafficLoggerDevicesData$ = this.TrafficLoggerDevicesState$.pipe(select(TrafficLoggerStore.LoadTrafficLoggerDevicesData));
    public TrafficLoggerCallApiSyncData$ = this.TrafficLoggerCallApiSyncState$.pipe(select(TrafficLoggerStore.LoadTrafficLoggerCallApiSyncsData));
    public TrafficLoggerSyncData$ = this.TrafficLoggerSyncState$.pipe(select(TrafficLoggerStore.LoadTrafficLoggerSyncsData));
    public TrafficLoggerDevicesDetailData$ = this.TrafficLoggerDevicesDetailState$.pipe(select(TrafficLoggerStore.LoadTrafficLoggerDevicesDetailData));
    public TrafficLoggerDevicesDeleteData$ = this.TrafficLoggerDevicesDeleteState$.pipe(select(TrafficLoggerStore.LoadTrafficLoggerDevicesDeleteData));
    public EditGPSCoordinateData$ = this.EditGPSCoordinateState$.pipe(select(TrafficLoggerStore.EditGpsCoordinateData));

    public TrafficAlertListData$ = this.TrafficAlertListState$.pipe(select(TrafficLoggerStore.LoadTrafficAlertListData));
    public TrafficAlertCreateData$ = this.TrafficAlertCreateState$.pipe(select(TrafficLoggerStore.LoadTrafficAlertCreateData));
    public TrafficAlertEditData$ = this.TrafficAlertEditState$.pipe(select(TrafficLoggerStore.LoadTrafficAlertEditData));
    public TrafficAlertDeleteData$ = this.TrafficAlertDeleteState$.pipe(select(TrafficLoggerStore.LoadTrafficAlertDeleteData));



    public loadTrafficLoggerDevicesFunc(param?: any): void {
        this.TrafficLoggerDevicesState$.dispatch(new TrafficLoggerDevicesActions.LoadTrafficLoggerDevicesAction(param));
    }
    public loadTrafficLoggerCallApiSyncFunc(param?: any): void {
        this.TrafficLoggerCallApiSyncState$.dispatch(new TrafficLoggerCallApiSyncActions.LoadTrafficLoggerCallApiSyncAction(param));
    }
    public loadTrafficLoggerSyncFunc(param?: any): void {
        this.TrafficLoggerSyncState$.dispatch(new TrafficLoggerSyncActions.LoadTrafficLoggerSyncAction(param));
    }
    public loadTrafficLoggerDevicesDetailFunc(params?: any): void {
        this.TrafficLoggerDevicesDetailState$.dispatch(new TrafficLoggerDevicesDetailActions.LoadTrafficLoggerDevicesDetailAction(params));
    }
    public loadTrafficLoggerDevicesDeleteFunc(params?: any): void {
        this.TrafficLoggerDevicesDeleteState$.dispatch(new TrafficLoggerDevicesDeleteActions.LoadTrafficLoggerDevicesDeleteAction(params));
    }
    public editGPSCoordinateFunc(params?: any): void {
        this.EditGPSCoordinateState$.dispatch(new EditGPSCoordinateActions.EditGPSCoordinateAction.EditAction(params));
    }

    public loadTrafficAlertListFunc(param?: any): void {
        this.TrafficAlertListState$.dispatch(new TrafficAlertListActions.LoadTrafficAlertListAction(param));
    }
    public loadTrafficAlertCreateFunc(param?: any): void {
        this.TrafficAlertCreateState$.dispatch(new TrafficAlertCreateActions.LoadTrafficAlertCreateAction(param));
    }
    public loadTrafficAlertEditFunc(param?: any): void {
        this.TrafficAlertEditState$.dispatch(new TrafficAlertEditActions.LoadTrafficAlertEditAction(param));
    }
    public loadTrafficAlertDeleteFunc(param?: any): void {
        this.TrafficAlertDeleteState$.dispatch(new TrafficAlertDeleteActions.LoadTrafficAlertDeleteAction(param));
    }

    /*===============================================================================================================================*/
    // reset state sync data
    public resetCallApiSyncDevice(param?: any): void {
        this.TrafficLoggerCallApiSyncState$.dispatch(new TrafficLoggerCallApiSyncActions.TrafficLoggerCallApiResetAction(param));
    }
    // reset state after 30s sync data
    public resetSyncDevice(param?: any): void {
        this.TrafficLoggerSyncState$.dispatch(new TrafficLoggerSyncActions.TrafficLoggerResetSyncAction(param));
    }
    // reset state after delete device
    public resetDeleteDevice(): void {
        this.TrafficLoggerDevicesDeleteState$.dispatch(new TrafficLoggerDevicesDeleteActions.ResetDeleteDeviceAction());
    }
    // reset state after edit GPS device
    public resetEditGPS(): void {
        this.EditGPSCoordinateState$.dispatch(new EditGPSCoordinateActions.ResetEditGPSAction());
    }
    // reset state after create alert
    public resetCreateAlert(): void {
        this.TrafficAlertCreateState$.dispatch(new TrafficAlertCreateActions.ResetCreateAlertAction());
    }
    // reset state after delet alert
    public resetDeleteAlert(): void {
        this.TrafficAlertDeleteState$.dispatch(new TrafficAlertDeleteActions.ResetDeleteAlertAction());
    }
    // reset state after edit alert
    public resetEditAlert(): void {
        this.TrafficAlertEditState$.dispatch(new TrafficAlertEditActions.ResetEditAlertAction());
    }
    // reset state after get list alert
    public resetListAlert(): void {
        this.TrafficAlertListState$.dispatch(new TrafficAlertListActions.ResetListAlertAction());
    }
    // reset state after get detail device
    public resetDetailDevice(): void {
        this.TrafficLoggerDevicesDetailState$.dispatch(new TrafficLoggerDevicesDetailActions.ResetDetailDeviceAction());
    }
    // reset state after get list device
    public resetListDevice(): void {
        this.TrafficLoggerDevicesState$.dispatch(new TrafficLoggerDevicesActions.ResetListDeviceAction());
    }
}


