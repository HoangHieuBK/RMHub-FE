import { tryParseJwt, tryParseJSON } from '@shared/utilites';
const userLoginedKey = 'user:logined';
const userTokenKey = 'user:token';
const userInfoKey = 'user:userInfo';
const userIdKey = 'user:userId';
const userKey = 'user';
const userFullNameKey = 'user:name';
const userRightKey = 'user:right';
const selectActionsKey = 'select:actions';

interface IUser {
  access_token?: string;
  expires_in?: any;
  isLoggedIn?: boolean;
  token_type?: string;
}

class User implements IUser {
  access_token?: string;
  expires_in?: any;
  isLoggedIn?: boolean;
  token_type?: string;
  constructor(user?: User) {
    this.access_token = user ? user.access_token : null;
    this.isLoggedIn = Boolean(this.access_token);
    this.token_type = user ? user.token_type : '';
    this.expires_in = user ? user.expires_in : null;
  }
  /**
   * Saves user into local storage
   * @param user
   */
  public static save(user?: IUser): void {
    const userInfo: any = tryParseJwt(user.access_token);
    localStorage.setItem(userLoginedKey, JSON.stringify(user));
    localStorage.setItem(userTokenKey, user.access_token);
    localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
    localStorage.setItem(userIdKey, userInfo['sub']);
    localStorage.setItem(userKey, userInfo['LogonName']);
    localStorage.setItem(userFullNameKey, userInfo['Name']);
  }

  /**
   * Clear user from local storage/Session Storege
   */
  public static remove(): void {
    localStorage.removeItem(userLoginedKey);
    localStorage.removeItem(userTokenKey);
    localStorage.removeItem(userInfoKey);
    localStorage.removeItem(userIdKey);
    localStorage.removeItem(userKey);
    localStorage.removeItem(userFullNameKey);
    localStorage.removeItem(userRightKey);
    localStorage.removeItem(selectActionsKey);
  }

  /**
   * @param rightData objects array role from server
   */
  public static addRoles(rightData: any[]) {
    const rights = {};
    rightData.forEach(right => (rights[right.className] = right));
    localStorage.setItem(userRightKey, JSON.stringify(rights));
    return rights;
  }

  /**
   * @returns list roles user logined
   */
  public static getRoles() {
    return tryParseJSON(localStorage.getItem(userRightKey)) || null;
  }
}

export {
  userLoginedKey,
  userTokenKey,
  userInfoKey,
  userIdKey,
  userKey,
  userFullNameKey,
  userRightKey,
  selectActionsKey,
  IUser,
  User
};
