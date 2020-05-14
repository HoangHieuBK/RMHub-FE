import { Injectable } from '@angular/core';
import { ALERT } from '../models/alert-setting.interface';

@Injectable({
    providedIn: 'root'
})
export class WeatherStationAlertService {

    static getAlertAdapter(data: ALERT[]) {
        return data;
    }
    static addAlertAdapter(data: ALERT) {
        return data;
    }
    static editAlertAdapter(data: ALERT) {
        return data;
    }
    static deleteAlertAdapter(data: any) {
        return data;
    }
}
