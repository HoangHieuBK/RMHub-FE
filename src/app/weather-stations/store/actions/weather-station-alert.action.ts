import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

// Get alerts Action
const GetAlertsDataTypes = {
    LOAD: type('[WSAlert] Load Alert'),
    LOAD_SUCCESS: type('[WSAlert] Load Alert Success'),
    LOAD_FAIL: type('[WSAlert] Load Alert Failed')
};
// Add an alert Action
const AddAlertDataTypes = {
    ADD: type('[WSAlert] Add'),
    ADD_SUCCESS: type('[WSAlert] Add Success'),
    ADD_FAIL: type('[WSAlert] Add Failed')
};
// Edit an alert Action
const EditAlertDataTypes = {
    EDIT: type('[WSAlert] Edit'),
    EDIT_SUCCESS: type('[WSAlert] Edit Success'),
    EDIT_FAIL: type('[WSAlert] Edit Failed')
};
// Delete an alert Action
const DeleteAlertDataTypes = {
    DELETE: type('[WSAlert] Delete Alert'),
    DELETE_SUCCESS: type('[WSAlert] Delete Alert Success'),
    DELETE_FAIL: type('[WSAlert] Delete Alert Failed'),
};
// Reset State
const WSAlertStateTypes = {
    RESET_STATE: type('[Weather] Alert Reset')
};
export const WSAlertActionTypes = {
    WSAlertAction: type('[Weather] Alert Action'),
    GetAlertsDataTypes: GetAlertsDataTypes,
    AddAlertDataTypes: AddAlertDataTypes,
    EditAlertDataTypes: EditAlertDataTypes,
    DeleteAlertDataTypes: DeleteAlertDataTypes,
    WSAlertStateTypes: WSAlertStateTypes
};

export class WSAlertInitAction implements AppStateAction {
    readonly type = WSAlertActionTypes.WSAlertAction;
    constructor(public payload?: any) { }
}
// ======================================================================================
// Get list of Alerts Action
export class GetAlertsAction implements AppStateAction {
    readonly type = GetAlertsDataTypes.LOAD;
    constructor(public payload?: any) { }
}
export class GetAlertsSuccessAction implements AppStateAction {
    readonly type = GetAlertsDataTypes.LOAD_SUCCESS;
    constructor(public payload?: any) { }
}
export class GetAlertsFailAction implements AppStateAction {
    readonly type = GetAlertsDataTypes.LOAD_FAIL;
    constructor(public payload?: any) { }
}
// Add a new Alert Actions
export class AddAlertAction implements AppStateAction {
    readonly type = AddAlertDataTypes.ADD;
    constructor(public payload?: any) { }
}
export class AddAlertSuccessAction implements AppStateAction {
    readonly type = AddAlertDataTypes.ADD_SUCCESS;
    constructor(public payload?: any) { }
}
export class AddAlertFailAction implements AppStateAction {
    readonly type = AddAlertDataTypes.ADD_FAIL;
    constructor(public payload?: any) { }
}
// Edit a new Alert Actions
export class EditAlertAction implements AppStateAction {
    readonly type = EditAlertDataTypes.EDIT;
    constructor(public payload?: any) { }
}
export class EditAlertSuccessAction implements AppStateAction {
    readonly type = EditAlertDataTypes.EDIT_SUCCESS;
    constructor(public payload?: any) { }
}
export class EditAlertFailAction implements AppStateAction {
    readonly type = EditAlertDataTypes.EDIT_FAIL;
    constructor(public payload?: any) { }
}
// Delete an Alert Actions
export class DeleteAlertAction implements AppStateAction {
    readonly type = DeleteAlertDataTypes.DELETE;
    constructor(public payload?: any) { }
}
export class DeleteAlertSuccessAction implements AppStateAction {
    readonly type = DeleteAlertDataTypes.DELETE_SUCCESS;
    constructor(public payload?: any) { }
}
export class DeleteAlertFailAction implements AppStateAction {
    readonly type = DeleteAlertDataTypes.DELETE_FAIL;
    constructor(public payload?: any) { }
}
export class WSAlertResetAction implements AppStateAction {
    readonly type = WSAlertStateTypes.RESET_STATE;
    constructor(public payload?: any) { }
}

// ======================================================================================
export type WeatherActions = WSAlertInitAction |
    GetAlertsAction | GetAlertsSuccessAction | GetAlertsFailAction |
    AddAlertAction | AddAlertSuccessAction | AddAlertFailAction |
    EditAlertAction | EditAlertSuccessAction | EditAlertFailAction |
    DeleteAlertAction | DeleteAlertSuccessAction | DeleteAlertFailAction |
    WSAlertResetAction;
