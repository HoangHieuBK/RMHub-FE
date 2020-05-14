import { ProcessState } from '@shared/AppAction';
import { TrafficLoggerDevicesActions, TrafficLoggerDevicesTypes, ResetListDeviceTypes } from '../actions/traffic-logger-devices.actions';


export interface State extends ProcessState {
    TrafficLoggerDevices: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficLoggerDevices: []
};

export function reducer(state = initialState, action: TrafficLoggerDevicesActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficLoggerDevicesTypes.TrafficLoggerDevicesAction:
            return state;

        case TrafficLoggerDevicesTypes.LoadTrafficLoggerDevicesTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficLoggerDevices: []
            });
        }
        case TrafficLoggerDevicesTypes.LoadTrafficLoggerDevicesTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficLoggerDevices: action.payload
            });
        }
        case TrafficLoggerDevicesTypes.LoadTrafficLoggerDevicesTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficLoggerDevices: action.payload
            });
        }
        case ResetListDeviceTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficLoggerDevicesLoading = (state: State) => state.loading;
export const LoadTrafficLoggerDevicesLoaded = (state: State) => state.loaded;
export const LoadTrafficLoggerDevicesFailed = (state: State) => state.failed;
export const LoadTrafficLoggerDevices = (state: State) => state.TrafficLoggerDevices;
