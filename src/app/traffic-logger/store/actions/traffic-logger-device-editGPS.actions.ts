
import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

export const EditGPSCoordinateTypes = {
    EDIT: type('[TrafficDevice], EDIT'),
    EDIT_SUCCESS: type('[TrafficDevice], EDIT SUCCESS'),
    EDIT_FAIL: type('[TrafficDevice], EDIT FAIL')
};

export namespace EditGPSCoordinateAction {

    export class EditAction implements AppStateAction {
        readonly type = EditGPSCoordinateTypes.EDIT;
        constructor(public payload?: any) { }
    }

    export class EditSuccessAction implements AppStateAction {
        readonly type = EditGPSCoordinateTypes.EDIT_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class EditFailAction implements AppStateAction {
        readonly type = EditGPSCoordinateTypes.EDIT_FAIL;
        constructor(public payload?: any) { }
    }
}

export const ResetEditGPSTypes = {
    Reset: type('[Reset] EditGPS')
};

export class ResetEditGPSAction implements AppStateAction {
    readonly type = ResetEditGPSTypes.Reset;
    constructor(public payload?: any) {}

}

export type EditGPSCoordinateActions =
    EditGPSCoordinateAction.EditAction |
    EditGPSCoordinateAction.EditSuccessAction |
    EditGPSCoordinateAction.EditFailAction |
    ResetEditGPSAction;


