import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthorizeModule } from '@shared/authorize/authorize.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { FooterComponent } from '@shared/layouts/footer/footer.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LayoutsComponent } from './layouts.component';
import { LayoutSandbox } from './layouts.sandbox';
import { LeftSidebarsComponent } from './left-sidebars/left-sidebars.component';
import { AppModule } from '@app/app.module';
import { TopHeaderComponent } from './top-header/top-header.component';
import { SideBarService } from './services/sidebars.service';
import { LayoutsApiClientServices } from './services/layoutsApiClient.services';
import { LayoutsAdapterService } from './services/layoutsAdapter.service';
import { LayoutsRoutingModule } from './layouts-routing.module';


const DxUiModule = [
];

const SHARED_LAYOUT_COMPONENTS = [
   LayoutsComponent,
   LeftSidebarsComponent,
   FooterComponent,
   TopHeaderComponent
];

@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      AppModule,
      FormsModule,
      DxUiModule,
      SimpleNotificationsModule,
      TranslateModule,
      SharedComponentModule,
      AuthorizeModule.forFeature(),
      LayoutsRoutingModule
   ],
   declarations: [SHARED_LAYOUT_COMPONENTS],
   exports: [SHARED_LAYOUT_COMPONENTS],
})

export class LayoutContainersModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: LayoutContainersModule,
         providers: [
            LayoutSandbox,
            LayoutsApiClientServices,
            LayoutsAdapterService,
            SideBarService,
         ]
      };
   }
}
