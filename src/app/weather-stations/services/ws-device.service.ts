import { Injectable } from '@angular/core';
import { WeatherStation } from '../models';
import { CommonConstant } from '@shared/common/constant.common';

@Injectable({
    providedIn: 'root'
})
export class WSDeviceService {
    constructor() { }

    weathers: WeatherStation[] = [];
    messageDeleteSuccess: number;

    preNumberRecords: number;
    preNumberPaging: number;
    deviceSide: boolean;
    detailSide: boolean;

    newDate(date: string) {
        return new Date(date);
    }

    getWeathers(): WeatherStation[] {
        return this.weathers;
    }

    getWeather(id: number): WeatherStation {
        const weather: WeatherStation = this.weathers.find(idWeather => idWeather.id === id);
        return weather;
    }

    createWeather(weather: WeatherStation) {
        this.weathers.unshift(weather);
    }

    editWeather(weather: WeatherStation) {
        const weatherRef: WeatherStation = this.getWeather(weather.id);
        const index: number = this.weathers.indexOf(weatherRef);
        this.weathers[index] = weather;
    }

    deleteWeather(ws: WeatherStation): void {
        this.weathers.forEach((element, index) => {
            if (element.id === ws.id) {
                this.weathers.splice(index, 1);
            }
        });
    }
    generateId(): number {
        return this.weathers.length > 0 ? Math.max(...this.weathers.map(item => item.id)) + 1 : 1;
    }

    resetOldStatePage() {
        this.deviceSide = false;
        this.detailSide = false;
        this.preNumberRecords = 10;
        this.preNumberPaging = 1;
    }

    translateStatusField(status: string) {
        if (status === CommonConstant.STATUS_DEVICE[0]) {
            return 'Common.List.Status.Inactive';
        } else if (status === CommonConstant.STATUS_DEVICE[1]) {
            return 'Common.List.Status.Active';
        }
    }

    translateRegistrationField(registration: string) {
        if (registration === CommonConstant.REGISTRATION_DEVICE[0]) {
            return 'Common.List.Registration.Unregistered';
        } else if (registration === CommonConstant.REGISTRATION_DEVICE[1]) {
            return 'Common.List.Registration.Registered';
        }
    }
}

