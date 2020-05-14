import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TrafficLoggerDevicesApiClient } from '../../services/traffic-logger-device-api-client.service';
import * as actions from '../actions/traffic-logger-device-detail.actions';
import { TrafficLoggerService } from '@app/traffic-logger/services/traffic-logger.service';

@Injectable()
export class TrafficLoggerDevicesDetailEffects {
    constructor(
        private actions$: Actions,
        private trafficLoggerDevicesApiClient: TrafficLoggerDevicesApiClient,
        private trafficService: TrafficLoggerService,
    ) {

    }

    @Effect()
    loadTrafficLoggerDevicesDetailList$ = this.actions$
        .ofType(actions.TrafficLoggerDevicesDetailTypes.LoadTrafficLoggerDevicesDetailTypes.LOAD)
        .pipe(
            map((action: actions.LoadTrafficLoggerDevicesDetailAction) => action.payload),
            switchMap(state => {
                return this.trafficLoggerDevicesApiClient.loadTrafficLoggerDeviceDetail(state).pipe(
                    map(
                        initData => {
                            return new actions.LoadSuccessTrafficLoggerDevicesDetailAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailTrafficLoggerDevicesDetailAction(error))
                    ));
            })
        );

}
