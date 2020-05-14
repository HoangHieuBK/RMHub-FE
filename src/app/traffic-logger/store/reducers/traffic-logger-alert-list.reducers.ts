import { ProcessState } from '@shared/AppAction';
import { TrafficAlertListActions, TrafficAlertListTypes, ResetListAlertTypes } from '../actions/traffic-logger-alert-list.actions';


export interface State extends ProcessState {
    TrafficAlertList: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficAlertList: null
};

export function reducer(state = initialState, action: TrafficAlertListActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficAlertListTypes.TrafficAlertListAction:
            return state;

        case TrafficAlertListTypes.LoadTrafficAlertListTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficAlertList: null
            });
        }
        case TrafficAlertListTypes.LoadTrafficAlertListTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficAlertList: action.payload
            });
        }
        case TrafficAlertListTypes.LoadTrafficAlertListTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficAlertList: action.payload
            });
        }
        case ResetListAlertTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficAlertListLoading = (state: State) => state.loading;
export const LoadTrafficAlertListLoaded = (state: State) => state.loaded;
export const LoadTrafficAlertListFailed = (state: State) => state.failed;
export const LoadTrafficAlertList = (state: State) => state.TrafficAlertList;
