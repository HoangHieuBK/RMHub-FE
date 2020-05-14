import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficAlertDeleteTypes = {
    LOAD: type('[TrafficAlertDelete] Load'),
    LOAD_SUCCESS: type('[TrafficAlertDelete] Load Success'),
    LOAD_FAIL: type('[TrafficAlertDelete] Load Fail'),
};
export const TrafficAlertDeleteTypes = {
    TrafficAlertDeleteAction: type('[TrafficAlertDelete] Action'),
    LoadTrafficAlertDeleteTypes: LoadTrafficAlertDeleteTypes
};

export class TrafficAlertDeleteAction implements AppStateAction {
    readonly type = TrafficAlertDeleteTypes.TrafficAlertDeleteAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficAlertDeleteAction implements AppStateAction {
    readonly type = LoadTrafficAlertDeleteTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficAlertDeleteAction implements AppStateAction {
    readonly type = LoadTrafficAlertDeleteTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficAlertDeleteAction implements AppStateAction {
    readonly type = LoadTrafficAlertDeleteTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const ResetDeleteAlertTypes = {
    Reset: type('[Reset] DeleteAlert')
};

export class ResetDeleteAlertAction implements AppStateAction {
    readonly type = ResetDeleteAlertTypes.Reset;
    constructor(public payload?: any) {}

}

export type TrafficAlertDeleteActions
    = TrafficAlertDeleteAction
    | LoadTrafficAlertDeleteAction
    | LoadSuccessTrafficAlertDeleteAction
    | LoadFailTrafficAlertDeleteAction
    | ResetDeleteAlertAction;
