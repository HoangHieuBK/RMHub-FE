import { ProcessState } from '@shared/AppAction';
import { TrafficAlertEditActions, TrafficAlertEditTypes, ResetEditAlertTypes } from '../actions/traffic-logger-alert-edit.actions';


export interface State extends ProcessState {
    TrafficAlertEdit: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficAlertEdit: null
};

export function reducer(state = initialState, action: TrafficAlertEditActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficAlertEditTypes.TrafficAlertEditAction:
            return state;

        case TrafficAlertEditTypes.LoadTrafficAlertEditTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficAlertEdit: null
            });
        }
        case TrafficAlertEditTypes.LoadTrafficAlertEditTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficAlertEdit: action.payload
            });
        }
        case TrafficAlertEditTypes.LoadTrafficAlertEditTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficAlertEdit: action.payload
            });
        }
        case ResetEditAlertTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficAlertEditLoading = (state: State) => state.loading;
export const LoadTrafficAlertEditLoaded = (state: State) => state.loaded;
export const LoadTrafficAlertEditFailed = (state: State) => state.failed;
export const LoadTrafficAlertEdit = (state: State) => state.TrafficAlertEdit;
