import { Injectable } from '@angular/core';
import { WeatherStation } from '../models';
import { ALERT } from '../models/alert-setting.interface';

@Injectable()
export class WeatherStationDeviceService {
    // service api ws devices
    static getWSDevicesAdapter(data: WeatherStation[]) {
        return data;
    }
    static getWSDevicesMivisuAdapter(data: WeatherStation[]) {
        return data;
    }
    static detailWSDeviceAdapter(data: WeatherStation[]) {
        return data;
    }
    static deleteWSDeviceAdapter(data: any) {
        return data;
    }
}
