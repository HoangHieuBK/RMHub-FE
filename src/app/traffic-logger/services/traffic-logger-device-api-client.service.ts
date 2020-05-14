import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, Query, ViewCatcher, DELETE, POST, PUT, Body } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { TrafficLoggerDevicesService } from './traffic-logger-devices.service';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class TrafficLoggerDevicesApiClient extends HttpService {

    protected getBaseUrl() {
        return this.configService.getConfig().api.serverDevice;
    }

    // api get list TL device
    @GET('/devices{id}&deploymentId=1')
    @Adapter(TrafficLoggerDevicesService.TrafficLoggerDevicesListAdapter)
    public loadTrafficLoggerDevicesList(@Path('id') query: any): Observable<any> {
        return null;
    }


    // api sync TL device
    @GET('/devices/sync?deviceType={id}&requestId={name}&deploymentId=1')
    @Adapter(TrafficLoggerDevicesService.TrafficLoggerSyncAdapter)
    public loadTrafficLoggerSync(@Path('id') query: any, @Path('name') name: any): Observable<any> {
        return null;
    }


    // api get detail TL device
    @GET('/devices/{id}')
    @ViewCatcher()
    @Adapter(TrafficLoggerDevicesService.TrafficLoggerDeviceDetailAdapter)
    public loadTrafficLoggerDeviceDetail(@Path('id') query: any): Observable<any> {
        return null;
    }

    // api delete TL device
    @DELETE('/devices/{id}')
    @Adapter(TrafficLoggerDevicesService.TrafficLoggerDeviceDeleteAdapter)
    public loadTrafficLoggerDeviceDelete(@Path('id') query: any): Observable<any> {
        return null;
    }

}
