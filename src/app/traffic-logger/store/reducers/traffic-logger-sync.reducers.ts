import { ProcessState } from '@shared/AppAction';
import { TrafficLoggerSyncActions, TrafficLoggerSyncTypes, TrafficLoggerResetSyncTypes } from '../actions/traffic-logger-sync.actions';


export interface State extends ProcessState {
    TrafficLoggerSyncs: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    TrafficLoggerSyncs: null
};

export function reducer(state = initialState, action: TrafficLoggerSyncActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case TrafficLoggerSyncTypes.TrafficLoggerSyncAction:
            return state;

        case TrafficLoggerSyncTypes.LoadTrafficLoggerSyncTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                TrafficLoggerSyncs: null
            });
        }
        case TrafficLoggerSyncTypes.LoadTrafficLoggerSyncTypes.LOAD_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                TrafficLoggerSyncs: action.payload
            });
        }
        case TrafficLoggerSyncTypes.LoadTrafficLoggerSyncTypes.LOAD_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                TrafficLoggerSyncs: action.payload
            });
        }
        case TrafficLoggerResetSyncTypes.TrafficLoggerResetSyncAction: {
            return initialState;
        }
        default:
            return state;
    }
}

export const LoadTrafficLoggerSyncsLoading = (state: State) => state.loading;
export const LoadTrafficLoggerSyncsLoaded = (state: State) => state.loaded;
export const LoadTrafficLoggerSyncsFailed = (state: State) => state.failed;
export const LoadTrafficLoggerSyncs = (state: State) => state.TrafficLoggerSyncs;
