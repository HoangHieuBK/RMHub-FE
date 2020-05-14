import { ProcessState } from '@shared/AppAction';
import { TrafficAlertCreateActions, TrafficAlertCreateTypes, ResetCreateAlertTypes } from '../actions/traffic-logger-alert-create-actions';


export interface State extends ProcessState {
    TrafficAlertCreate: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficAlertCreate: null
};

export function reducer(state = initialState, action: TrafficAlertCreateActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficAlertCreateTypes.TrafficAlertCreateAction:
            return state;

        case TrafficAlertCreateTypes.LoadTrafficAlertCreateTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficAlertCreate: null
            });
        }
        case TrafficAlertCreateTypes.LoadTrafficAlertCreateTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficAlertCreate: action.payload
            });
        }
        case TrafficAlertCreateTypes.LoadTrafficAlertCreateTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficAlertCreate: action.payload
            });
        }
        case ResetCreateAlertTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficAlertCreateLoading = (state: State) => state.loading;
export const LoadTrafficAlertCreateLoaded = (state: State) => state.loaded;
export const LoadTrafficAlertCreateFailed = (state: State) => state.failed;
export const LoadTrafficAlertCreate = (state: State) => state.TrafficAlertCreate;
