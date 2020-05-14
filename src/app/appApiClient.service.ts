import {
    Injectable
} from '@angular/core';
import {
    HttpService,
    GET,
    Adapter,
    DefaultHeaders,
} from '@shared/asyncServices/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
})


@Injectable()
export class AppApiClient extends HttpService {

    /**
     * Retrieves all rights for user logined
     */
    @GET('api/me/rights')
    @Adapter(AppService.getRolesAdapter)
    public getRoles(): Observable<any> {
        return null;
    }
}
