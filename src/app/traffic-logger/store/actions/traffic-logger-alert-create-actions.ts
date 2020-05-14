import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficAlertCreateTypes = {
    LOAD: type('[TrafficAlertCreate] Load'),
    LOAD_SUCCESS: type('[TrafficAlertCreate] Load Success'),
    LOAD_FAIL: type('[TrafficAlertCreate] Load Fail'),
};
export const TrafficAlertCreateTypes = {
    TrafficAlertCreateAction: type('[TrafficAlertCreate] Action'),
    LoadTrafficAlertCreateTypes: LoadTrafficAlertCreateTypes
};

export class TrafficAlertCreateAction implements AppStateAction {
    readonly type = TrafficAlertCreateTypes.TrafficAlertCreateAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficAlertCreateAction implements AppStateAction {
    readonly type = LoadTrafficAlertCreateTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficAlertCreateAction implements AppStateAction {
    readonly type = LoadTrafficAlertCreateTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficAlertCreateAction implements AppStateAction {
    readonly type = LoadTrafficAlertCreateTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const ResetCreateAlertTypes = {
    Reset: type('[Reset] CreateAlert')
};

export class ResetCreateAlertAction implements AppStateAction {
    readonly type = ResetCreateAlertTypes.Reset;
    constructor(public payload?: any) {}
}


export type TrafficAlertCreateActions
    = TrafficAlertCreateAction
    | LoadTrafficAlertCreateAction
    | LoadSuccessTrafficAlertCreateAction
    | LoadFailTrafficAlertCreateAction
    | ResetCreateAlertAction;
