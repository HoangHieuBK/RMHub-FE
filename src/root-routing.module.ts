import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { LayoutsComponent } from '@shared/layouts/layouts.component';
import { LoginComponent } from '@app/auth/login/login.component';
import { PageNotFoundComponent } from 'exceptions/page-not-found/page-not-found.component';
import { RmhubMapManagetmentModule } from '@app/map/rmhub-map.module';
import { ForgotPasswordComponent } from '@app/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '@app/auth/change-password/change-password.component';

const appRoutes: Routes = [
   {
      path: '',
      redirectTo: '/map',
      pathMatch: 'full'
   },

   {
      path: 'home',
      component: LayoutsComponent,
      children: [
         { path: '', redirectTo: '/app/map', pathMatch: 'full' },
      ],
      data: { preload: true }
   },
   {
      path: 'login',
      loadChildren: './app/auth/auth.module#AuthModule', // Lazy load auth module
      data: { preload: true }
   },
   {
      path: 'forgotpassword',
      loadChildren: './app/auth/forgot-password/forgot-password.module#ForgotPasswordModule'
   },
   {
      path: 'changepassword',
      loadChildren: './app/auth/change-password/change-password.module#ChangePasswordModule'
   },
   {
      path: '',
      loadChildren: () => LayoutContainersModule,
      data: { preload: true },
      component: LayoutsComponent,
      canActivate: [AuthGuard]
   },
   {
      path: '**',
      loadChildren: './exceptions/exceptions.module#ExceptionsModule',
      data: { preload: true }
   }

];

@NgModule({
   imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
   exports: [RouterModule],
   providers: [AuthGuard, CanDeactivateGuard]
})
export class RootRoutingModule { }
