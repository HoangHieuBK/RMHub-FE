import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@shared/components/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
   selector: 'rmhub-change-password',
   templateUrl: './change-password.component.html',
   styleUrls: ['./change-password.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent extends BaseComponent implements OnInit, OnDestroy {

   changePwdForm: FormGroup;
   submitted = false;

   get f() { return this.changePwdForm.controls; }

   constructor(
      injector: Injector,
      public router: Router,
      private formbuilder: FormBuilder) {
      super(injector);
   }

   ngOnInit() {
      this.changePwdForm = this.formbuilder.group({
         currentpassword: ['', Validators.required],
         newpassword: ['', Validators.required],
         confirmpassword: ['', Validators.required], password:['',Validators.required]
      });
   }
   ngOnDestroy() {
   }

   onSubmit() {
      this.submitted = true;
   }

   Check(){
      console.log(this.submitted,this.f,this.formbuilder);
      
   }

   toggleShow(event, data) {
      if (data.type === 'password') {
         data.type = 'text';
      } else {
         data.type = 'password';
      }
   }
}
