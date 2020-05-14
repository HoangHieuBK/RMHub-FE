import { BehaviorSubject, Observable } from 'rxjs';
import { WebSocketService } from '@shared/asyncServices/web-socket';
import { Injectable } from '@angular/core';
@Injectable()
export class TrafficSocketAPI extends WebSocketService {

    public getData(requestId?: any): Observable<any> {
        return this.listenTopic({
            nameTopic: '/user/queue/sync-devices', options: {
                sessionId: () => {
                    return requestId;
                },
            }
        });
    }
    public actionDestroyAll(): Observable<any> {
        for (const key in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(key)) {
                this.subscriptions[key].unsubscribe();
            }
        }
        this._disconnect();
        return new Observable<any>();
    }

    public destroyAction() {
        this._disconnect();
    }
    public destroyListen() {
        this.destroyListenTopic('/user/queue/sync-devices');
    }

}
