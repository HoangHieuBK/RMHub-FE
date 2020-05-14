import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficAlertEditTypes = {
    LOAD: type('[TrafficAlertEdit] Load'),
    LOAD_SUCCESS: type('[TrafficAlertEdit] Load Success'),
    LOAD_FAIL: type('[TrafficAlertEdit] Load Fail'),
};
export const TrafficAlertEditTypes = {
    TrafficAlertEditAction: type('[TrafficAlertEdit] Action'),
    LoadTrafficAlertEditTypes: LoadTrafficAlertEditTypes
};

export class TrafficAlertEditAction implements AppStateAction {
    readonly type = TrafficAlertEditTypes.TrafficAlertEditAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficAlertEditAction implements AppStateAction {
    readonly type = LoadTrafficAlertEditTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficAlertEditAction implements AppStateAction {
    readonly type = LoadTrafficAlertEditTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficAlertEditAction implements AppStateAction {
    readonly type = LoadTrafficAlertEditTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const ResetEditAlertTypes = {
    Reset: type('[Reset] EditAlert')
};

export class ResetEditAlertAction implements AppStateAction {
    readonly type = ResetEditAlertTypes.Reset;
    constructor(public payload?: any) {}

}


export type TrafficAlertEditActions
    = TrafficAlertEditAction
    | LoadTrafficAlertEditAction
    | LoadSuccessTrafficAlertEditAction
    | LoadFailTrafficAlertEditAction
    | ResetEditAlertAction;
