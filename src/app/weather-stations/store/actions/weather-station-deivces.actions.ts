import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

// Load Data from RMHub Data
const GetWSDeviceDataTypes = {
    LOAD: type('[Weather] Load WS'),
    LOAD_SUCCESS: type('[Weather] Load WS Success'),
    LOAD_FAIL: type('[Weather] Load WS Fail')
};
// Get Data from vivisu
const GetWSDeviceMivisuDataTypes = {
    LOAD: type('[Weather] Load WS Mivisu'),
    LOAD_SUCCESS: type('[Weather] Load WS Mivisu Success'),
    LOAD_FAIL: type('[Weather] Load WS Mivisu Fail')
};
// Get Data from socket
const GetWSDeviceSocketDataTypes = {
    LOAD: type('[Weather] Load WS Socket'),
    LOAD_SUCCESS: type('[Weather] Load WS Socket Success'),
    LOAD_FAIL: type('[Weather] Load WS Socket Fail')
};
// Delete WS Device
const DeleteWSDeviceDataTypes = {
    DELETE: type('[Weather] Delete'),
    DELETE_SUCCESS: type('[Weather] Delete Success'),
    DELETE_FAIL: type('[Weather] Delete Failed')
};
// View detail of an alert
const DetailWSDeviceDataTypes = {
    GET: type('[Weather] Get WS'),
    GET_SUCCESS: type('[Weather] Get WS Success'),
    GET_FAIL: type('[Weather] Get WS Fail')
};
// Reset State
const WSDeviceStateTypes = {
    RESET_STATE: type('[Weather] WSDevice Reset')
};
export const WSDeviceActionTypes = {
    WSAction: type('[Weather] WSDevice Action'),
    GetWSDeviceDataTypes: GetWSDeviceDataTypes,
    GetWSDeviceMivisuDataTypes: GetWSDeviceMivisuDataTypes,
    GetWSDeviceSocketDataTypes: GetWSDeviceSocketDataTypes,
    DetailWSDeviceDataTypes: DetailWSDeviceDataTypes,
    DeleteWSDeviceDataTypes: DeleteWSDeviceDataTypes,
    WSDeviceStateTypes: WSDeviceStateTypes,
};

export class WSDeviceInitAction implements AppStateAction {
    readonly type = WSDeviceActionTypes.WSAction;
    constructor(public payload?: any) { }
}
// ======================================================================================
/**
 * Weather Device from RMHub database
 */
export class GetWSDeviceAction implements AppStateAction {
    readonly type = GetWSDeviceDataTypes.LOAD;
    constructor(public payload?: any) { }
}
export class GetWSDeviceSuccessAction implements AppStateAction {
    readonly type = GetWSDeviceDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetWSDeviceFailAction implements AppStateAction {
    readonly type = GetWSDeviceDataTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}
// Get WS Device form Socket
export class GetWSDeviceSocketAction implements AppStateAction {
    readonly type = GetWSDeviceSocketDataTypes.LOAD;
    constructor(public payload?: any) { }
}
export class GetWSDeviceSocketSuccessAction implements AppStateAction {
    readonly type = GetWSDeviceSocketDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetWSDeviceSocketFailAction implements AppStateAction {
    readonly type = GetWSDeviceSocketDataTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}
// Get WS Device form Mivisu
export class GetWSDeviceMivisuAction implements AppStateAction {
    readonly type = GetWSDeviceMivisuDataTypes.LOAD;
    constructor(public payload?: any) { }
}
export class GetWSDeviceMivisuSuccessAction implements AppStateAction {
    readonly type = GetWSDeviceMivisuDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetWSDeviceMivisuFailAction implements AppStateAction {
    readonly type = GetWSDeviceMivisuDataTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}
// Get a Device
export class DetailWSDeviceAction implements AppStateAction {
    readonly type = DetailWSDeviceDataTypes.GET;
    constructor(public payload?: any) { }
}
export class DetailWSDeviceSuccessAction implements AppStateAction {
    readonly type = DetailWSDeviceDataTypes.GET_SUCCESS;
    constructor(public payload?: any) { }
}
export class DetailWSDeviceFailAction implements AppStateAction {
    readonly type = DetailWSDeviceDataTypes.GET_FAIL;
    constructor(public payload?: any) { }
}
/**
 * Delete an alert Action
 */
export class DeleteWSDeviceAction implements AppStateAction {
    readonly type = DeleteWSDeviceDataTypes.DELETE;
    constructor(public payload?: any) { }
}
export class DeleteWSDeviceSuccessAction implements AppStateAction {
    readonly type = DeleteWSDeviceDataTypes.DELETE_SUCCESS;
    constructor(public payload?: any) { }
}
export class DeleteWSDeviceFailAction implements AppStateAction {
    readonly type = DeleteWSDeviceDataTypes.DELETE_FAIL;
    constructor(public payload?: any) { }
}
// Reset state
export class WSDeviceResetAction implements AppStateAction {
    readonly type = WSDeviceStateTypes.RESET_STATE;
    constructor(public payload?: any) { }
}

// ======================================================================================
export type WeatherActions = WSDeviceInitAction |
    GetWSDeviceAction | GetWSDeviceSuccessAction | GetWSDeviceFailAction |
    GetWSDeviceMivisuAction | GetWSDeviceMivisuSuccessAction | GetWSDeviceMivisuFailAction |
    GetWSDeviceSocketAction | GetWSDeviceSocketSuccessAction | GetWSDeviceSocketFailAction |
    DetailWSDeviceAction | DetailWSDeviceSuccessAction | DetailWSDeviceFailAction |
    DeleteWSDeviceAction | DeleteWSDeviceSuccessAction | DeleteWSDeviceFailAction |
    WSDeviceResetAction;
