import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import * as MapStore from './store';
import * as MapActions from './store/actions/map-device.actions';



@Injectable()
export class MapSandbox extends Sandbox {

    constructor(
        protected appState$: Store<store.State>,
        private MapState$: Store<MapStore.MapDeviceState>
    ) {
        super(appState$);
    }
    public mapDeviceData$ = this.MapState$.select(
        MapStore.mapDeviceData
    );
    public mapTrafficAlertDevice$ = this.MapState$.select(
        MapStore.mapTrafficAlertDeviceData
    );
    public setLocationData$ = this.MapState$.select(
        MapStore.setLocationData
    );
    public searchDeviceData$ = this.MapState$.select(
        MapStore.searchDeviceData
    );
    public mapRefreshDeviceData$ = this.MapState$.select(
        MapStore.mapRefreshDeviceData
    );
    public mapCatData$ = this.MapState$.select(
        MapStore.mapCatData
    );
    public mapWeatherAlertDevice$ = this.MapState$.select(
        MapStore.mapWeatherAlertDeviceData
    );
    public mapDeviceTechnicalData$ = this.MapState$.select(
        MapStore.mapDeviceTechnicalData
    );
    /**
    * Load devices from the server
    */
    public loadDeviceData(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapDeviceAction.LoadAction(params));
    }
    public loadTrafficAlertDevice(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapTrafficAlertDeviceAction.LoadAction(params));
    }
    public resetSate(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapResetAction(params));
    }
    public setLocationDevice(params?: any): void {
        this.MapState$.dispatch(new MapActions.SetLocationAction.SetAction(params));
    }
    public searchDevice(params?: any): void {
        this.MapState$.dispatch(new MapActions.SearchDeviceAction.SearchAction(params));
    }
    public loadRefreshDeviceData(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapRefreshDeviceAction.LoadAction(params));
    }
    public loadMapCatData(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapCatAction.LoadAction(params));
    }
    public loadWeatherAlertDevice(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapWeatherAlertDeviceAction.LoadAction(params));
    }
    public loadDeviceTechnical(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapDeviceTechnicalAction.LoadAction(params));
    }
    public loadSuccessTrafficAlertDevice(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapTrafficAlertDeviceAction.LoadSuccessAction(params));
    }
    public loadSuccessWeatherAlertDevice(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapWeatherAlertDeviceAction.LoadSuccessAction(params));
    }
    public loadSuccessDeviceTechnical(params?: any): void {
        this.MapState$.dispatch(new MapActions.MapDeviceTechnicalAction.LoadSuccessAction(params));
    }
    public resetAllState(params?: any): void {
        this.MapState$.dispatch(new MapActions.ResetAllStateAction(params));
    }
}
