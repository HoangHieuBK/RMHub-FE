import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as mapDeviceReducers from './reducer/map-device.reducers';
import { CommonConstant } from '@shared/common/constant.common';

// export state
export interface MapDeviceState {
    mapDevice: mapDeviceReducers.State;
}

// export reducer
export const MapReducers: ActionReducerMap<MapDeviceState> = {
    mapDevice: mapDeviceReducers.reducer
};

export const getMapState = createFeatureSelector<MapDeviceState>(
    CommonConstant.CONSTANT_STORE.mapStore
);

// create state
export const getMap_State = createSelector(
    getMapState,
    (state: MapDeviceState) => state.mapDevice
);

export const mapDeviceData = createSelector(
    getMap_State,
    mapDeviceReducers.MapDeviceData.getData
);
export const mapTrafficAlertDeviceData = createSelector(
    getMap_State,
    mapDeviceReducers.MapTrafficAlertDeviceData.getData
);
// set location for device on maps
export const setLocationData = createSelector(
    getMap_State,
    mapDeviceReducers.SetLocationData.setLocationData
);
// Search devices
export const searchDeviceData = createSelector(
    getMap_State,
    mapDeviceReducers.SearchDeviceData.setDVsData
);
export const mapRefreshDeviceData = createSelector(
    getMap_State,
    mapDeviceReducers.MapRefreshDeviceData.getData
);
export const mapCatData = createSelector(
    getMap_State,
    mapDeviceReducers.MapCatData.getData
);
export const mapWeatherAlertDeviceData = createSelector(
    getMap_State,
    mapDeviceReducers.MapWeatherAlertDeviceData.getData
);
export const mapDeviceTechnicalData = createSelector(
    getMap_State,
    mapDeviceReducers.MapDeviceTechnicalData.getData
);
