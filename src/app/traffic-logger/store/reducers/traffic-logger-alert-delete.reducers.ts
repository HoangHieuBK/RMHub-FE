import { ProcessState } from '@shared/AppAction';
import { TrafficAlertDeleteActions, TrafficAlertDeleteTypes, ResetDeleteAlertTypes } from '../actions/traffic-logger-alert-delete.actions';


export interface State extends ProcessState {
    TrafficAlertDelete: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficAlertDelete: null
};

export function reducer(state = initialState, action: TrafficAlertDeleteActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficAlertDeleteTypes.TrafficAlertDeleteAction:
            return state;

        case TrafficAlertDeleteTypes.LoadTrafficAlertDeleteTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficAlertDelete: null
            });
        }
        case TrafficAlertDeleteTypes.LoadTrafficAlertDeleteTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficAlertDelete: action.payload
            });
        }
        case TrafficAlertDeleteTypes.LoadTrafficAlertDeleteTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficAlertDelete: action.payload
            });
        }
        case ResetDeleteAlertTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficAlertDeleteLoading = (state: State) => state.loading;
export const LoadTrafficAlertDeleteLoaded = (state: State) => state.loaded;
export const LoadTrafficAlertDeleteFailed = (state: State) => state.failed;
export const LoadTrafficAlertDelete = (state: State) => state.TrafficAlertDelete;
