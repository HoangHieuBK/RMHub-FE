import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficLoggerDevicesDetailTypes = {
    LOAD: type('[TrafficLoggerDevicesDetail] Load'),
    LOAD_SUCCESS: type('[TrafficLoggerDevicesDetail] Load Success'),
    LOAD_FAIL: type('[TrafficLoggerDevicesDetail] Load Fail'),
};
export const TrafficLoggerDevicesDetailTypes = {
   TrafficLoggerDevicesDetailAction: type('[TrafficLoggerDevicesDetail] Action'),
    LoadTrafficLoggerDevicesDetailTypes: LoadTrafficLoggerDevicesDetailTypes
};

export class TrafficLoggerDevicesDetailAction implements AppStateAction {
    readonly type = TrafficLoggerDevicesDetailTypes.TrafficLoggerDevicesDetailAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficLoggerDevicesDetailAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesDetailTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficLoggerDevicesDetailAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesDetailTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficLoggerDevicesDetailAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesDetailTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}

export const ResetDetailDeviceTypes = {
    Reset: type('[Reset] DetailDevice')
};

export class ResetDetailDeviceAction implements AppStateAction {
    readonly type = ResetDetailDeviceTypes.Reset;
    constructor(public payload?: any) {}

}

export type TrafficLoggerDevicesDetailActions
    = TrafficLoggerDevicesDetailAction
    | LoadTrafficLoggerDevicesDetailAction
    | LoadSuccessTrafficLoggerDevicesDetailAction
    | LoadFailTrafficLoggerDevicesDetailAction
    | ResetDetailDeviceAction;
