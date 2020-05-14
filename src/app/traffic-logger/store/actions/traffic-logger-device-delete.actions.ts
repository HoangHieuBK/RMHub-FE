import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficLoggerDevicesDeleteTypes = {
    LOAD: type('[TrafficLoggerDevicesDelete] Load'),
    LOAD_SUCCESS: type('[TrafficLoggerDevicesDelete] Load Success'),
    LOAD_FAIL: type('[TrafficLoggerDevicesDelete] Load Fail'),
};
export const TrafficLoggerDevicesDeleteTypes = {
   TrafficLoggerDevicesDeleteAction: type('[TrafficLoggerDevicesDelete] Action'),
    LoadTrafficLoggerDevicesDeleteTypes: LoadTrafficLoggerDevicesDeleteTypes
};


export class TrafficLoggerDevicesDeleteAction implements AppStateAction {
    readonly type = TrafficLoggerDevicesDeleteTypes.TrafficLoggerDevicesDeleteAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficLoggerDevicesDeleteAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesDeleteTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficLoggerDevicesDeleteAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesDeleteTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficLoggerDevicesDeleteAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesDeleteTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const ResetDeleteDeviceTypes = {
    Reset: type('[Reset] DeleteDevice')
};

export class ResetDeleteDeviceAction implements AppStateAction {
    readonly type = ResetDeleteDeviceTypes.Reset;
    constructor(public payload?: any) {}

}


export type TrafficLoggerDevicesDeleteActions
    = TrafficLoggerDevicesDeleteAction
    | LoadTrafficLoggerDevicesDeleteAction
    | LoadSuccessTrafficLoggerDevicesDeleteAction
    | LoadFailTrafficLoggerDevicesDeleteAction
    | ResetDeleteDeviceAction;
