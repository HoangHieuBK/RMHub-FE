
import {
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs/Observable';

import { AppConfigService as ConfigService } from '../../../app-config.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
/**
 * Supported @Produces media types
 */
export enum MediaType {
    JSON,
    FORM_DATA
}

@Injectable()
export class WebSocketService {

    public constructor(

        protected configService: ConfigService,
    ) {
    }
    public stompClient: any;
    public subscriptions: Object = {};
    public listStompClient: Object = {};
    public getBaseUrl(): string {
        return this.configService.getConfig().api.baseUrl;
    }

    public getConfigsApi() {
        return this.configService.getConfig().api;
    }

    public getDefaultHeaders(): Object {
        return null;
    }
    public getBaseUrlSocket(): string {
        return this.configService.getConfig().api.baseUrlSocket;
    }

    public getTokens() {
        return localStorage.getItem('user:token');
    }
    public _connect(objOptions: { protocols?: string, options?: Object } = { protocols: '', options: {} }) {

        const urlSocket = this.getBaseUrlSocket();
        const ws = new SockJS(urlSocket, objOptions.protocols, objOptions.options);
        const _stompClient = Stomp.over(ws);
        return _stompClient;
    }
    private errorCallBack(error) {
        setTimeout(() => {
            this._connect();
        }, 5000);
    }
    public _disconnect() {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.disconnect();
        }
        this._disconnectAll();
    }
    public _disconnectAll() {
        for (const key in this.listStompClient) {
            if (this.listStompClient.hasOwnProperty(key)) {
                this.listStompClient[key].disconnect();
            }
        }
        this.listStompClient = {};
    }
    public listenTopic(objOptions: { nameTopic: string, protocols?: string, options?: Object } = { nameTopic: '', protocols: '', options: {} }): Observable<any> {
        const subject = new Subject<any>();
        const _stompClient = this._connect({ protocols: objOptions.protocols, options: objOptions.options });
        const _this = this;
        if (_stompClient) {
            _stompClient.debug = null ;
            _stompClient.connect({}, function (frame) {
                if (_stompClient.connected) {
                    _this.listStompClient[objOptions.nameTopic] = _stompClient;
                    _this.subscriptions[objOptions.nameTopic] = _stompClient.subscribe(objOptions.nameTopic, function (sdkEvent) {
                        subject.next(JSON.parse(sdkEvent.body));
                    });
                }
            });
        }
        return subject.asObservable();
    }
    public destroyListenTopic(nameTopic: string) {
        if (this.subscriptions[nameTopic]) {
            this.subscriptions[nameTopic].unsubscribe();
        }
    }
}
