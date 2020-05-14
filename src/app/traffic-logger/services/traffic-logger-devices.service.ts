import { Injectable } from '@angular/core';

@Injectable()
export class TrafficLoggerDevicesService {
    // list TL Device
    static TrafficLoggerDevicesListAdapter(data: any): any {
        return data;
    }

    // sync TL Device
    static TrafficLoggerSyncAdapter(data: any): any {
        return data;
    }
    // Detail TL Device
    static TrafficLoggerDeviceDetailAdapter(data: any): any {
        return data;
    }
    // Delete TL Device
    static TrafficLoggerDeviceDeleteAdapter(data: any): any {
        return data;
    }

}
