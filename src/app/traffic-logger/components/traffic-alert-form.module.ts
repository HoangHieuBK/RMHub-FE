import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { TranslateModule } from '@ngx-translate/core';
import { TrafficAlertFormComponent } from './traffic-alert-form/traffic-alert-form.component';

const components = [
    TrafficAlertFormComponent
];

@NgModule({
    imports: [
        CommonModule,
        SharedComponentModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
    ],
    exports: [TrafficAlertFormComponent],
    declarations: [TrafficAlertFormComponent],
})
export class TrafficAlertFormModule { }
