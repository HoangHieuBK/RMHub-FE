import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficLoggerSyncTypes = {
    LOAD: type('[TrafficLoggerSync] Load'),
    LOAD_SUCCESS: type('[TrafficLoggerSync] Load Success'),
    LOAD_FAIL: type('[TrafficLoggerSync] Load Fail'),
};
export const TrafficLoggerSyncTypes = {
    TrafficLoggerSyncAction: type('[TrafficLoggerSync] Action'),
    LoadTrafficLoggerSyncTypes: LoadTrafficLoggerSyncTypes
};

export class TrafficLoggerSyncAction implements AppStateAction {
    readonly type = TrafficLoggerSyncTypes.TrafficLoggerSyncAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficLoggerSyncAction implements AppStateAction {
    readonly type = LoadTrafficLoggerSyncTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficLoggerSyncAction implements AppStateAction {
    readonly type = LoadTrafficLoggerSyncTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficLoggerSyncAction implements AppStateAction {
    readonly type = LoadTrafficLoggerSyncTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const TrafficLoggerResetSyncTypes = {
    TrafficLoggerResetSyncAction: type('[TrafficLoggerReset] Action')
};

export class TrafficLoggerResetSyncAction implements AppStateAction {
    readonly type = TrafficLoggerResetSyncTypes.TrafficLoggerResetSyncAction;
    constructor(public payload?: any) { }
}


export type TrafficLoggerSyncActions
    = TrafficLoggerSyncAction
    | LoadTrafficLoggerSyncAction
    | LoadSuccessTrafficLoggerSyncAction
    | LoadFailTrafficLoggerSyncAction
    | TrafficLoggerResetSyncAction;
