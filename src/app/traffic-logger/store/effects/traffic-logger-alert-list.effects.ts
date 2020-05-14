import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tryMapPathApi } from '@shared/utilites';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TrafficLoggerAlertApiClient } from '../../services/traffic-alert-api-client.service';
import * as actions from '../actions/traffic-logger-alert-list.actions';

@Injectable()
export class TrafficAlertListEffects {
    constructor(
        private actions$: Actions,
        private trafficAlertApiClient: TrafficLoggerAlertApiClient,
    ) {

    }

    @Effect()
    loadTrafficAlertList$ = this.actions$
        .ofType(actions.TrafficAlertListTypes.LoadTrafficAlertListTypes.LOAD)
        .pipe(
            map((action: actions.LoadTrafficAlertListAction) => action.payload),
            switchMap(state => {
                return this.trafficAlertApiClient.loadTrafficAlertList(state).pipe(
                    map(
                        initData => {
                            return new actions.LoadSuccessTrafficAlertListAction(initData);
                        }
                    ),
                    catchError(error =>
                        of(new actions.LoadFailTrafficAlertListAction(error))
                    ));
            })
        );

}
