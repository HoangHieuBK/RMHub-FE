import {
  Observable,
  of
} from 'rxjs';
import {
  Injectable
} from '@angular/core';
import {
  HttpService,
  Adapter,
  GET, Path
} from '@shared/asyncServices/http';
import {
  AuthService as authService
} from './auth.service';
import {
  Headers,
  RequestOptionsArgs
} from '@angular/http';

@Injectable()
export class AuthApiClientService extends HttpService {

  /**
 * Submits login form to the server
 *
 * @param form
 */
  @Adapter(authService.authAdapter)
  public login(searchParams: any): Observable<any> {
    const options: RequestOptionsArgs = {
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }),
    };
    return this.responseInterceptorLoginError(this.http.post(`${this.getConfigsApi().baseUrlToken}/connect/token`, searchParams, options));
  }
  /**
   * Get Multiple XUsers if User
   */
  @GET('api/Main/XUser?logonName={parmas}')
  @Adapter(authService.loaXUsersAdapter)
  public getUser(@Path('parmas') parmas: any): Observable<any> {
    return null;
  }
  /**
   * Logs out current user
   */
  public logout(): Observable<any> { return of(null); }
}
