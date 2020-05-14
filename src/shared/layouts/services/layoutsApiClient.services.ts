import { LayoutsAdapterService } from './layoutsAdapter.service';
import { HttpService } from '.././../asyncServices/http/http.service';
import { Injectable, Query } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { DefaultHeaders, Adapter, GET, Path } from '@shared/asyncServices/http';

@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})
@Injectable()
export class LayoutsApiClientServices extends HttpService {

}
