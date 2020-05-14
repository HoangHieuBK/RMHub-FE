
export interface WeatherAlertDevice {
    externalId: string;
    surfaceTemperature?: number | string;
    surfaceStatus?: string;
    freezingTemperature?: string;
    waterFilmHeight?: number | string;
    airTemperature?: number | string;
    airHumidity?: number | string;
    dewPointTemperature?: number | string;
    precipitationHeight?: number | string;
    windSpeedMin?: number | string;
    windSpeedMax?: number | string;
    typeOfPrecipitation?: string;
    intensityOfPrecipitation?: string;
    windDirection?: string;
    atmosphericPressure?: number | string;
    winterConditionsWarning?: string;
    winterPrecipitationsWarning?: string;
    communication?: {
        value_real?: number;
        value_convert?: string;
    };
    gateOpen?: {
        value_real?: number;
        value_convert?: string;
    };
    powerDefault?: {
        value_real?: number;
        value_convert?: string;
    };
    alertWeather?: {
        color: string;
        description: string;
        alertCode?: string;
    };
    alertWind?: {
        color: string;
        description: string;
        alertCode?: string;
    };
    updated_at: Date;
}



