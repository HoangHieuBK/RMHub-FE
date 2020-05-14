import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as wsAlertActions from '../actions/weather-station-alert.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertApiClient } from '@app/weather-stations/services/weather-station-alert-api-client.service';

@Injectable()
export class WSAlertEffects {
    constructor(
        private actions$: Actions,
        private alertAdapterService: AlertApiClient
    ) { }

    /**
    * Alerts list
    */
    @Effect()
    getAlertsData$ = this.actions$
        .ofType(wsAlertActions.WSAlertActionTypes.GetAlertsDataTypes.LOAD)
        .pipe(
            map((action: wsAlertActions.GetAlertsAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.alertAdapterService
                    .getAlerts(queryModel)
                    .pipe(
                        map(data => {
                            return new wsAlertActions.GetAlertsSuccessAction(data);
                        }
                        ),
                        catchError(error =>
                            of(new wsAlertActions.GetAlertsFailAction(error))
                        ));
            }));
    /**
    * add new an Alert
    */
    @Effect()
    addAlertData$ = this.actions$
        .ofType(wsAlertActions.WSAlertActionTypes.AddAlertDataTypes.ADD)
        .pipe(
            map((action: wsAlertActions.AddAlertAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.alertAdapterService
                    .addAlert(queryModel)
                    .pipe(
                        map(data => {
                            return new wsAlertActions.AddAlertSuccessAction(data);
                        }
                        ),
                        catchError(error =>
                            of(new wsAlertActions.AddAlertFailAction(error))
                        ));
            }));
    /**
    * Edit new an Alert
    */
    @Effect()
    editAlertData$ = this.actions$
        .ofType(wsAlertActions.WSAlertActionTypes.EditAlertDataTypes.EDIT)
        .pipe(
            map((action: wsAlertActions.EditAlertAction) => action.payload),
            switchMap((queryModel) => {
                return this.alertAdapterService
                    .editAlert(queryModel, queryModel.id)
                    .pipe(
                        map(data => {
                            return new wsAlertActions.EditAlertSuccessAction(data);
                        }
                        ),
                        catchError(error =>
                            of(new wsAlertActions.EditAlertFailAction(error))
                        ));
            }));
    /**
    * Delete new an Alert
    */
    @Effect()
    deleteAlertData$ = this.actions$
        .ofType(wsAlertActions.WSAlertActionTypes.DeleteAlertDataTypes.DELETE)
        .pipe(
            map((action: wsAlertActions.DeleteAlertAction) => action.payload),
            switchMap((queryModel: any) => {
                return this.alertAdapterService
                    .deleteAlert(queryModel)
                    .pipe(
                        map(data => {
                            return new wsAlertActions.DeleteAlertSuccessAction(data);
                        }
                        ),
                        catchError(error =>
                            of(new wsAlertActions.DeleteAlertFailAction(error))
                        ));
            }));
}
