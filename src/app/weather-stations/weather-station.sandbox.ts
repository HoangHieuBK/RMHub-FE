import { Injectable } from '@angular/core';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '@shared/store';
import * as wsStore from './store';
import * as WSDeviceAction from './store/actions/weather-station-deivces.actions';
import * as WSAlertAction from './store/actions/weather-station-alert.action';

@Injectable({
    providedIn: 'root'
})
export class WeatherStationSandbox extends Sandbox {

    constructor(
        protected appState$: Store<store.State>,
        private wsState$: Store<wsStore.WSState>,
    ) {
        super(appState$);
    }


    /*
     * data ws-devices that's gotten from server
     */
    public weatherData$ = this.wsState$.select(
        wsStore.getWeatherData
    );
    public getWSDeviceMisisuData$ = this.wsState$.select(
        wsStore.getWSDeviceMivisuData
    );
    public getWSDeviceSocketData$ = this.wsState$.select(
        wsStore.getWSDeviceSocketData
    );
    public detailWSDeviceData$ = this.wsState$.select(
        wsStore.detailWSDeviceData
    );
    public deleteWSDeviceData$ = this.wsState$.select(
        wsStore.deleteWSDeviceData
    );
    // ====================================================================
    /*
     * data ws-alert that's gotten from server
     */
    public getWSAlertData$ = this.wsState$.select(
        wsStore.getAlertsData
    );
    public addWSAlertData$ = this.wsState$.select(
        wsStore.addAlertData
    );
    public editWSAlertData$ = this.wsState$.select(
        wsStore.editAlertData
    );
    public deleteWSAlertData$ = this.wsState$.select(
        wsStore.deleteAlertData
    );
    // ====================================================================
    /*
     * Dispatch action's ws-device
     */
    public getWSDevices(params?: any): void {
        this.appState$.dispatch(new WSDeviceAction.GetWSDeviceAction(params));
    }
    public getWSDevicesMivisu(params?: any): void {
        this.appState$.dispatch(new WSDeviceAction.GetWSDeviceMivisuAction(params));
    }
    public getWSDevicesSocket(params?: any): void {
        this.appState$.dispatch(new WSDeviceAction.GetWSDeviceSocketAction(params));
    }
    public detailWSDevices(params?: any): void {
        this.appState$.dispatch(new WSDeviceAction.DetailWSDeviceAction(params));
    }
    public deleteWSDevice(params?: any): void {
        this.appState$.dispatch(new WSDeviceAction.DeleteWSDeviceAction(params));
    }
    // ====================================================================
    /*
     * Dispatch action's ws-alert
     */
    public getWSAlerts(params?: any): void {
        this.appState$.dispatch(new WSAlertAction.GetAlertsAction(params));
    }
    public addWSAlerts(params?: any): void {
        this.appState$.dispatch(new WSAlertAction.AddAlertAction(params));
    }
    public editWSAlerts(params?: any): void {
        this.appState$.dispatch(new WSAlertAction.EditAlertAction(params));
    }
    public deleteWSAlerts(params?: any): void {
        this.appState$.dispatch(new WSAlertAction.DeleteAlertAction(params));
    }
    // ====================================================================
    /**
     * Reset State Actions
     */
    public wsAlertResetState(params?: any): void {
        this.appState$.dispatch(new WSAlertAction.WSAlertResetAction());
    }
    public wsDeviceResetState(params?: any): void {
        this.appState$.dispatch(new WSDeviceAction.WSDeviceResetAction());
    }
}
