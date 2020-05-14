import { AppStateAction } from '../../AppAction';
import { type } from '@shared/utilites/utilityHelpers';
import { LoginForm } from '@shared/models';

export const AuthActionTypes = {
  AUTH_ACTION: type('[Auth] Action'),
  DO_LOGIN: type('[Auth] Do Login'),
  DO_LOGIN_SUCCESS: type('[Auth] Do Login Success'),
  DO_LOGIN_FAIL: type('[Auth] Do Login Fail'),
  DO_LOGOUT: type('[Auth] Do Logout'),
  DO_LOGOUT_SUCCESS: type('[Auth] Do Logout Success'),
  DO_LOGOUT_FAIL: type('[Auth] Do Logout Fail'),
  ADD_USER: type('[Auth] Add user'),
  REMOVE_USER: type('[Auth] Remove user'),

  // Load User, Version
  LOAD_USER: type('[Auth] Load User'),
  LOAD_USER_SUCCESS: type('[Auth] Load User Success'),
  LOAD_USER_FAIL: type('[Auth] Load User Fail'),
};
// Auth Load User
export class AuthLoadUser implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_USER;
  constructor(public payload?: any) {
   }
}

export class AuthLoadUserSuccess implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload?: any) {
  }
}

export class AuthLoadUserFail implements AppStateAction {
  readonly type = AuthActionTypes.LOAD_USER_FAIL;
  constructor(public payload?: any) {
  }
}

export class AuthAction implements AppStateAction {
  readonly type = AuthActionTypes.AUTH_ACTION;
  constructor(public payload?: any) { }
}

export class DoLoginAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGIN;
  constructor(public payload?: LoginForm) { }
}

export class DoLoginSuccessAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGIN_SUCCESS;
  constructor(public payload?: any) { }
}

export class DoLoginFailAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGIN_FAIL;
  constructor(public payload?: any) { }
}

export class DoLogoutAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGOUT;
  constructor(public payload?: any) { }
}

export class DoLogoutSuccessAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGOUT_SUCCESS;
  constructor(public payload?: any) { }
}

export class DoLogoutFailAction implements AppStateAction {
  readonly type = AuthActionTypes.DO_LOGOUT_FAIL;
  constructor(public payload?: any) { }
}

export class AddUserAction implements AppStateAction {
  readonly type = AuthActionTypes.ADD_USER;
  constructor(public payload?: any) { }
}

export class RemoveUserAction implements AppStateAction {
  readonly type = AuthActionTypes.REMOVE_USER;
  constructor(public payload?: any) { }
}

export type AuthActions
  = AuthAction
  | DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction
  | AddUserAction
  | RemoveUserAction
  | AuthLoadUser
  | AuthLoadUserSuccess
  | AuthLoadUserFail
  ;
