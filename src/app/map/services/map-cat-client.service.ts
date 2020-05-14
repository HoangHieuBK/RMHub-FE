import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, PUT, Body, POST, BaseUrl } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';
import { CommonConstant } from '@shared/common/constant.common';
import { tryMapPathApi, tryMapPathApiEncoded } from '@shared/utilites';
@Injectable({
    providedIn: 'root'
})

@DefaultHeaders({
    'Accept': 'application/json,text/plain, */*',
    'Content-Type': 'application/json',
})
@BaseUrl(CommonConstant.CONSTANT_MAP.api_mapCat)
export class MapCatApiClient extends HttpService {

    @POST('/routecalc/route{query}')
    public getDataMapCat(@Path('query') query?: any, @Body body?: any): Observable<any> {
        return null;
    }
    public getCoordinateMapCat(objQuery = {}, body = {}): Observable<any> {
        const query = tryMapPathApi(objQuery);
        const urlRoute = this.configService.getConfig().map.urlRoute;
        const path = `${urlRoute}${query}`;
        return this.httpCLient.post(path, body);
    }
}
