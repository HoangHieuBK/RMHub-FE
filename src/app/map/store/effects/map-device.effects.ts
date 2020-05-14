import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MapApiClient } from '@app/map/services/map-api-client.service';
import * as MapActions from '../actions/map-device.actions';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { tryMapPathApi, tryMapPathApiEncoded } from '@shared/utilites';
import { of, pipe } from 'rxjs';
import { WebSocketAPI } from '@app/map/services/map-web-socket.service';
import { AppConfigService as ConfigService } from 'app-config.service';
import { MapCatApiClient } from '@app/map/services/map-cat-client.service';

@Injectable({
    providedIn: 'root'
})
export class MapEffects {
    constructor(
        private actions$: Actions,
        private mapApiClient: MapApiClient,
        private configService: ConfigService,
        private webSocketAPI: WebSocketAPI,
        private mapCatService: MapCatApiClient,
    ) {

    }

    @Effect()
    MapDeviceData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.MapDataDeviceTypes.LOAD)
        .pipe(
            map((action: MapActions.MapDeviceAction.LoadAction) => action.payload),
            switchMap(state => {
                const query = tryMapPathApi(state);
                return this.mapApiClient.MapDeviceData(query).pipe(
                    map(
                        initData => {

                            return new MapActions.MapDeviceAction.LoadSuccessAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new MapActions.MapDeviceAction.LoadFailAction(error))
                    ));
            })
        );
    @Effect()
    MapTrafficAlertDeviceData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.MapTrafficAlertDeviceTypes.LOAD)
        .pipe(
            switchMap(() => {
                return this.webSocketAPI.getDataAlert().pipe(
                    map(
                        initData => {
                            return new MapActions.MapTrafficAlertDeviceAction.LoadSuccessAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new MapActions.MapTrafficAlertDeviceAction.LoadFailAction(error))
                    ));
            })
        );
    // set location a device on maps
    @Effect()
    setLocationDeviceData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.SetLocationTypes.SET)
        .pipe(
            map((action: MapActions.SetLocationAction.SetAction) => action.payload),
            switchMap((query: any) => {
                return this.mapApiClient
                    .SetLocationDevice(query.position, query.id).pipe(
                        map(
                            initData => {
                                return new MapActions.SetLocationAction.SetSuccessAction(initData);
                            }
                        ),
                        catchError(error =>
                            of(new MapActions.SetLocationAction.SetFailAction(error))
                        ));
            })
        );
    // set location a device on maps
    @Effect()
    searchDeviceData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.SearchDeviceTypes.SEARCH)
        .pipe(
            map((action: MapActions.SearchDeviceAction.SearchAction) => action.payload),
            switchMap((query: any) => {
                const queryModel = tryMapPathApiEncoded(query);
                return this.mapApiClient
                    .SearchDevices(queryModel).pipe(
                        map(
                            initData => {
                                return new MapActions.SearchDeviceAction.SearchSuccessAction(initData);
                            }
                        ),
                        catchError(error =>
                            of(new MapActions.SearchDeviceAction.SearchFailAction(error))
                        ));
            })
        );
    @Effect()
    MapResetState$ = this.actions$
        .ofType(MapActions.MapReset.RESET)
        .pipe(
            mergeMap(() => {
                return this.webSocketAPI.actionDestroyAll().pipe(
                    map(
                        initData => {
                            return initData;
                        }
                    ),
                    catchError(error =>
                        of({ error })
                    ));
            })
        );
    @Effect()
    MapRefreshDeviceData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.MapRefreshDataDeviceTypes.LOAD)
        .pipe(
            map((action: MapActions.MapRefreshDeviceAction.LoadAction) => action.payload),
            switchMap(state => {
                const query = tryMapPathApi(state);
                return this.mapApiClient.MapDeviceData(query).pipe(
                    map(
                        initData => {

                            return new MapActions.MapRefreshDeviceAction.LoadSuccessAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new MapActions.MapRefreshDeviceAction.LoadFailAction(error))
                    ));
            })
        );
    @Effect()
    MapCatData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.MapCatDataTypes.LOAD)
        .pipe(
            map((action: MapActions.MapCatAction.LoadAction) => action.payload),
            switchMap(state => {
                const query = tryMapPathApi(state.query) || null;
                const body = state.body || {};
                return this.mapCatService.getDataMapCat(query, body).pipe(
                    map(
                        initData => {

                            return new MapActions.MapCatAction.LoadSuccessAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new MapActions.MapCatAction.LoadFailAction(error))
                    ));
            })
        );
    @Effect()
    MapWeatherAlertDeviceData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.MapWeatherAlertDeviceTypes.LOAD)
        .pipe(
            switchMap(() => {
                return this.webSocketAPI.getWeatherDataAlert().pipe(
                    map(
                        initData => {
                            return new MapActions.MapWeatherAlertDeviceAction.LoadSuccessAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new MapActions.MapWeatherAlertDeviceAction.LoadFailAction(error))
                    ));
            })
        );
    @Effect()
    MapDeviceTechnicalData$ = this.actions$
        .ofType(MapActions.MapDeviceTypes.MapDeviceTechnicalTypes.LOAD)
        .pipe(
            switchMap(() => {
                return this.webSocketAPI.getDeviceTechnical().pipe(
                    map(
                        initData => {
                            return new MapActions.MapDeviceTechnicalAction.LoadSuccessAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new MapActions.MapDeviceTechnicalAction.LoadFailAction(error))
                    ));
            })
        );
}
