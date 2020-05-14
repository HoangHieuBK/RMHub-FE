import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

const LoadTrafficLoggerDevicesTypes = {
    LOAD: type('[TrafficLoggerDevices] Load'),
    LOAD_SUCCESS: type('[TrafficLoggerDevices] Load Success'),
    LOAD_FAIL: type('[TrafficLoggerDevices] Load Fail'),
};
export const TrafficLoggerDevicesTypes = {
   TrafficLoggerDevicesAction: type('[TrafficLoggerDevices] Action'),
    LoadTrafficLoggerDevicesTypes: LoadTrafficLoggerDevicesTypes
};

export class TrafficLoggerDevicesAction implements AppStateAction {
    readonly type = TrafficLoggerDevicesTypes.TrafficLoggerDevicesAction;
    constructor(public payload?: any) { }
}

export class LoadTrafficLoggerDevicesAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesTypes.LOAD;
    constructor(public payload?: any) { }
}
export class LoadSuccessTrafficLoggerDevicesAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class LoadFailTrafficLoggerDevicesAction implements AppStateAction {
    readonly type = LoadTrafficLoggerDevicesTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}


export const ResetListDeviceTypes = {
    Reset: type('[Reset] ListDevice')
};

export class ResetListDeviceAction implements AppStateAction {
    readonly type = ResetListDeviceTypes.Reset;
    constructor(public payload?: any) {}

}


export type TrafficLoggerDevicesActions
    = TrafficLoggerDevicesAction
    | LoadTrafficLoggerDevicesAction
    | LoadSuccessTrafficLoggerDevicesAction
    | LoadFailTrafficLoggerDevicesAction
    | ResetListDeviceAction;
