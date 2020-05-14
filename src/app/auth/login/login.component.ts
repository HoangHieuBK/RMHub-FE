import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthSandbox } from '@app/auth/auth.sandbox';
import { BaseComponent } from '@shared/components/base.component';
import {
   ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpErrorResponse } from '@angular/common/http';
import { isArray } from 'util';
import { isObject, tryParseJSON } from '@shared/utilites';
import { Logger } from '@shared/utilites/logger.service';
import { LoginForm } from '@shared/models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';

const log = new Logger('LoginComponent');

@Component({
   selector: 'rmhub-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
   submitted = false;
   popupVisible = false;
   userName: AbstractControl;
   password: AbstractControl;
   loginForm: FormGroup;
   copyRightName: number;
   listUserPrimaryKey: any;
   displayExpr: string;
   userNameValue: string;
   xUser: any;
   public error: number;
   user: User;

   private readonly userNameKey = 'userNameCookie';
   private readonly userLoginKey = 'user:userLogonCookie';

   private subscription: Subscription = new Subscription();

   constructor(
      injector: Injector,
      private formBuilder: FormBuilder,
      public router: Router,
      public authSandbox: AuthSandbox,
      private userService: UserService) {
      super(injector);
   }


   get f() { return this.loginForm.controls; }

   onSubmit() {
      this.submitted = true;
      this.onLogin(this.loginForm.value.email, this.loginForm.value.password)
   }

   onLogin(username: string, password: string) {
      this.user = {
         username: username,
         password: password
      };

      if (username === this.user.username && password === this.user.password) {
         localStorage.setItem('user', JSON.stringify(this.user));
         if (this.userService.getUser().timer === 0) {
            this.userService.getUser().timer = this.userService.timeOut;
         }
         this.userService.countDown();
         this.router.navigate(['map']);
      } else {
         this.error = -1;
      }
   }

   initForm() {
      this.loginForm = this.formBuilder.group({
         email: ['', Validators.required],
         // email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required]
      });
   }

   checkLogin() {
      if (localStorage.getItem('user')) {
         this.router.navigate(['map']);
      }
   }

   ngOnInit() {
      this.initForm();
      this.checkLogin();
   }
   ngOnDestroy() {
   }

   toggleShow(event, data) {
      if (data.type === 'password') {
         data.type = 'text';
      } else {
         data.type = 'password';
      }
   }
}
