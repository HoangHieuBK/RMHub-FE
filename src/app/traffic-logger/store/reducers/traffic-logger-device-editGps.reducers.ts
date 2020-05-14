import { ProcessState } from '@shared/AppAction';
import { EditGPSCoordinateActions, EditGPSCoordinateTypes, ResetEditGPSTypes } from '../actions/traffic-logger-device-editGPS.actions';


export interface State extends ProcessState {
    data: any[];
}

export const initialState: State = {
    loading: false,
    loaded: false,
    failed: false,
    data: null
};

export function reducer(state = initialState, action: EditGPSCoordinateActions): State {
    if (!action) { return state; }
    switch (action.type) {

        case EditGPSCoordinateTypes.EDIT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                failed: false,
                data: null
            });
        }
        case EditGPSCoordinateTypes.EDIT_SUCCESS: {

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                failed: false,
                data: action.payload
            });
        }
        case EditGPSCoordinateTypes.EDIT_FAIL: {

            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                failed: true,
                data: action.payload
            });
        }
        case ResetEditGPSTypes.Reset: {
            return initialState;
        }
        default:
            return state;
    }
}

export const EditGPSCoordinateLoading = (state: State) => state.loading;
export const EditGPSCoordinateLoaded = (state: State) => state.loaded;
export const EditGPSCoordinateFailed = (state: State) => state.failed;
export const EditGPSCoordinateData = (state: State) => state.data;
