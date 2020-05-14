import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { UserForm} from '@app/auth/models';

import { User } from '@shared/models';
import { AppEntityCustomState } from '@shared/AppAction';

interface UserLogin extends AppEntityCustomState<UserForm, string> {
}

export interface State {
  user: User;
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  error: any;
  userLogin: UserLogin;
  userRight: any;
  multiplexusers: any;
  version: any;
  linkiBan: any;
}

export const initialState: State = {
  user: new User(),
  loading: false,
  loaded: false,
  failed: false,
  error: null,
  userLogin: {
    loading: false,
    loaded: false,
    failed: false,
    data: null
  },
  userRight: {},
  multiplexusers: {},
  version: undefined,
  linkiBan: undefined
};

export function reducer(state = initialState, action: AuthActions): State {
  if (!action) { return state; }
  switch (action.type) {

    case AuthActionTypes.AUTH_ACTION:
      return state;

    case AuthActionTypes.LOAD_USER: {

      return Object.assign({}, state, {
        userLogin: {
          loading: true,
          loaded: false,
          failed: false
        }
      });
    }

    case AuthActionTypes.LOAD_USER_SUCCESS: {
      return Object.assign({}, state, {
        userLogin: {
          loading: false,
          loaded: true,
          failed: false,
          data: action.payload
        }
      });
    }

    case AuthActionTypes.LOAD_USER_FAIL: {
      return Object.assign({}, state, {
        userLogin: {
          loading: false,
          loaded: true,
          failed: true,
          data: action.payload
        }
      });
    }
    
    // REDUCER DO LOGIN
    case AuthActionTypes.DO_LOGIN: {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }

    case AuthActionTypes.DO_LOGOUT: {
      return state;
    }

    case AuthActionTypes.DO_LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user: new User(),
        loading: false,
        loaded: true,
        failed: false
      });
    }

    case AuthActionTypes.DO_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
        user: action.payload,
        error: null
      });
    }

    case AuthActionTypes.DO_LOGIN_FAIL: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: true,
        error: action.payload
      });
    }
    // THE END REDUCER DO LOGIN
    case AuthActionTypes.ADD_USER: {
      return Object.assign({}, state, { user: action.payload });
    }

    case AuthActionTypes.REMOVE_USER: {
      return Object.assign({}, state, { user: action.payload });
    }

    default:
      return state;
  }
}

export const selectLoggedUser = (state: State) => state.user;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getFailed = (state: State) => state.failed;
export const getLoginError = (state: State) => state.error;

export const getVersion = (state: State) => state.version.loading;

export const getXUsers = (state: State) => state.userLogin.data;
export const getUserRight = (state: State) => state.userRight.userXRight;
export const getMultipleXUsers = (state: State) => state.multiplexusers.multipleXUsers;

export const getLinkIBan = {
  getDatas: (state: State) => state.linkiBan.user,
  getLoading: (state: State) => state.linkiBan.loading,
  getLoaded: (state: State) => state.linkiBan.loaded,
  getFailed: (state: State) => state.linkiBan.failed
};
