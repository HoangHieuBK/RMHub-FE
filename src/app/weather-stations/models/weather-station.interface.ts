export class WeatherStation {
    id?: number;
    external_id?: string;
    physical_address?: string;
    logical_address?: string;
    latitude?: number;
    longitude?: number;
    motorway?: string;
    atKilometers?: number;
    atMeters?: number;

    name?: string;
    status?: number;
    registration?: string;
    lastUpdate?: string;

    constructor(id?: number, external_id?: string, physical_address?: string, logical_address?: string, latitude?: number,
        longitude?: number, motorway?: string, atKilometers?: number, atMeters?: number, name?: string, status?: number,
        registration?: string, lastUpdate?: string) {
            this.id = id;
            this.external_id = external_id;
            this.physical_address = physical_address;
            this.logical_address = logical_address;
            this.latitude = latitude;
            this.longitude = longitude;
            this.motorway = motorway;
            this.atKilometers = atKilometers;
            this.atMeters = atMeters;
            this.name = name;
            this.status = status;
            this.registration  = registration;
            this.lastUpdate = lastUpdate;
    }
}
