import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TrafficLoggerDevicesApiClient } from '../../services/traffic-logger-device-api-client.service';

import { TrafficSocketAPI } from '../../services/traffic-socket.service';
import * as actions from '../actions/traffic-logger-sync.actions';
import * as actionCallApi from '../actions/traffic-logger-call-api-sync.actions';

@Injectable()
export class TrafficLoggerDevicesSyncEffects {
    constructor(
        private actions$: Actions,
        private trafficLoggerSyncApiClient: TrafficLoggerDevicesApiClient,
        private trafficSocket: TrafficSocketAPI,
    ) {

    }

    @Effect()
    loadTrafficLoggerDevicesSyncList$ = this.actions$
        .ofType(actionCallApi.TrafficLoggerCallApiSyncTypes.LoadTrafficLoggerCallApiSyncTypes.LOAD)
        .pipe(
            map((action: actionCallApi.LoadTrafficLoggerCallApiSyncAction) => action.payload),
            switchMap((state) => {
                return this.trafficLoggerSyncApiClient.loadTrafficLoggerSync(state.type, state.reqId).pipe(
                    map(
                        initData => {
                            return new actionCallApi.LoadSuccessTrafficLoggerCallApiSyncAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actionCallApi.LoadFailTrafficLoggerCallApiSyncAction(error))
                    ));
            })
        );

    @Effect()
    loadTrafficLoggerDevicesSocketList$ = this.actions$
        .ofType(actions.TrafficLoggerSyncTypes.LoadTrafficLoggerSyncTypes.LOAD)
        .pipe(
            switchMap((state: any) => {
                return this.trafficSocket.getData(state.payload.reqId).pipe(
                    map(
                        initData => {
                            return new actions.LoadSuccessTrafficLoggerSyncAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailTrafficLoggerSyncAction(error))
                    ));
            })
        );


    @Effect()
    resetDevicesSocket$ = this.actions$
        .ofType(actions.TrafficLoggerResetSyncTypes.TrafficLoggerResetSyncAction)
        .pipe(
            switchMap(() => {
                return this.trafficSocket.actionDestroyAll().pipe(
                    map(
                        initData => {
                            return initData;
                        }
                    ),
                    catchError(error =>
                        of({ error }))
                );
            })
        );

}
