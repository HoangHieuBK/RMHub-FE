
import { BehaviorSubject, Observable } from 'rxjs';
import { WebSocketService } from '@shared/asyncServices/web-socket';
import { Injectable } from '@angular/core';
@Injectable()
export class WebSocketAPI extends WebSocketService {

    public getDataAlert(): Observable<any> {
        return this.listenTopic({ nameTopic: '/traffic/data' });
    }
    public actionDestroyAll(): Observable<any> {
        for (const key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key)) {
                this.subscriptions[key].unsubscribe();
            }
        }
        this._disconnectAll();
        return new Observable<any>();
    }
    public getWeatherDataAlert(): Observable<any> {
        return this.listenTopic({ nameTopic: '/weather/data' });
    }
    public getDeviceTechnical(): Observable<any> {
        return this.listenTopic({ nameTopic: '/technical/data' });
    }
}
