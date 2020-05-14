import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components/base.component';
import { Logger } from '@shared/utilites/logger.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const log = new Logger('LoginComponent');
@Component({
   selector: 'rmhub-forgot-password',
   templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit, OnDestroy {
   forgotForm: FormGroup;
   submitted = false;

   constructor(
      injector: Injector,
      public router: Router,
      private formBuilder: FormBuilder) {
      super(injector);
   }

   ngOnInit() {
      this.forgotForm = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]]
      });
   }

   get f() { return this.forgotForm.controls; }

   ngOnDestroy() {
   }

   onSubmit() {
      this.submitted = true;
   }

   onBtnClick(key, email) {
      if (key === 'send') {
         
      } else if (key === 'back') {
         this.router.navigate(['']);
      }
   }
}
