import { ProcessState } from '@shared/AppAction';
import { TrafficLoggerDevicesDeleteActions, TrafficLoggerDevicesDeleteTypes, ResetDeleteDeviceTypes } from '../actions/traffic-logger-device-delete.actions';


export interface State extends ProcessState {
    TrafficLoggerDevicesDelete: any;
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficLoggerDevicesDelete: null
};

export function reducer(state = initialState, action: TrafficLoggerDevicesDeleteActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficLoggerDevicesDeleteTypes.TrafficLoggerDevicesDeleteAction:
            return state;

        case TrafficLoggerDevicesDeleteTypes.LoadTrafficLoggerDevicesDeleteTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficLoggerDevicesDelete: null
            });
        }
        case TrafficLoggerDevicesDeleteTypes.LoadTrafficLoggerDevicesDeleteTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficLoggerDevicesDelete: action.payload
            });
        }
        case TrafficLoggerDevicesDeleteTypes.LoadTrafficLoggerDevicesDeleteTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficLoggerDevicesDelete: action.payload
            });
        }
        case ResetDeleteDeviceTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficLoggerDevicesDeleteLoading = (state: State) => state.loading;
export const LoadTrafficLoggerDevicesDeleteLoaded = (state: State) => state.loaded;
export const LoadTrafficLoggerDevicesDeleteFailed = (state: State) => state.failed;
export const LoadTrafficLoggerDevicesDelete = (state: State) => state.TrafficLoggerDevicesDelete;
