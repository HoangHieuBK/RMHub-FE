import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, PUT, Body } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';
import { MapService } from './map.service';
import { MapAdapterService } from './map-device-adapter';


@Injectable({
    providedIn: 'root'
})
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class MapApiClient extends HttpService {

    @GET('/devices/map{query}')
    @Adapter(MapService.MapDeviceAdapter)
    public MapDeviceData(@Path('query') query?: any): Observable<any> {
        return null;
    }
    @PUT('/devices/{id}/set_location')
    @Adapter(MapAdapterService.SetLocationAdapter)
    public SetLocationDevice(@Body body: any, @Path('id') query?: any): Observable<any> {
        return null;
    }
    @GET('/devices/search{query}')
    @Adapter(MapAdapterService.SearchDeviceAdapter)
    public SearchDevices(@Path('query') query?: any): Observable<any> {
        return null;
    }
}
