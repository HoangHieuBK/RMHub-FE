import { type } from '@shared/utilites/utilityHelpers';
import { AppStateAction } from '@shared/AppAction';

export const MapDataDeviceTypes = {
    LOAD: type('[MapDevice], LOAD'),
    LOAD_SUCCESS: type('[MapDevice], LOAD SUCCESS'),
    LOAD_FAIL: type('[MapDevice], LOAD FAIL')
};
export const MapTrafficAlertDeviceTypes = {
    LOAD: type('[MapTrafficAlertDevice], LOAD'),
    LOAD_SUCCESS: type('[MapTrafficAlertDevice], LOAD SUCCESS'),
    LOAD_FAIL: type('[MapTrafficAlertDevice], LOAD FAIL')
};
export const MapReset = {
    RESET: type('[MapAction], Reset'),
};
export const SetLocationTypes = {
    SET: type('[MapDevice], SET'),
    SET_SUCCESS: type('[MapDevice], SET SUCCESS'),
    SET_FAIL: type('[MapDevice], SET FAIL')
};
export const SearchDeviceTypes = {
    SEARCH: type('[MapDevice], SEARCH'),
    SEARCH_SUCCESS: type('[MapDevice], SEARCH SUCCESS'),
    SEARCH_FAIL: type('[MapDevice], SEARCH FAIL')
};
export const MapRefreshDataDeviceTypes = {
    LOAD: type('[MapRefreshDataDevice], LOAD'),
    LOAD_SUCCESS: type('[MapRefreshDataDevice], LOAD SUCCESS'),
    LOAD_FAIL: type('MapRefreshDataDevice], LOAD FAIL')
};
export const MapCatDataTypes = {
    LOAD: type('[MapCatData], LOAD'),
    LOAD_SUCCESS: type('[MapCatData], LOAD SUCCESS'),
    LOAD_FAIL: type('MapCatData], LOAD FAIL')
};
export const MapWeatherAlertDeviceTypes = {
    LOAD: type('[MapWeatherAlertDevice], LOAD'),
    LOAD_SUCCESS: type('[MapWeatherAlertDevice], LOAD SUCCESS'),
    LOAD_FAIL: type('[MapWeatherAlertDevice], LOAD FAIL')
};
export const MapDeviceTechnicalTypes = {
    LOAD: type('[MapDeviceTechnical], LOAD'),
    LOAD_SUCCESS: type('[MapDeviceTechnical], LOAD SUCCESS'),
    LOAD_FAIL: type('[MapDeviceTechnical], LOAD FAIL')
};
export const ResetAllState = {
    RESET: type('[ResetAll], Reset'),
};
export const MapDeviceTypes = {
    MapDeviceAction: type('[MapDeviceAction], Action'),
    MapDataDeviceTypes: MapDataDeviceTypes,
    MapTrafficAlertDeviceTypes: MapTrafficAlertDeviceTypes,
    MapReset: MapReset,
    SetLocationTypes: SetLocationTypes,
    SearchDeviceTypes: SearchDeviceTypes,
    MapRefreshDataDeviceTypes: MapRefreshDataDeviceTypes,
    MapCatDataTypes: MapCatDataTypes,
    MapWeatherAlertDeviceTypes: MapWeatherAlertDeviceTypes,
    MapDeviceTechnicalTypes: MapDeviceTechnicalTypes,
    ResetAllState: ResetAllState
};

export class MapInitAction implements AppStateAction {
    readonly type = MapDeviceTypes.MapDeviceAction;
    constructor(public payload?: any) { }
}
export class MapResetAction implements AppStateAction {
    readonly type = MapDeviceTypes.MapReset.RESET;
    constructor(public payload?: any) { }
}
export namespace MapDeviceAction {

    export class LoadAction implements AppStateAction {
        readonly type = MapDataDeviceTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = MapDataDeviceTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = MapDataDeviceTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
export namespace MapTrafficAlertDeviceAction {

    export class LoadAction implements AppStateAction {
        readonly type = MapTrafficAlertDeviceTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = MapTrafficAlertDeviceTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = MapTrafficAlertDeviceTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
// set location actions
export namespace SetLocationAction {

    export class SetAction implements AppStateAction {
        readonly type = SetLocationTypes.SET;
        constructor(public payload?: any) { }
    }

    export class SetSuccessAction implements AppStateAction {
        readonly type = SetLocationTypes.SET_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class SetFailAction implements AppStateAction {
        readonly type = SetLocationTypes.SET_FAIL;
        constructor(public payload?: any) { }
    }
}
// set location actions
export namespace SearchDeviceAction {

    export class SearchAction implements AppStateAction {
        readonly type = SearchDeviceTypes.SEARCH;
        constructor(public payload?: any) { }
    }

    export class SearchSuccessAction implements AppStateAction {
        readonly type = SearchDeviceTypes.SEARCH_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class SearchFailAction implements AppStateAction {
        readonly type = SearchDeviceTypes.SEARCH_FAIL;
        constructor(public payload?: any) { }
    }
}
export namespace MapRefreshDeviceAction {

    export class LoadAction implements AppStateAction {
        readonly type = MapRefreshDataDeviceTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = MapRefreshDataDeviceTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = MapRefreshDataDeviceTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
export namespace MapCatAction {

    export class LoadAction implements AppStateAction {
        readonly type = MapCatDataTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = MapCatDataTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = MapCatDataTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
export namespace MapWeatherAlertDeviceAction {

    export class LoadAction implements AppStateAction {
        readonly type = MapWeatherAlertDeviceTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = MapWeatherAlertDeviceTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = MapWeatherAlertDeviceTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
export namespace MapDeviceTechnicalAction {

    export class LoadAction implements AppStateAction {
        readonly type = MapDeviceTechnicalTypes.LOAD;
        constructor(public payload?: any) { }
    }

    export class LoadSuccessAction implements AppStateAction {
        readonly type = MapDeviceTechnicalTypes.LOAD_SUCCESS;
        constructor(public payload?: any) { }
    }

    export class LoadFailAction implements AppStateAction {
        readonly type = MapDeviceTechnicalTypes.LOAD_FAIL;
        constructor(public payload?: any) { }
    }
}
export class ResetAllStateAction implements AppStateAction {
    readonly type = ResetAllState.RESET;
    constructor(public payload?: any) { }
}
export type MapActions =
    MapDeviceAction.LoadAction |
    MapDeviceAction.LoadSuccessAction |
    MapDeviceAction.LoadFailAction |
    MapInitAction |
    MapTrafficAlertDeviceAction.LoadAction |
    MapTrafficAlertDeviceAction.LoadSuccessAction |
    MapTrafficAlertDeviceAction.LoadFailAction |
    MapResetAction |
    SetLocationAction.SetAction | SetLocationAction.SetSuccessAction | SetLocationAction.SetFailAction |
    SearchDeviceAction.SearchAction | SearchDeviceAction.SearchSuccessAction | SearchDeviceAction.SearchFailAction |
    MapRefreshDeviceAction.LoadAction | MapRefreshDeviceAction.LoadFailAction | MapRefreshDeviceAction.LoadSuccessAction |
    MapCatAction.LoadAction | MapCatAction.LoadSuccessAction | MapCatAction.LoadFailAction |
    MapWeatherAlertDeviceAction.LoadAction | MapWeatherAlertDeviceAction.LoadSuccessAction | MapWeatherAlertDeviceAction.LoadFailAction |
    MapDeviceTechnicalAction.LoadAction | MapDeviceTechnicalAction.LoadSuccessAction | MapDeviceTechnicalAction.LoadFailAction |
    ResetAllStateAction
    ;

