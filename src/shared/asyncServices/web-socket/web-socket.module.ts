import {
  CommonModule
} from '@angular/common';
import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { WebSocketService } from './web-socket.service';

@NgModule()
export class WebSocketServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WebSocketServiceModule,
      providers: [
        WebSocketService,
      ]
    };
  }
}
