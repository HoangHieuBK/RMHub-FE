import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, Query, ViewCatcher, DELETE, POST, PUT, Body } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { TrafficAlertService } from './traffic-alert-devices.service';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class TrafficLoggerAlertApiClient extends HttpService {

    protected getBaseUrl() {
        return this.configService.getConfig().api.serverTraffic;
    }

    // api get TL alert
    @GET('/alert_rules')
    @Adapter(TrafficAlertService.TrafficAlertListAdapter)
    public loadTrafficAlertList(@Path('query') query: any): Observable<any> {
        return null;
    }

    // api create TL alert
    @POST('/alert_rules')
    @Adapter(TrafficAlertService.TrafficAlertCreateAdapter)
    public createTrafficAlert(@Body body: any): Observable<any> {
        return null;
    }

    // api edit TL alert
    @PUT('/alert_rules/{id}')
    @Adapter(TrafficAlertService.TrafficAlertEditAdapter)
    public editTrafficAlert(@Path('id') queryId: any, @Body body: any): Observable<any> {
        return null;
    }


    // api delete TL alert
    @DELETE('/alert_rules/{id}')
    @Adapter(TrafficAlertService.TrafficAlertDeleteAdapter)
    public deleteTrafficAlert(@Path('id') queryId: any): Observable<any> {
        return null;
    }
}
