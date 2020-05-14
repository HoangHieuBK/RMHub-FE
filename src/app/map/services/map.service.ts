import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    static MapEditVmsAdapter(data: any): any {
        return data;
    }
    static MapDeviceAdapter(data: any): any {
        return data;
    }
}
