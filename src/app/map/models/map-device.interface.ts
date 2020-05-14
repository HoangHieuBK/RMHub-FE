export interface Pool {
    poolName: string;
    poolValue: string;
}
export interface PhysicalDevice {
    deviceTypeId?: number;
    id: number;
    externalId: string;
    deviceName: string;
    context: string;
    eqt_actif: number;
    description: string;
    latitude: number;
    longitude: number;
    pools: Pool[];
}
