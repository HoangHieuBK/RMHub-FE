import { Injectable } from '@angular/core';
import { DefaultHeaders, HttpService, GET, Adapter, Path, PUT, Body, POST, DELETE } from '@shared/asyncServices/http';
import { WeatherStationAlertService } from './weather-station-alert.service';
import { Observable } from 'rxjs';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})

export class AlertApiClient extends HttpService {

    protected getBaseUrl() {
        return this.configService.getConfig().api.serverWeather;
    }
    // service api ws alert1
    @GET('/alert_rules?deploymentId=1')
    @Adapter(WeatherStationAlertService.getAlertAdapter)
    public getAlerts(@Path('query') query?: any): Observable<any> {
        return null;
    }
    @POST('/alert_rules?deploymentId=1')
    @Adapter(WeatherStationAlertService.addAlertAdapter)
    public addAlert(@Body body: any): Observable<any> {
        return null;
    }
    @PUT('/alert_rules/{id}?deploymentId=1')
    @Adapter(WeatherStationAlertService.editAlertAdapter)
    public editAlert(@Body body: any, @Path('id') query: any): Observable<any> {
        return null;
    }
    @DELETE('/alert_rules/{id}?deploymentId=1')
    @Adapter(WeatherStationAlertService.deleteAlertAdapter)
    public deleteAlert(@Path('id') query: any): Observable<any> {
        return null;
    }
}
