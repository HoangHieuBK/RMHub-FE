import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWSDeice from './reducers/weather-station-devices.reducers';
import * as fromWSAlert from './reducers/weather-station-alert.reducer';

export interface WSState {
    WSDevice: fromWSDeice.State;
    WSAlert: fromWSAlert.State;
}

export const reducers: ActionReducerMap<WSState> = {
    WSDevice: fromWSDeice.reducer,
    WSAlert: fromWSAlert.reducer
};

export const getState = createFeatureSelector<WSState>(
    'weather-station',
);

// =========================================================================
// ....export ws device
export const getWS_State = createSelector(
    getState,
    (state: WSState) => state.WSDevice
);
// ....export ws device
export const getWSAlert_State = createSelector(
    getState,
    (state: WSState) => state.WSAlert
);
// =========================================================================

// get ws devices from RMHub database
export const getWeatherData = createSelector(
    getWS_State,
    fromWSDeice.getWSDeviceDatas.getDatas
);
// get ws devices from mivisu
export const getWSDeviceMivisuData = createSelector(
    getWS_State,
    fromWSDeice.getWSDeviceMivisuDatas.getWSDeviceMivisu
);
// get ws devices from Socket
export const getWSDeviceSocketData = createSelector(
    getWS_State,
    fromWSDeice.getWSDeviceSocketDatas.getWSDeviceSocket
);
// get detail an ws device
export const detailWSDeviceData = createSelector(
    getWS_State,
    fromWSDeice.detailWSDeviceDatas.detailWSDevice
);
// delete ws device
export const deleteWSDeviceData = createSelector (
    getWS_State,
    fromWSDeice.deleteWSDeviceData.deleteWS
);

// =========================================================================
// get list of alert
export const getAlertsData = createSelector(
    getWSAlert_State,
    fromWSAlert.getAlertsData.getAlerts,
);
export const addAlertData = createSelector(
    getWSAlert_State,
    fromWSAlert.addAlertData.addAlert,
);
export const editAlertData = createSelector(
    getWSAlert_State,
    fromWSAlert.editAlertData.editAlert,
);
export const deleteAlertData = createSelector(
    getWSAlert_State,
    fromWSAlert.deleteAlertData.deleteAlert,
);
