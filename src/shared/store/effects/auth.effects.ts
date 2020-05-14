import { Injectable } from '@angular/core';
// rsjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
//
import * as actions from '../actions/auth.actions';
import { AuthApiClientService } from '../../../app/auth/auth-api-client.service';
import { LoginForm, User } from '@shared/models';
import { UserForm } from '@app/auth/models/xuser.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authApiClient: AuthApiClientService) { }

  /**
    * Login effect
    */
  @Effect()
  doLogin$ =
    this.actions$.ofType(actions.AuthActionTypes.DO_LOGIN).pipe(
      map((action: actions.DoLoginAction) => action.payload),
      switchMap((state: LoginForm) => {
        const urlSearchParams: URLSearchParams = new URLSearchParams();
        urlSearchParams.append('username', state.username);
        urlSearchParams.append('password', state.password);
        urlSearchParams.append('client_id', state.client_id);
        urlSearchParams.append('client_secret', state.client_secret);
        urlSearchParams.append('grant_type', state.grant_type);
        urlSearchParams.append('scope', state.scope);
        return this.authApiClient.login(urlSearchParams.toString()).pipe(
          map(user => new actions.DoLoginSuccessAction(new User(user))),
          catchError(error => of(new actions.DoLoginFailAction(error)))
        );
      })
    );
  // /**
  //  * load User
  //  */
  // @Effect()
  // loadUser$ = this.actions$
  //   .ofType(actions.AuthActionTypes.LOAD_USER)
  //   .pipe(
  //     map((actions: actions.AuthLoadUser) => actions.payload),
  //     switchMap((parmas: number) => {
  //       return this.authApiClient.getUser(parmas).pipe(
  //         map(user => new actions.AuthLoadUserSuccess(new UserForm(user))),
  //         catchError(error => of(new actions.AuthLoadUserFail(error)))
  //       );
  //     })
  //   )
  /**
   * Logout effect
   */
  @Effect()
  doLogout$ =
    this.actions$.ofType(actions.AuthActionTypes.DO_LOGOUT).pipe(
      map((action: actions.DoLogoutAction) => action.payload),
      switchMap(() => {
        return this.authApiClient.logout().pipe(
          map(() => new actions.DoLogoutSuccessAction()),
          catchError(error => of(new actions.DoLogoutFailAction(error)))
        );
      })
    );

  @Effect({ dispatch: false })
  doLogoutSuccess$ = this.actions$
    .ofType(actions.AuthActionTypes.DO_LOGOUT_SUCCESS)
    .pipe(
      // map((action: actions.DoLogoutSuccessAction) => action.payload),
      map(() => {
        User.remove();
        window.location.assign('/');
        return;
      })
    );
}
