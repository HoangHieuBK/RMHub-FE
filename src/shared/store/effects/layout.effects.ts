import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
// rxjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, flatMap } from 'rxjs/operators';
//
import * as actions from '../actions/layout.actions';
import { Observable } from 'rxjs';
import { pipe } from '../../../../node_modules/rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as store from '../../store';
import { Router } from '@angular/router';
import { parseMenuItems } from '@shared/utilites/utilityHelpers';
import { LayoutsApiClientServices } from '@shared/layouts/services/layoutsApiClient.services';

@Injectable()
export class LayoutEffects {

  constructor(
    private router: Router,
    private appState$: Store<store.State>,
    private actions$: Actions,
    private layoutsApiClient: LayoutsApiClientServices) { }

  /**
   * Load Search box Action
   */
//   @Effect()
//   getSearchBoxDatas$ =
//     this.actions$.ofType(actions.LayoutActionTypes.LoadSearchBox.LOAD).pipe(
//       map((action: actions.LoadSearchBoxDataAction) => action.payload),
//       switchMap((state) => {
//         return this.layoutsApiClient.LoadSearchBoxDatas().pipe(
//           map(datas => new actions.LoadSearchBoxDataSuccessAction(datas)),
//           catchError(error => of(new actions.LoadSearchBoxDataFailAction()))
//         );
//       })
//     );

  /**
  * Load Menus data Action
  */

//   @Effect()
//   getMenus$ = this.actions$.ofType(actions.LayoutActionTypes.LoadMenu.LOAD).pipe(
//     map((action: actions.LoadMenuAction) => action.payload),
//     switchMap(() => {
//       return this.layoutsApiClient.LoadTopMenuItems().pipe(
//         map((items: any[]) => {
//           const _observables = new Array();
//           for (const item of items) {
//             _observables.push(this.layoutsApiClient
//               .LoadSubMenuItems(item.id)
//               .toPromise());
//           }
//           return new actions.LoadMenuSuccessAction(items);
//         }),
//         catchError(error => of(new actions.LoadMenuFailAction(error)))
//       );
//     }));
}
