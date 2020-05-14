export class TrafficAlertData {
    pool: number;
    alert: {
        color: string;
        description: string;
        level?: number;
    };
    flow: number | string;
    averageSpeed: number | string;
    occupationRate: number | string;
    communication: {
        value_real: number;
        value_convert: string;
    };
    power: string;
    system: string;
}
export interface TrafficAlertDevice {
    externalId: string;
    dataAlert: TrafficAlertData[];
    updated_at: Date;
}
