import { Observable } from 'rxjs';
import { WebSocketService } from '@shared/asyncServices/web-socket';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherStationSocketService extends WebSocketService {

    public getWSDeviceFromSocket(requestId: any): Observable<any> {
        return this.listenTopic({ nameTopic: '/user/queue/sync-devices', protocols: '', options: {
                sessionId: () => {
                    return requestId;
                }
            }
        });
    }
    public disconnectSocket() {
        this._disconnect();
        this.destroyListenSocket();
        return new Observable<any>();
    }
    public destroyListenSocket() {
        this.destroyListenTopic('/user/queue/sync-devices');
    }

}
