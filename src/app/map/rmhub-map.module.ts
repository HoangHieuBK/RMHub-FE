import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { MapRoutingModule } from './rmhub-map-routing.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { RMHubMapsModule } from './screens/maps/maps.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MapReducers } from './store';
import { MapEffects } from './store/effects/map-device.effects';
import { MapSandbox } from './map.sandbox';
import { CommonConstant } from '@shared/common/constant.common';
import { WebSocketAPI } from './services/map-web-socket.service';
import { MapCatApiClient } from './services/map-cat-client.service';
/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {};


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NotifierModule.withConfig(customNotifierOptions),
        StoreModule.forFeature(CommonConstant.CONSTANT_STORE.mapStore, MapReducers),
        EffectsModule.forFeature([MapEffects]),
        SharedComponentModule,
        MapRoutingModule,
        RMHubMapsModule,
    ],
    declarations: [],
    providers: [MapSandbox, WebSocketAPI, MapCatApiClient],
    exports: []
})
export class RmhubMapManagetmentModule { }
