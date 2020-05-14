import { Injectable } from '@angular/core';
import { AlertTraffic } from '../models/alert-traffic.model';

@Injectable({
    providedIn: 'root'
})
export class AlertTrafficService {
    alerts: AlertTraffic[] = [];

    getAlerts() {
        return this.alerts;
    }

    getAlert(id) {
        const alert = this.alerts.find(item => item.id === id);
        if (alert !== undefined) {
            return alert;
        }
        return null;
    }

    createAlert(alert: AlertTraffic) {
        this.alerts.push(alert);
    }

    deleteAlert(id: number) {
        this.alerts.forEach((item, index) => {
            if (item.id === id) {
                this.alerts.splice(index, 1);
            }
        });
    }

    updateAlert(alert: AlertTraffic) {
        const element = this.alerts.find(item => item.id === alert.id);
        const index = this.alerts.indexOf(element);
        this.alerts[index] = alert;
    }

    generateId(): number {
        return this.alerts.length > 0 ? Math.max(...this.alerts.map(item => item.id)) + 1 : 1;
    }
}
