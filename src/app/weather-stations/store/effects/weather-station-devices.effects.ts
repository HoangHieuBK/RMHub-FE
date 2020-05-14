import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as wsDeviceActions from '../actions/weather-station-deivces.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RmhubWeatherApiClient } from '@app/weather-stations/services/weather-station-device-api-client.service';
import { tryMapPathApi, tryMapPathApiEncoded } from '@shared/utilites';
import { WeatherStationSocketService } from '@app/weather-stations/services/weather-station-socket.service';

@Injectable()
export class WSDeviceEffects {
    constructor(
        private actions$: Actions,
        private weatherApiClient: RmhubWeatherApiClient,
        private weatherStationSocketService: WeatherStationSocketService
    ) { }

    /**
     * Weather list
     */
    @Effect()
    getWeatherData$ = this.actions$
        .ofType(wsDeviceActions.WSDeviceActionTypes.GetWSDeviceDataTypes.LOAD)
        .pipe(
            map((action: wsDeviceActions.GetWSDeviceAction) => action.payload),
            switchMap((queryModel: any) => {
                const query = tryMapPathApiEncoded(queryModel); // transform object to path string
                return this.weatherApiClient
                    .getWSDevices(query)
                    .pipe(
                        map(data => new wsDeviceActions.GetWSDeviceSuccessAction(data)),
                        catchError(error =>
                            of(new wsDeviceActions.GetWSDeviceFailAction(error))
                        )
                    );
            })
        );
    /**
     * get ws device from mivisu
     */
    @Effect()
    getWSDevicesMivisuData$ = this.actions$
        .ofType(wsDeviceActions.WSDeviceActionTypes.GetWSDeviceMivisuDataTypes.LOAD)
        .pipe(
            map((action: wsDeviceActions.GetWSDeviceMivisuAction) => action.payload),
            switchMap((queryModel: any) => {
                const query = tryMapPathApi(queryModel);
                return this.weatherApiClient
                    .getWSDevicesMivisu(query)
                    .pipe(
                        map(data => new wsDeviceActions.GetWSDeviceMivisuSuccessAction(data)),
                        catchError(error =>
                            of(new wsDeviceActions.GetWSDeviceMivisuFailAction(error))
                        )
                    );
            }),
        );


    /**
     * get ws device from Socket
     */
    @Effect()
    getWSDevicesSocketData$ = this.actions$
        .ofType(wsDeviceActions.WSDeviceActionTypes.GetWSDeviceSocketDataTypes.LOAD)
        .pipe(
            map((action: wsDeviceActions.GetWSDeviceSocketAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.weatherStationSocketService
                    .getWSDeviceFromSocket(queryModel.requestId)
                    .pipe(
                        map(data => {
                            return new wsDeviceActions.GetWSDeviceSocketSuccessAction(data);
                        }),
                        catchError(error =>
                            of(new wsDeviceActions.GetWSDeviceSocketFailAction(error))
                        )
                    );
            })
        );
    /**
     * get detail of an device
     */
    @Effect()
    detailWSDeviceData$ = this.actions$
        .ofType(wsDeviceActions.WSDeviceActionTypes.DetailWSDeviceDataTypes.GET)
        .pipe(
            map((action: wsDeviceActions.DetailWSDeviceAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.weatherApiClient
                    .detailWSDevice(queryModel)
                    .pipe(
                        map(data => new wsDeviceActions.DetailWSDeviceSuccessAction(data)),
                        catchError(error =>
                            of(new wsDeviceActions.DetailWSDeviceFailAction(error))
                        )
                    );
            })
        );
    /**
    * delete ws Device
    */
    @Effect()
    deleteWSDeviceData$ = this.actions$
        .ofType(wsDeviceActions.WSDeviceActionTypes.DeleteWSDeviceDataTypes.DELETE)
        .pipe(
            map((action: wsDeviceActions.DeleteWSDeviceAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.weatherApiClient
                    .deleteWSDevice(queryModel)
                    .pipe(
                        map(data => new wsDeviceActions.DeleteWSDeviceSuccessAction(data)),
                        catchError(error =>
                            of(new wsDeviceActions.DeleteWSDeviceFailAction(error))
                        )
                    );
            })
        );
    @Effect()
    MapResetState$ = this.actions$
        .ofType(wsDeviceActions.WSDeviceActionTypes.WSDeviceStateTypes.RESET_STATE)
        .pipe(
            mergeMap(() =>
                this.weatherStationSocketService.disconnectSocket().pipe(
                    map(
                        initData => {
                            return initData;
                        }
                    )
            )
        ));

}
