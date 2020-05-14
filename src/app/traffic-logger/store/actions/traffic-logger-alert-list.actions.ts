import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficAlertListTypes = {
    LOAD: type('[TrafficAlertList] Load'),
    LOAD_SUCCESS: type('[TrafficAlertList] Load Success'),
    LOAD_FAIL: type('[TrafficAlertList] Load Fail'),
};
export const TrafficAlertListTypes = {
    TrafficAlertListAction: type('[TrafficAlertList] Action'),
    LoadTrafficAlertListTypes: LoadTrafficAlertListTypes
};

export class TrafficAlertListAction implements AppStateAction {
    readonly type = TrafficAlertListTypes.TrafficAlertListAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficAlertListAction implements AppStateAction {
    readonly type = LoadTrafficAlertListTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficAlertListAction implements AppStateAction {
    readonly type = LoadTrafficAlertListTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficAlertListAction implements AppStateAction {
    readonly type = LoadTrafficAlertListTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const ResetListAlertTypes = {
    Reset: type('[Reset] ListAlert')
};

export class ResetListAlertAction implements AppStateAction {
    readonly type = ResetListAlertTypes.Reset;
    constructor(public payload?: any) {}

}

export type TrafficAlertListActions
    = TrafficAlertListAction
    | LoadTrafficAlertListAction
    | LoadSuccessTrafficAlertListAction
    | LoadFailTrafficAlertListAction
    | ResetListAlertAction;
