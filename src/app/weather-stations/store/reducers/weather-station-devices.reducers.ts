import { AppEntityCustomState } from '@shared/AppAction';
import { WeatherActions, WSDeviceActionTypes } from '../actions/weather-station-deivces.actions';

interface WeatherDataState extends AppEntityCustomState<any, any> { }
interface WSDeviceMivisuDataState extends AppEntityCustomState<any, any> { }
interface WSDeviceSocketDataState extends AppEntityCustomState<any, any> { }
interface DetailWSDeviceDataState extends AppEntityCustomState<any, any> { }
interface DeleteWSDeviceDataState extends AppEntityCustomState<any, any> { }

export interface State {
    WeatherDataState: WeatherDataState;
    WSDeviceMivisuDataState: WSDeviceMivisuDataState;
    WSDeviceSocketDataState: WSDeviceSocketDataState;
    DetailWSDeviceDataState: DetailWSDeviceDataState;
    DeleteWSDeviceDataState: DeleteWSDeviceDataState;
}
// ======================================================================================
export const initialState: State = {
    WeatherDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null,
    },
    WSDeviceMivisuDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null
    },
    WSDeviceSocketDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null
    },
    DetailWSDeviceDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null
    },
    DeleteWSDeviceDataState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null
    },
};
// ======================================================================================
export function reducer(state = initialState, action: WeatherActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case WSDeviceActionTypes.WSAction:
            return state;
        // Load Weather station devices from RMHub database
        case WSDeviceActionTypes.GetWSDeviceDataTypes.LOAD: {
            return Object.assign({}, state, {
                WeatherDataState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSDeviceActionTypes.GetWSDeviceDataTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                WeatherDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSDeviceActionTypes.GetWSDeviceDataTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                WeatherDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                }
            });
        }
        // Load Weather station devices from mivisu
        case WSDeviceActionTypes.GetWSDeviceMivisuDataTypes.LOAD: {
            return Object.assign({}, state, {
                WSDeviceMivisuDataState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSDeviceActionTypes.GetWSDeviceMivisuDataTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                WSDeviceMivisuDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSDeviceActionTypes.GetWSDeviceMivisuDataTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                WSDeviceMivisuDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                }
            });
        }
        // Load Weather station devices from Socket
        case WSDeviceActionTypes.GetWSDeviceSocketDataTypes.LOAD: {
            return Object.assign({}, state, {
                WSDeviceSocketDataState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSDeviceActionTypes.GetWSDeviceSocketDataTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                WSDeviceSocketDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSDeviceActionTypes.GetWSDeviceSocketDataTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                WSDeviceSocketDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                }
            });
        }
        // Get detail an ws device
        case WSDeviceActionTypes.DetailWSDeviceDataTypes.GET: {
            return Object.assign({}, state, {
                DetailWSDeviceDataState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSDeviceActionTypes.DetailWSDeviceDataTypes.GET_SUCCESS: {
            return Object.assign({}, state, {
                DetailWSDeviceDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSDeviceActionTypes.DetailWSDeviceDataTypes.GET_FAIL: {
            return Object.assign({}, state, {
                DetailWSDeviceDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                }
            });
        }
        // delete a ws device
        case WSDeviceActionTypes.DeleteWSDeviceDataTypes.DELETE: {
            return Object.assign({}, state, {
                DeleteWSDeviceDataState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSDeviceActionTypes.DeleteWSDeviceDataTypes.DELETE_SUCCESS: {
            return Object.assign({}, state, {
                DeleteWSDeviceDataState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSDeviceActionTypes.DeleteWSDeviceDataTypes.DELETE_FAIL: {
            return Object.assign({}, state, {
                DeleteWSDeviceDataState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload,
                }
            });
        }
        // Reset State
        case WSDeviceActionTypes.WSDeviceStateTypes.RESET_STATE: {
            return initialState;
        }
        default:
            return state;
    }
}
// ======================================================================================
export const getWSDeviceDatas = {
    getDatas: (state: State) => state.WeatherDataState.data,
};
export const getWSDeviceMivisuDatas = {
    getWSDeviceMivisu: (state: State) => state.WSDeviceMivisuDataState.data
};
export const getWSDeviceSocketDatas = {
    getWSDeviceSocket: (state: State) => state.WSDeviceSocketDataState.data
};
export const detailWSDeviceDatas = {
    detailWSDevice: (state: State) => state.DetailWSDeviceDataState.data,
};
export const deleteWSDeviceData = {
    deleteWS: (state: State) => state.DeleteWSDeviceDataState.data
};
