import * as TrafficLoggerListReducers from './reducers/traffic-logger-list.reducers';
import * as TrafficLoggerDetailReducers from './reducers/traffic-logger-device-detail.reducers';
import * as TrafficLoggerDeleteReducers from './reducers/traffic-logger-devices-delete.reducers';
import * as TrafficAlertListReducers from './reducers/traffic-logger-alert-list.reducers';
import * as TrafficAlertCreateReducers from './reducers/traffic-logger-alert-create-reducers';
import * as TrafficAlertEditReducers from './reducers/traffic-logger-alert-edit.reducers';
import * as TrafficAlertDeleteReducers from './reducers/traffic-logger-alert-delete.reducers';
import * as TrafficLoggerSyncReducers from './reducers/traffic-logger-sync.reducers';
import * as TrafficLoggerCallApiSyncReducers from './reducers/traffic-logger-api-sync.reducers';
import * as EditGpsCoordinateReducers from './reducers/traffic-logger-device-editGps.reducers';


import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


/*================================================================================================================================*/
// store for list devices
export interface TrafficLoggerDevicesState {
    TrafficLoggerList: TrafficLoggerListReducers.State;
}

export const TrafficLoggerReducers: ActionReducerMap<TrafficLoggerDevicesState> = {
    TrafficLoggerList: TrafficLoggerListReducers.reducer
};

export const getTrafficLoggerDeviceState = createFeatureSelector<TrafficLoggerDevicesState>(
    'TrafficLoggerList'
);

export const selectTrafficLoggerDeviceState = createSelector(
    getTrafficLoggerDeviceState,
    (state: TrafficLoggerDevicesState) => state.TrafficLoggerList
);

export const LoadTrafficLoggerDevicesLoaded = createSelector(
    selectTrafficLoggerDeviceState,
    TrafficLoggerListReducers.LoadTrafficLoggerDevicesLoaded
);
export const LoadTrafficLoggerDevicesLoading = createSelector(
    selectTrafficLoggerDeviceState,
    TrafficLoggerListReducers.LoadTrafficLoggerDevicesLoading
);
export const LoadTrafficLoggerDevicesFailed = createSelector(
    selectTrafficLoggerDeviceState,
    TrafficLoggerListReducers.LoadTrafficLoggerDevicesFailed
);
export const LoadTrafficLoggerDevicesData = createSelector(
    selectTrafficLoggerDeviceState,
    TrafficLoggerListReducers.LoadTrafficLoggerDevices
);


/*================================================================================================================================*/

// store for call api sync devices
export interface TrafficLoggerCallApiSyncState {
    TrafficLoggerCallApiSync: TrafficLoggerCallApiSyncReducers.State;
}

export const TrafficLoggerCallApiSyncReducer: ActionReducerMap<TrafficLoggerCallApiSyncState> = {
    TrafficLoggerCallApiSync: TrafficLoggerCallApiSyncReducers.reducer
};

export const getTrafficLoggerCallApiSyncState = createFeatureSelector<TrafficLoggerCallApiSyncState>(
    'TrafficLoggerCallApiSync'
);

export const selectTrafficLoggerCallApiSyncState = createSelector(
    getTrafficLoggerCallApiSyncState,
    (state: TrafficLoggerCallApiSyncState) => state.TrafficLoggerCallApiSync
);

export const LoadTrafficLoggerCallApiSyncsLoaded = createSelector(
    selectTrafficLoggerCallApiSyncState,
    TrafficLoggerCallApiSyncReducers.LoadTrafficLoggerCallApiSyncsLoaded
);
export const LoadTrafficLoggerCallApiSyncsLoading = createSelector(
    selectTrafficLoggerCallApiSyncState,
    TrafficLoggerCallApiSyncReducers.LoadTrafficLoggerCallApiSyncsLoading
);
export const LoadTrafficLoggerCallApiSyncsFailed = createSelector(
    selectTrafficLoggerCallApiSyncState,
    TrafficLoggerCallApiSyncReducers.LoadTrafficLoggerCallApiSyncsFailed
);
export const LoadTrafficLoggerCallApiSyncsData = createSelector(
    selectTrafficLoggerCallApiSyncState,
    TrafficLoggerCallApiSyncReducers.LoadTrafficLoggerCallApiSyncs
);

/*================================================================================================================================*/

// store for sync devices
export interface TrafficLoggerSyncState {
    TrafficLoggerSync: TrafficLoggerSyncReducers.State;
}

export const TrafficLoggerSyncReducer: ActionReducerMap<TrafficLoggerSyncState> = {
    TrafficLoggerSync: TrafficLoggerSyncReducers.reducer
};

export const getTrafficLoggerSyncState = createFeatureSelector<TrafficLoggerSyncState>(
    'TrafficLoggerSync'
);

export const selectTrafficLoggerSyncState = createSelector(
    getTrafficLoggerSyncState,
    (state: TrafficLoggerSyncState) => state.TrafficLoggerSync
);

export const LoadTrafficLoggerSyncsLoaded = createSelector(
    selectTrafficLoggerSyncState,
    TrafficLoggerSyncReducers.LoadTrafficLoggerSyncsLoaded
);
export const LoadTrafficLoggerSyncsLoading = createSelector(
    selectTrafficLoggerSyncState,
    TrafficLoggerSyncReducers.LoadTrafficLoggerSyncsLoading
);
export const LoadTrafficLoggerSyncsFailed = createSelector(
    selectTrafficLoggerSyncState,
    TrafficLoggerSyncReducers.LoadTrafficLoggerSyncsFailed
);
export const LoadTrafficLoggerSyncsData = createSelector(
    selectTrafficLoggerSyncState,
    TrafficLoggerSyncReducers.LoadTrafficLoggerSyncs
);


/*================================================================================================================================*/

// store for detail device
export interface TrafficLoggerDevicesDetailState {
    TrafficLoggerDetail: TrafficLoggerDetailReducers.State;
}

export const TrafficLoggerDeviceDetailReducers: ActionReducerMap<TrafficLoggerDevicesDetailState> = {
    TrafficLoggerDetail: TrafficLoggerDetailReducers.reducer
};

export const getTrafficLoggerDeviceDetailState = createFeatureSelector<TrafficLoggerDevicesDetailState>(
    'TrafficLoggerDetail'
);

export const selectTrafficLoggerDeviceDetailState = createSelector(
    getTrafficLoggerDeviceDetailState,
    (state: TrafficLoggerDevicesDetailState) => state.TrafficLoggerDetail
);

export const LoadTrafficLoggerDevicesDetailLoaded = createSelector(
    selectTrafficLoggerDeviceDetailState,
    TrafficLoggerDetailReducers.LoadTrafficLoggerDevicesDetailLoaded
);
export const LoadTrafficLoggerDevicesDetailLoading = createSelector(
    selectTrafficLoggerDeviceDetailState,
    TrafficLoggerDetailReducers.LoadTrafficLoggerDevicesDetailLoading
);
export const LoadTrafficLoggerDevicesDetailFailed = createSelector(
    selectTrafficLoggerDeviceDetailState,
    TrafficLoggerDetailReducers.LoadTrafficLoggerDevicesDetailFailed
);
export const LoadTrafficLoggerDevicesDetailData = createSelector(
    selectTrafficLoggerDeviceDetailState,
    TrafficLoggerDetailReducers.LoadTrafficLoggerDevicesDetail
);

/*================================================================================================================================*/

// store for delete device
export interface TrafficLoggerDevicesDeleteState {
    TrafficLoggerDelete: TrafficLoggerDeleteReducers.State;
}

export const TrafficLoggerDeviceDeleteReducers: ActionReducerMap<TrafficLoggerDevicesDeleteState> = {
    TrafficLoggerDelete: TrafficLoggerDeleteReducers.reducer
};

export const getTrafficLoggerDeviceDeleteState = createFeatureSelector<TrafficLoggerDevicesDeleteState>(
    'TrafficLoggerDelete'
);

export const selectTrafficLoggerDeviceDeleteState = createSelector(
    getTrafficLoggerDeviceDeleteState,
    (state: TrafficLoggerDevicesDeleteState) => state.TrafficLoggerDelete
);

export const LoadTrafficLoggerDevicesDeleteLoaded = createSelector(
    selectTrafficLoggerDeviceDeleteState,
    TrafficLoggerDeleteReducers.LoadTrafficLoggerDevicesDeleteLoaded
);
export const LoadTrafficLoggerDevicesDeleteLoading = createSelector(
    selectTrafficLoggerDeviceDeleteState,
    TrafficLoggerDeleteReducers.LoadTrafficLoggerDevicesDeleteLoading
);
export const LoadTrafficLoggerDevicesDeleteFailed = createSelector(
    selectTrafficLoggerDeviceDeleteState,
    TrafficLoggerDeleteReducers.LoadTrafficLoggerDevicesDeleteFailed
);
export const LoadTrafficLoggerDevicesDeleteData = createSelector(
    selectTrafficLoggerDeviceDeleteState,
    TrafficLoggerDeleteReducers.LoadTrafficLoggerDevicesDelete
);

/*================================================================================================================================*/

/*================================================================================================================================*/

// store for editGps device
export interface EditGpsCoordinateState {
    EditGpsCoordinate: EditGpsCoordinateReducers.State;
}

export const EditGpsCoordinateTLReducers: ActionReducerMap<EditGpsCoordinateState> = {
    EditGpsCoordinate: EditGpsCoordinateReducers.reducer
};

export const getEditGpsCoordinateState = createFeatureSelector<EditGpsCoordinateState>(
    'EditGpsCoordinate'
);

export const selectEditGpsCoordinateState = createSelector(
    getEditGpsCoordinateState,
    (state: EditGpsCoordinateState) => state.EditGpsCoordinate
);

export const EditGpsCoordinateLoaded = createSelector(
    selectEditGpsCoordinateState,
    EditGpsCoordinateReducers.EditGPSCoordinateLoaded
);
export const EditGpsCoordinateLoading = createSelector(
    selectEditGpsCoordinateState,
    EditGpsCoordinateReducers.EditGPSCoordinateLoading
);
export const EditGpsCoordinateFailed = createSelector(
    selectEditGpsCoordinateState,
    EditGpsCoordinateReducers.EditGPSCoordinateFailed
);
export const EditGpsCoordinateData = createSelector(
    selectEditGpsCoordinateState,
    EditGpsCoordinateReducers.EditGPSCoordinateData
);

/*================================================================================================================================*/

// store for list alert
export interface TrafficAlertListState {
    TrafficAlertList: TrafficAlertListReducers.State;
}

export const TrafficLoggerAlertListLReducers: ActionReducerMap<TrafficAlertListState> = {
    TrafficAlertList: TrafficAlertListReducers.reducer
};

export const getTrafficAlertListState = createFeatureSelector<TrafficAlertListState>(
    'TrafficAlertList'
);

export const selectTrafficAlertListState = createSelector(
    getTrafficAlertListState,
    (state: TrafficAlertListState) => state.TrafficAlertList
);

export const LoadTrafficAlertListLoaded = createSelector(
    selectTrafficAlertListState,
    TrafficAlertListReducers.LoadTrafficAlertListLoaded
);
export const LoadTrafficAlertListLoading = createSelector(
    selectTrafficAlertListState,
    TrafficAlertListReducers.LoadTrafficAlertListLoading
);
export const LoadTrafficAlertListFailed = createSelector(
    selectTrafficAlertListState,
    TrafficAlertListReducers.LoadTrafficAlertListFailed
);
export const LoadTrafficAlertListData = createSelector(
    selectTrafficAlertListState,
    TrafficAlertListReducers.LoadTrafficAlertList
);

/*================================================================================================================================*/


// store for create alert
export interface TrafficAlertCreateState {
    TrafficAlertCreate: TrafficAlertCreateReducers.State;
}

export const TrafficLoggerAlertCreateLReducers: ActionReducerMap<TrafficAlertCreateState> = {
    TrafficAlertCreate: TrafficAlertCreateReducers.reducer
};

export const getTrafficAlertCreateState = createFeatureSelector<TrafficAlertCreateState>(
    'TrafficAlertCreate'
);

export const selectTrafficAlertCreateState = createSelector(
    getTrafficAlertCreateState,
    (state: TrafficAlertCreateState) => state.TrafficAlertCreate
);

export const LoadTrafficAlertCreateLoaded = createSelector(
    selectTrafficAlertCreateState,
    TrafficAlertCreateReducers.LoadTrafficAlertCreateLoaded
);
export const LoadTrafficAlertCreateLoading = createSelector(
    selectTrafficAlertCreateState,
    TrafficAlertCreateReducers.LoadTrafficAlertCreateLoading
);
export const LoadTrafficAlertCreateFailed = createSelector(
    selectTrafficAlertCreateState,
    TrafficAlertCreateReducers.LoadTrafficAlertCreateFailed
);
export const LoadTrafficAlertCreateData = createSelector(
    selectTrafficAlertCreateState,
    TrafficAlertCreateReducers.LoadTrafficAlertCreate
);

/*================================================================================================================================*/


// store for edit alert
export interface TrafficAlertEditState {
    TrafficAlertEdit: TrafficAlertEditReducers.State;
}

export const TrafficLoggerAlertEditLReducers: ActionReducerMap<TrafficAlertEditState> = {
    TrafficAlertEdit: TrafficAlertEditReducers.reducer
};

export const getTrafficAlertEditState = createFeatureSelector<TrafficAlertEditState>(
    'TrafficAlertEdit'
);

export const selectTrafficAlertEditState = createSelector(
    getTrafficAlertEditState,
    (state: TrafficAlertEditState) => state.TrafficAlertEdit
);

export const LoadTrafficAlertEditLoaded = createSelector(
    selectTrafficAlertEditState,
    TrafficAlertEditReducers.LoadTrafficAlertEditLoaded
);
export const LoadTrafficAlertEditLoading = createSelector(
    selectTrafficAlertEditState,
    TrafficAlertEditReducers.LoadTrafficAlertEditLoading
);
export const LoadTrafficAlertEditFailed = createSelector(
    selectTrafficAlertEditState,
    TrafficAlertEditReducers.LoadTrafficAlertEditFailed
);
export const LoadTrafficAlertEditData = createSelector(
    selectTrafficAlertEditState,
    TrafficAlertEditReducers.LoadTrafficAlertEdit
);

/*================================================================================================================================*/


// store for delete alert
export interface TrafficAlertDeleteState {
    TrafficAlertDelete: TrafficAlertDeleteReducers.State;
}

export const TrafficLoggerAlertDeleteLReducers: ActionReducerMap<TrafficAlertDeleteState> = {
    TrafficAlertDelete: TrafficAlertDeleteReducers.reducer
};

export const getTrafficAlertDeleteState = createFeatureSelector<TrafficAlertDeleteState>(
    'TrafficAlertDelete'
);

export const selectTrafficAlertDeleteState = createSelector(
    getTrafficAlertDeleteState,
    (state: TrafficAlertDeleteState) => state.TrafficAlertDelete
);

export const LoadTrafficAlertDeleteLoaded = createSelector(
    selectTrafficAlertDeleteState,
    TrafficAlertDeleteReducers.LoadTrafficAlertDeleteLoaded
);
export const LoadTrafficAlertDeleteLoading = createSelector(
    selectTrafficAlertDeleteState,
    TrafficAlertDeleteReducers.LoadTrafficAlertDeleteLoading
);
export const LoadTrafficAlertDeleteFailed = createSelector(
    selectTrafficAlertDeleteState,
    TrafficAlertDeleteReducers.LoadTrafficAlertDeleteFailed
);
export const LoadTrafficAlertDeleteData = createSelector(
    selectTrafficAlertDeleteState,
    TrafficAlertDeleteReducers.LoadTrafficAlertDelete
);
