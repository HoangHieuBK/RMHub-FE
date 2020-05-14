import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppSandbox } from '@app/app.sandbox';
import { AppApiClient } from '@app/appApiClient.service';
import { AppService } from '@app/app.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { RmhubMapManagetmentModule } from './map/rmhub-map.module';
import { CommonConstant } from '@shared/common/constant.common';

export function configLocalizationFactory() {
   const currentLang = localStorage.getItem('currentLang.Culture') || CommonConstant.LocalStorageDefaultLang;
   const lang = currentLang.substring(0, 2);
   return () => {
   };
}

@NgModule({
   declarations: [
   ],
   imports: [
      AppRoutingModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      SharedComponentModule,
      RmhubMapManagetmentModule,
   ]
})
export class AppModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: AppModule,
         providers: [
            {
               provide: APP_INITIALIZER,
               useFactory: configLocalizationFactory,
               multi: true
            },
            AppSandbox,
            AppApiClient,
            AppService
         ],
      };
   }
}

