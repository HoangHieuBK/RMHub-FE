import { Injectable } from '@angular/core';
import { User } from '../../shared/models';
import { UserForm } from './models/xuser.model';
@Injectable()
export class AuthService {

  constructor() { }

  /**
 *  response keys
 *
 * @param user
 */
  // tslint:disable-next-line:member-ordering
  static authAdapter(user: User): any {
    return Object.assign({}, user, { access_token: user.access_token });
  }

  static logoutAdapter(user?: Pick<any, any>): any {
    return Object.assign({}, user);
  }
    /**
   *  load Multiple XUsers Adapter Service
   */
  static loaXUsersAdapter(logonName: any): UserForm {
    return logonName.map(item => new UserForm(item));
    // return Object.assign({}, user);
  }
}
