import { ProcessState } from '@shared/AppAction';
import { TrafficLoggerCallApiSyncActions, TrafficLoggerCallApiSyncTypes, TrafficLoggerCallApiResetTypes } from '../actions/traffic-logger-call-api-sync.actions';


export interface State extends ProcessState {
    TrafficLoggerCallApiSyncs: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficLoggerCallApiSyncs: null
};

export function reducer(state = initialState, action: TrafficLoggerCallApiSyncActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficLoggerCallApiSyncTypes.TrafficLoggerCallApiSyncAction:
            return state;

        case TrafficLoggerCallApiSyncTypes.LoadTrafficLoggerCallApiSyncTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficLoggerCallApiSyncs: null
            });
        }
        case TrafficLoggerCallApiSyncTypes.LoadTrafficLoggerCallApiSyncTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficLoggerCallApiSyncs: action.payload
            });
        }
        case TrafficLoggerCallApiSyncTypes.LoadTrafficLoggerCallApiSyncTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficLoggerCallApiSyncs: action.payload
            });
        }
        case TrafficLoggerCallApiResetTypes.TrafficLoggerCallApiResetAction: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficLoggerCallApiSyncsLoading = (state: State) => state.loading;
export const LoadTrafficLoggerCallApiSyncsLoaded = (state: State) => state.loaded;
export const LoadTrafficLoggerCallApiSyncsFailed = (state: State) => state.failed;
export const LoadTrafficLoggerCallApiSyncs = (state: State) => state.TrafficLoggerCallApiSyncs;
