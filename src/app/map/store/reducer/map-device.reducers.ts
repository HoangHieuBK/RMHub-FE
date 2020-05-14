import { AppEntityCustomState } from '@shared/AppAction';
import { MapActions, MapDeviceTypes } from '../actions/map-device.actions';


interface DeviceDataState extends AppEntityCustomState<any, any> { }
interface TrafficAlertDeviceState extends AppEntityCustomState<any, any> { }
interface SetLocationDataState extends AppEntityCustomState<any, any> { }
interface SearchDeviceDataState extends AppEntityCustomState<any, any> { }
interface RefreshDeviceDataState extends AppEntityCustomState<any, any> { }
interface MapCatDataState extends AppEntityCustomState<any, any> { }
interface WeatherAlertDeviceState extends AppEntityCustomState<any, any> { }
interface DeviceTechnicalState extends AppEntityCustomState<any, any> { }
export interface State {
    DeviceDataState: DeviceDataState;
    SetLocationDataState: SetLocationDataState;
    SearchDeviceDataState: SearchDeviceDataState;
    TrafficAlertDeviceState: TrafficAlertDeviceState;
    RefreshDeviceDataState: RefreshDeviceDataState;
    MapCatDataState: MapCatDataState;
    WeatherAlertDeviceState: WeatherAlertDeviceState;
    DeviceTechnicalState: DeviceTechnicalState;
}

export const initialState: State = {
    DeviceDataState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    },
    TrafficAlertDeviceState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    },
    SetLocationDataState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    },
    SearchDeviceDataState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    },
    RefreshDeviceDataState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    },
    MapCatDataState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    },
    WeatherAlertDeviceState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    },
    DeviceTechnicalState: {
        loading: false,
        loaded: false,
        failed: false,
        data: null,
    }

};

export function reducer(state = initialState, action: MapActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case MapDeviceTypes.MapDeviceAction:
            return state;
        case MapDeviceTypes.MapDataDeviceTypes.LOAD:
            return Object.assign({}, state, {
                DeviceDataState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: null
                }
            });
        case MapDeviceTypes.MapDataDeviceTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                DeviceDataState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapDataDeviceTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                DeviceDataState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapTrafficAlertDeviceTypes.LOAD:
            return Object.assign({}, state, {
                TrafficAlertDeviceState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapTrafficAlertDeviceTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                TrafficAlertDeviceState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapTrafficAlertDeviceTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                TrafficAlertDeviceState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        // Set location state
        case MapDeviceTypes.SetLocationTypes.SET:
            return Object.assign({}, state, {
                SetLocationDataState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: null
                }
            });
        case MapDeviceTypes.SetLocationTypes.SET_SUCCESS:
            return Object.assign({}, state, {
                SetLocationDataState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.SetLocationTypes.SET_FAIL:
            return Object.assign({}, state, {
                SetLocationDataState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        // Set location state
        case MapDeviceTypes.SearchDeviceTypes.SEARCH:
            return Object.assign({}, state, {
                SearchDeviceDataState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: null
                }
            });
        case MapDeviceTypes.SearchDeviceTypes.SEARCH_SUCCESS:
            return Object.assign({}, state, {
                SearchDeviceDataState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.SearchDeviceTypes.SEARCH_FAIL:
            return Object.assign({}, state, {
                SearchDeviceDataState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapReset.RESET:
            return Object.assign({}, initialState, {
                TrafficAlertDeviceState: {
                    loading: false,
                    loaded: false,
                    failed: false,
                    data: state.TrafficAlertDeviceState.data
                }
            });
        case MapDeviceTypes.MapRefreshDataDeviceTypes.LOAD:
            return Object.assign({}, state, {
                RefreshDeviceDataState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: null
                }
            });
        case MapDeviceTypes.MapRefreshDataDeviceTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                RefreshDeviceDataState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapRefreshDataDeviceTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                RefreshDeviceDataState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapCatDataTypes.LOAD:
            return Object.assign({}, state, {
                MapCatDataState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: null
                }
            });
        case MapDeviceTypes.MapCatDataTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                MapCatDataState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapCatDataTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                MapCatDataState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapWeatherAlertDeviceTypes.LOAD:
            return Object.assign({}, state, {
                WeatherAlertDeviceState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapWeatherAlertDeviceTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                WeatherAlertDeviceState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapWeatherAlertDeviceTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                WeatherAlertDeviceState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapDeviceTechnicalTypes.LOAD:
            return Object.assign({}, state, {
                DeviceTechnicalState: {
                    loading: true,
                    loaded: false,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapDeviceTechnicalTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                DeviceTechnicalState: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    data: action.payload
                }
            });
        case MapDeviceTypes.MapDeviceTechnicalTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                DeviceTechnicalState: {
                    loading: false,
                    loaded: false,
                    failed: true,
                    data: action.payload
                }
            });
        case MapDeviceTypes.ResetAllState.RESET: {
            return initialState;
        }
        default:
            return state;
    }
}

export const MapDeviceData = {
    getData: (state: State) => {
        return state.DeviceDataState.data;
    }
};
export const MapTrafficAlertDeviceData = {
    getData: (state: State) => {
        return state.TrafficAlertDeviceState.data;
    }
};
export const SetLocationData = {
    setLocationData: (state: State) => {
        return state.SetLocationDataState.data;
    }
};
export const SearchDeviceData = {
    setDVsData: (state: State) => {
        return state.SearchDeviceDataState.data;
    }
};
export const MapRefreshDeviceData = {
    getData: (state: State) => {
        return state.RefreshDeviceDataState.data;
    }
};
export const MapCatData = {
    getData: (state: State) => {
        return state.MapCatDataState.data;
    }
};
export const MapWeatherAlertDeviceData = {
    getData: (state: State) => {
        return state.WeatherAlertDeviceState.data;
    }
};
export const MapDeviceTechnicalData = {
    getData: (state: State) => {
        return state.DeviceTechnicalState.data;
    }
};
