import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TrafficLoggerAlertApiClient } from '../../services/traffic-alert-api-client.service';
import * as actions from '../actions/traffic-logger-alert-create-actions';

@Injectable()
export class TrafficAlertCreateEffects {
    constructor(
        private actions$: Actions,
        private trafficAlertApiClient: TrafficLoggerAlertApiClient,
    ) {

    }

    @Effect()
    loadTrafficAlertCreate$ = this.actions$
        .ofType(actions.TrafficAlertCreateTypes.LoadTrafficAlertCreateTypes.LOAD)
        .pipe(
            map((action: actions.LoadTrafficAlertCreateAction) => action.payload),
            switchMap(state => {
                return this.trafficAlertApiClient.createTrafficAlert(state).pipe(
                    map(
                        initData => {
                            return new actions.LoadSuccessTrafficAlertCreateAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailTrafficAlertCreateAction(error))
                    ));
            })
        );

}
