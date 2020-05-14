import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi, tryMapPathApiEncoded } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TrafficLoggerDevicesApiClient } from '../../services/traffic-logger-device-api-client.service';
import * as actions from '../actions/traffic-logger-devices.actions';
import { TrafficLoggerService } from '@app/traffic-logger/services/traffic-logger.service';

@Injectable()
export class TrafficLoggerDevicesEffects {
    constructor(
        private actions$: Actions,
        private trafficLoggerDevicesApiClient: TrafficLoggerDevicesApiClient,
        private trafficService: TrafficLoggerService,
    ) {

    }

    @Effect()
    loadTrafficLoggerDevicesList$ = this.actions$
        .ofType(actions.TrafficLoggerDevicesTypes.LoadTrafficLoggerDevicesTypes.LOAD)
        .pipe(
            map((action: actions.LoadTrafficLoggerDevicesAction) => {
                return action.payload;
            }),
            switchMap(state => {
                if (typeof state === 'object') {
                    const query = tryMapPathApiEncoded(state);
                    return this.trafficLoggerDevicesApiClient.loadTrafficLoggerDevicesList(query).pipe(
                        map(
                            initData => {
                                return new actions.LoadSuccessTrafficLoggerDevicesAction(initData);
                            }
                        ),
                        catchError(error =>
                            of(new actions.LoadFailTrafficLoggerDevicesAction(error))
                        ));
                }

            })
        );

}
