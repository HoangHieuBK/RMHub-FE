import { ProcessState } from '@shared/AppAction';
import { TrafficLoggerDevicesDetailActions, TrafficLoggerDevicesDetailTypes, ResetDetailDeviceTypes } from '../actions/traffic-logger-device-detail.actions';


export interface State extends ProcessState {
    TrafficLoggerDevicesDetail: any;
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficLoggerDevicesDetail: null
};

export function reducer(state = initialState, action: TrafficLoggerDevicesDetailActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficLoggerDevicesDetailTypes.TrafficLoggerDevicesDetailAction:
            return state;

        case TrafficLoggerDevicesDetailTypes.LoadTrafficLoggerDevicesDetailTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficLoggerDevicesDetail: null
            });
        }
        case TrafficLoggerDevicesDetailTypes.LoadTrafficLoggerDevicesDetailTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficLoggerDevicesDetail: action.payload
            });
        }
        case TrafficLoggerDevicesDetailTypes.LoadTrafficLoggerDevicesDetailTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficLoggerDevicesDetail: action.payload
            });
        }
        case ResetDetailDeviceTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficLoggerDevicesDetailLoading = (state: State) => state.loading;
export const LoadTrafficLoggerDevicesDetailLoaded = (state: State) => state.loaded;
export const LoadTrafficLoggerDevicesDetailFailed = (state: State) => state.failed;
export const LoadTrafficLoggerDevicesDetail = (state: State) => state.TrafficLoggerDevicesDetail;
