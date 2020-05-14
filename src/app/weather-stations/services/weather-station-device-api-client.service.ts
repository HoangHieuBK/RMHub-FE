import { Injectable } from '@angular/core';
import { DefaultHeaders, HttpService, GET, Adapter, Path, PUT, Body, POST, DELETE, ViewCatcher } from '@shared/asyncServices/http';
import { WeatherStationDeviceService } from './weather-station-device.service';
import { Observable } from 'rxjs';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class RmhubWeatherApiClient extends HttpService {

    @GET('/devices{query}')
    @Adapter(WeatherStationDeviceService.getWSDevicesAdapter)
    public getWSDevices(@Path('query') query: any): Observable<any> {
        return null;
    }
    @GET('/devices/sync{query}')
    @Adapter(WeatherStationDeviceService.getWSDevicesMivisuAdapter)
    public getWSDevicesMivisu(@Path('query') query: any): Observable<any> {
        return null;
    }
    @GET('/devices/{id}')
    @ViewCatcher()
    @Adapter(WeatherStationDeviceService.detailWSDeviceAdapter)
    public detailWSDevice(@Path('id') query: any): Observable<any> {
        return null;
    }
    @DELETE('/devices/{id}')
    @Adapter(WeatherStationDeviceService.deleteWSDeviceAdapter)
    public deleteWSDevice(@Path('id') query: any): Observable<any> {
        return null;
    }
}
