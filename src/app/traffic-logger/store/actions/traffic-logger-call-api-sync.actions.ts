import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficLoggerCallApiSyncTypes = {
    LOAD: type('[TrafficLoggerCallApiSync] Load'),
    LOAD_SUCCESS: type('[TrafficLoggerCallApiSync] Load Success'),
    LOAD_FAIL: type('[TrafficLoggerCallApiSync] Load Fail'),
};
export const TrafficLoggerCallApiSyncTypes = {
    TrafficLoggerCallApiSyncAction: type('[TrafficLoggerCallApiSync] Action'),
    LoadTrafficLoggerCallApiSyncTypes: LoadTrafficLoggerCallApiSyncTypes
};

export class TrafficLoggerCallApiSyncAction implements AppStateAction {
    readonly type = TrafficLoggerCallApiSyncTypes.TrafficLoggerCallApiSyncAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficLoggerCallApiSyncAction implements AppStateAction {
    readonly type = LoadTrafficLoggerCallApiSyncTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficLoggerCallApiSyncAction implements AppStateAction {
    readonly type = LoadTrafficLoggerCallApiSyncTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficLoggerCallApiSyncAction implements AppStateAction {
    readonly type = LoadTrafficLoggerCallApiSyncTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const TrafficLoggerCallApiResetTypes = {
    TrafficLoggerCallApiResetAction: type('[TrafficLoggerCallApiReset] Action')
};

export class TrafficLoggerCallApiResetAction implements AppStateAction {
    readonly type = TrafficLoggerCallApiResetTypes.TrafficLoggerCallApiResetAction;
    constructor(public payload?: any) { }
}


export type TrafficLoggerCallApiSyncActions
    = TrafficLoggerCallApiSyncAction
    | LoadTrafficLoggerCallApiSyncAction
    | LoadSuccessTrafficLoggerCallApiSyncAction
    | LoadFailTrafficLoggerCallApiSyncAction
    | TrafficLoggerCallApiResetAction;
