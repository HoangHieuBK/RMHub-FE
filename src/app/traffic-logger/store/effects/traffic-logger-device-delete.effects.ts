import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TrafficLoggerDevicesApiClient } from '../../services/traffic-logger-device-api-client.service';
import * as actions from '../actions/traffic-logger-device-delete.actions';

@Injectable()
export class TrafficLoggerDevicesDeleteEffects {
    constructor(
        private actions$: Actions,
        private trafficLoggerDevicesApiClient: TrafficLoggerDevicesApiClient,
    ) {

    }

    @Effect()
    loadTrafficLoggerDevicesDeleteList$ = this.actions$
        .ofType(actions.TrafficLoggerDevicesDeleteTypes.LoadTrafficLoggerDevicesDeleteTypes.LOAD)
        .pipe(
            map((action: actions.LoadTrafficLoggerDevicesDeleteAction) => {
                return action.payload;
            }),
            switchMap(state => {
                return this.trafficLoggerDevicesApiClient.loadTrafficLoggerDeviceDelete(state).pipe(
                    map(
                        initData => {
                            return new actions.LoadSuccessTrafficLoggerDevicesDeleteAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailTrafficLoggerDevicesDeleteAction(error))
                    ));
            })
        );

}
