import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TrafficLoggerAlertApiClient } from '../../services/traffic-alert-api-client.service';
import * as actions from '../actions/traffic-logger-alert-edit.actions';

@Injectable()
export class TrafficAlertEditEffects {
    constructor(
        private actions$: Actions,
        private trafficAlertApiClient: TrafficLoggerAlertApiClient,
    ) {

    }

    @Effect()
    loadTrafficAlertEdit$ = this.actions$
        .ofType(actions.TrafficAlertEditTypes.LoadTrafficAlertEditTypes.LOAD)
        .pipe(
            map((action: actions.LoadTrafficAlertEditAction) => action.payload),
            switchMap(state => {
                return this.trafficAlertApiClient.editTrafficAlert(state.id, state.body).pipe(
                    map(
                        initData => {
                            return new actions.LoadSuccessTrafficAlertEditAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailTrafficAlertEditAction(error))
                    ));
            })
        );

}
