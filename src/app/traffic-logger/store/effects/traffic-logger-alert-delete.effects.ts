import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TrafficLoggerAlertApiClient } from '../../services/traffic-alert-api-client.service';
import * as actions from '../actions/traffic-logger-alert-delete.actions';

@Injectable()
export class TrafficAlertDeleteEffects {
    constructor(
        private actions$: Actions,
        private trafficAlertApiClient: TrafficLoggerAlertApiClient,
    ) {

    }

    @Effect()
    loadTrafficAlertDelete$ = this.actions$
        .ofType(actions.TrafficAlertDeleteTypes.LoadTrafficAlertDeleteTypes.LOAD)
        .pipe(
            map((action: actions.LoadTrafficAlertDeleteAction) => action.payload),
            switchMap(state => {
                return this.trafficAlertApiClient.deleteTrafficAlert(state).pipe(
                    map(
                        initData => {
                            return new actions.LoadSuccessTrafficAlertDeleteAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailTrafficAlertDeleteAction(error))
                    ));
            })
        );

}
