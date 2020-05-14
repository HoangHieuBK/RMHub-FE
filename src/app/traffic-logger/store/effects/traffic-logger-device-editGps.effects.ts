import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MapApiClient } from '@app/map/services/map-api-client.service';
import * as EditGPSCoordinateActions from '../actions/traffic-logger-device-editGPS.actions';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class EditGPSCoordinateEffects {
    constructor(
        private actions$: Actions,
        private mapApiClient: MapApiClient,
    ) {

    }
    // set location a device on maps
    @Effect()
    setLocationDeviceData$ = this.actions$
        .ofType(EditGPSCoordinateActions.EditGPSCoordinateTypes.EDIT)
        .pipe(
            map((action: EditGPSCoordinateActions.EditGPSCoordinateAction.EditAction) => action.payload),
            switchMap((query: any) => {
                return this.mapApiClient
                    .SetLocationDevice(query.position, query.id).pipe(
                        map(
                            initData => {
                                return new EditGPSCoordinateActions.EditGPSCoordinateAction.EditSuccessAction(initData);
                            }
                        ),
                        catchError(error =>
                            of(new EditGPSCoordinateActions.EditGPSCoordinateAction.EditFailAction(error))
                        ));
            })
        );
}
