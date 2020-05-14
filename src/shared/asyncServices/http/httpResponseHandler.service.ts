import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@shared/models';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { isString, isUndefined } from 'util';

import { AppConfigService as ConfigService } from './../../../app-config.service';

@Injectable()
export class HttpResponseHandler {
  constructor(
    private router: Router,
    private translateService: TranslateService,
    public notificationsService: NotificationsService,
    private configService: ConfigService
  ) { }

  /**
   * Global http error handler.
   *
   * @param error
   * @param source
   * @returns {ErrorObservable}
   */
  public onCatch(response: any, source: Observable<any>): Observable<any> {
    if (isUndefined(response.status)) {
      this.handleRequestFailed();
    }
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden();
        break;

      case 404:
        this.handleNotFound();
        break;

      case 500:
        this.handleHttpStatus(response);
        break;

      case 0:
        this.handleRequestFailed();
        break;
      case 502:
      case 504:
        this.handleBadGatewayError();
        break;
      default:
        break;
    }

    throw response;
  }

  public onCatchInView(response: any, source: Observable<any>): Observable<any> {
    throw response;
  }

  public LoginError(response: any, source: Observable<any>): Observable<any> {
    throw response;
  }


  /**
 * Shows notification errors when server response status is 401
 *
 * @param error
 */
  private handleBadRequestLogin(responseBody: any): void {
    if (responseBody._body) {
      try {
        this.showNotificationError('Username / password wrong.');
      } catch (error) {
        this.handleHttpStatus(responseBody);
      }
    }
    // tslint:disable-next-line:one-line
    else {
      this.handleHttpStatus(responseBody);
    }
    if (this.router.url === this.configService.getConfig().page.login) {
      setTimeout(() => window.location.reload(), 3000);
    }
  }

  /**
   * Shows notification errors when has some errors, which is responsed from server
   *
   * @param responseBody
   */
  private handleRequestFailed(): void {
    this.showNotificationError(this.translateService.instant('ResponseHandler.RequestError'));
  }
  /**
   * Shows notification errors when server response status is 400
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): void {
    this.showNotificationError(this.translateService.instant('ResponseHandler.HttpStatus400'));
  }

  /**
   * Shows notification errors when server response status is 401 and redirects user to login page
   *
   * @param responseBody
   */
  private handleUnauthorized(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    let unauthorizedEndpoints: Array<string> = this.configService.getConfig().notifications.unauthorizedEndpoints;

    unauthorizedEndpoints = unauthorizedEndpoints.filter(endpoint => this.getRelativeUrl(responseBody.url) === endpoint);

    if (unauthorizedEndpoints.length) {
      this.showNotificationError(this.translateService.instant('ResponseHandler.HttpStatus401'));
    }
    this.redirectToLogin();
  }

  /**
   * Shows notification errors when server response status is 403
   */
  private handleForbidden(): void {
    this.showNotificationError(this.translateService.instant('ResponseHandler.HttpStatus403'));
  }

  /**
   * Shows notification errors when server response status is 404
   *
   * @param responseBody
   */
  private handleNotFound(): void {
    this.showNotificationError(this.translateService.instant('ResponseHandler.HttpStatus404'));
  }

  /**
   * Shows notification errors when server response status is 500
   */
  private handleHttpStatus(responseBody: any): void {
    this.showNotificationError(responseBody.statusText);
  }

  /**
   * Shows notification errors when server response status is 502, 0
   */
  private handleBadGatewayError(): void {
    const message = this.translateService.instant('ResponseHandler.HttpStatus502');
    this.showNotificationError(message);
  }

  /**
   * Parses server response and shows notification errors with translated messages
   *
   * @param response
   */
  private handleErrorMessages(response: any): void {
    // tslint:disable-next-line:curly
    if (!response) return;

    if (isString(response)) {
      return this.showNotificationError(response);
    }

    for (const key of Object.keys(response)) {
      if (Array.isArray(response[key])) {
        response[key].forEach((value) => this.showNotificationError(this.getTranslatedValue(value)));
      }
      // tslint:disable-next-line:one-line
      else {
        this.showNotificationError(this.getTranslatedValue(response[key]));
      }
    }
  }

  /**
   * Extracts and returns translated value from server response
   *
   * @param value
   * @returns {string}
   */
  private getTranslatedValue(value: string): string {
    if (value.indexOf('[') > -1) {
      const key = value.substring(value.lastIndexOf('[') + 1, value.lastIndexOf(']'));
      value = this.translateService.instant(key);
    }
    return value;
  }

  /**
   * Returns relative url from the absolute path
   *
   * @param responseBody
   * @returns {string}
   */
  private getRelativeUrl(url: string): string {
    return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '').split('?')[0];
  }

  /**
   * Shows error notification with given title and message
   *
   * @param title
   * @param message
   */
  public showNotificationError(message: string): void {
    this.notificationsService.error(this.translateService.instant('ResponseHandler.Title'), message, this.configService.getConfig().notifications.options);
  }

  private redirectToLogin() {
    localStorage.clear();
    User.remove();
    window.location.assign('/');
    // this.router.navigate([this.configService.getConfig().page.login]);
  }
}
