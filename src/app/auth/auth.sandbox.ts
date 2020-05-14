import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as authActions from '@shared/store/actions/auth.actions';
import { User } from '@shared/models/auth/user.model';
import {
  UtilService,
  ValidationService,
  tryParseJwt
} from '@shared/utilites';
import {
  LoginForm
} from '@shared/models';
import { isArray } from 'util';
import { Logger } from '@shared/utilites/logger.service';

const log = new Logger('AuthSandbox');

@Injectable()
export class AuthSandbox extends Sandbox {

  public loginLoading$ = this.appState$.select(store.getAuthLoading);
  public loginLoaded$ = this.appState$.select(store.getAuthLoaded);
  public loggedUser$ = this.appState$.select(store.getLoggedUser);
  public LoadXUser$ = this.appState$.select(store.getXUsers);
  public LoadUserRight$ = this.appState$.select(store.getUserRight);
  public LoadMultipleXUsers$ = this.appState$.select(store.getMultipleXUsers);
  public getLoginError$ = this.appState$.select(store.getLoginError);

  private subscription: Subscription = new Subscription();
  private subLoadXUser: Subscription;
  private readonly xUserKey: string = 'user:Xuser';
  private readonly userFirstNameKey: string = 'user:firstName';
  private readonly userLastNameKey: string = 'user:lastName';
  private readonly userRightKey: string = 'user:right';

  constructor(
    protected appState$: Store<store.State>,
    private router: Router,
    private utilService: UtilService,
    public validationService: ValidationService
  ) {
    super(appState$);
  }

  /**
   * Dispatches login action
   *
   * @param form
   */
  public login(form: any): void {
    this.appState$.dispatch(new authActions.DoLoginAction(new LoginForm(form)));

  }
  // Load information user
  public LoadXUser(parmas): void {
    this.appState$.dispatch(new authActions.AuthLoadUser(parmas));
  }
  // getConfigsToken
  public getConfigsToken() {
    return this.utilService.getConfig('tokens');
  }

  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscription.unsubscribe();
  }

  /**
   * Registers events
   */
  public registerAuthEvents(): void {
    // Subscribes to logged user data and save/remove it from the local storage
    this.subscription.add(this.loggedUser$.subscribe((user: User) => {
      if (user.isLoggedIn) {
        User.save(user);
        const userInfo: any = tryParseJwt(user.access_token);
        localStorage.setItem('user:userId', userInfo.sub);
        localStorage.setItem('user', userInfo.LogonName);
        this.LoadXUser(userInfo.LogonName);
      }
    }));
    this.subscription.add(
      this.LoadXUser$.subscribe((xUser: any) => {
        if (xUser) {
          sessionStorage.setItem(this.xUserKey, JSON.stringify(xUser));
          localStorage.setItem(this.xUserKey, JSON.stringify(xUser));
          if (xUser && xUser[0] && xUser[0].userID) {
            localStorage.setItem(this.userFirstNameKey, xUser[0]['firstName']);
            localStorage.setItem(this.userLastNameKey, xUser[0]['lastName']);
          }
        }
      })
    );

    this.subscription.add(
      this.LoadUserRight$.subscribe(userRight => {
        if (userRight && isArray(userRight)) {
          sessionStorage.setItem(this.userRightKey, JSON.stringify(userRight));
          localStorage.setItem(this.userRightKey, JSON.stringify(userRight));
        }
      })
    );
  }

  /**
   * redirect to fall navigator page
   */
  public redirectToFallNavigator() {
    if (this.router.url === this.utilService.getConfig('page').login) {
      return this.router.navigate([this.utilService.getConfig('page').fallnavigator]);
    }
  }

  /**
   * Clear store after logout for auth Sandbox
   */
  private clearStore(): void {
    // clear state appState
    store.getLoggedUser.release();
  }
}
