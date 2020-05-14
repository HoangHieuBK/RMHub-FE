import { AppEntityCustomState } from '@shared/AppAction';
import { WeatherActions, WSAlertActionTypes } from '../actions/weather-station-alert.action';

interface GetAlertsDataState extends AppEntityCustomState<any, any> { }
interface AddAlertDataState extends AppEntityCustomState<any, any> { }
interface EditAlertDataState extends AppEntityCustomState<any, any> { }
interface DeleteAlertDataState extends AppEntityCustomState<any, any> { }

export interface State {
    getAlertsState: GetAlertsDataState;
    addAlertState: AddAlertDataState;
    editAlertState: EditAlertDataState;
    deleteAlertState: DeleteAlertDataState;
}
// ======================================================================================
export const initialState: State = {
    getAlertsState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null,
    },
    addAlertState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null
    },
    editAlertState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null
    },
    deleteAlertState: {
        loading: false,
        loaded: false,
        failed: false,
        query: false,
        data: null,
    }
};
// ======================================================================================
export function reducer(state = initialState, action: WeatherActions): State {
    if (!action) { return state; }
    switch (action.type) {
        case WSAlertActionTypes.WSAlertAction:
            return state;
        // Get list of Alerts
        case WSAlertActionTypes.GetAlertsDataTypes.LOAD: {
            return Object.assign({}, state, {
                getAlertsState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSAlertActionTypes.GetAlertsDataTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                getAlertsState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSAlertActionTypes.GetAlertsDataTypes.LOAD_FAIL: {
            return Object.assign({}, state, {
                getAlertsState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload
                }
            });
        }
        // add an new Alerts
        case WSAlertActionTypes.AddAlertDataTypes.ADD: {
            return Object.assign({}, state, {
                addAlertState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSAlertActionTypes.AddAlertDataTypes.ADD_SUCCESS: {
            return Object.assign({}, state, {
                addAlertState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSAlertActionTypes.AddAlertDataTypes.ADD_FAIL: {
            return Object.assign({}, state, {
                addAlertState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload
                }
            });
        }
        // edit an new Alerts
        case WSAlertActionTypes.EditAlertDataTypes.EDIT: {
            return Object.assign({}, state, {
                editAlertState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSAlertActionTypes.EditAlertDataTypes.EDIT_SUCCESS: {
            return Object.assign({}, state, {
                editAlertState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSAlertActionTypes.EditAlertDataTypes.EDIT_FAIL: {
            return Object.assign({}, state, {
                editAlertState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload
                }
            });
        }
        // delete an new Alerts
        case WSAlertActionTypes.DeleteAlertDataTypes.DELETE: {
            return Object.assign({}, state, {
                deleteAlertState: {
                    loading: true,
                    query: action.payload,
                    data: null
                }
            });
        }
        case WSAlertActionTypes.DeleteAlertDataTypes.DELETE_SUCCESS: {
            return Object.assign({}, state, {
                deleteAlertState: {
                    loaded: true,
                    loading: false,
                    failed: false,
                    data: action.payload
                }
            });
        }
        case WSAlertActionTypes.DeleteAlertDataTypes.DELETE_FAIL: {
            return Object.assign({}, state, {
                deleteAlertState: {
                    loaded: false,
                    loading: false,
                    failed: true,
                    data: action.payload
                }
            });
        }
        // Reset State
        case WSAlertActionTypes.WSAlertStateTypes.RESET_STATE: {
            return initialState;
        }
        default:
            return state;
    }
}
// ================================================================================
export const getAlertsData = {
    getAlerts: (state: State) => state.getAlertsState.data
};
export const addAlertData = {
    addAlert: (state: State) => state.addAlertState.data
};
export const editAlertData = {
    editAlert: (state: State) => state.editAlertState.data
};
export const deleteAlertData = {
    deleteAlert: (state: State) => state.deleteAlertState.data
};
