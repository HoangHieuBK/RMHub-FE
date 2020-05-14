import { Injectable } from '@angular/core';

import { Traffic } from '../models';

@Injectable({
    providedIn: 'root'
})

export class TrafficLoggerService {
    constructor() { }
    typeNumber: number;
    id = '20190000';
    messageSuccess: number;
    date = new Date();
    traffics: Traffic[] = [];

    getTraffic(): Traffic[] {
        return this.traffics;
    }

    getTrafficId(id: number): Traffic {
        const traffic: Traffic = this.traffics.find(idTraffic => idTraffic.id === id);
        return traffic;
    }

    createTraffic(traffic: Traffic) {
        this.traffics.unshift(traffic);
    }

    editTraffic(traffic: Traffic) {
        const trafficRef: Traffic = this.getTrafficId(traffic.id);
        const index: number = this.traffics.indexOf(trafficRef);
        this.traffics[index] = traffic;
    }

    deleteTraffic(id: number): void {
        this.traffics.forEach((element, index) => {
            if (element.id === id) {
                this.traffics.splice(index, 1);
            }
        });
    }

    generateId(): number {
        return this.traffics.length > 0 ? Math.max(...this.traffics.map(item => item.id)) + 1 : 1;
    }
}
