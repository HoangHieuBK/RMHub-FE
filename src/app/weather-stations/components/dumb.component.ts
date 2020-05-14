import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { AlertSettingFormComponent } from './alert-setting-form/alert-setting-form.component';
import { TranslateModule } from '@ngx-translate/core';

const components = [
    AlertSettingFormComponent
];

@NgModule({
    imports: [
        CommonModule,
        SharedComponentModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
    ],
    exports: [components],
    declarations: [components]
})
export class RMHubDumbComponentModule { }
