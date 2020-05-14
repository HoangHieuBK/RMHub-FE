import { Injectable } from '@angular/core';
import { WeatherAlertDevice, Mesure, TrafficAlertDevice, TrafficAlertData, Centrale, ObjectTechnical, DeviceTechnical, PhysicalDevice, DeviceAlertBase } from '../models';
import { CommonConstant } from '@shared/common/constant.common';
import { isNullOrUndefined, isUndefined } from 'util';
import { mergeTwoArrayObject } from '@shared/utilites/function.common';
@Injectable({
    providedIn: 'root'
})
export class MapAdapterService {
    static numberLaneRoad = CommonConstant.LANE_ROAD_CONSTANT;
    static mesureConstant = CommonConstant.MESURE_CONSTANT;
    static mesureWeatherConstant = CommonConstant.MESURE_WEATHER_CONSTANT;
    static mesureWeatherTypeConstant = CommonConstant.MESURE_WEATHER_TYPE_CONSTANT;
    static arrCodeWindWeather: Array<string> = CommonConstant.CONSTANT_MAP.codeWindWeather;
    static valueTechnicalNormal = CommonConstant.MapMesureWeather.valueTechnicalNormal;
    static mesureWeatherTechnical = CommonConstant.MESURE_WEATHER_TECHNICAL;
    static valueTechnicalErrorWeather = CommonConstant.MapMesureWeather.valueTechnicalError;
    public static MapDeviceAdapter(deviceAlertBase: DeviceAlertBase, dataTechnical: DeviceTechnical[] = []): any {
        let data: Centrale[] = [];
        const arrTrafficAlertDevice: TrafficAlertDevice[] = [];
        if (deviceAlertBase && !isNullOrUndefined(deviceAlertBase['CORPS']['CENTRALE'])) {
            data = deviceAlertBase['CORPS']['CENTRALE'];
        }
        for (const entry of data) {
            const trafficAlertDevice: TrafficAlertDevice = { dataAlert: [], externalId: '', updated_at: new Date(deviceAlertBase.CORPS.receivedDate) };
            trafficAlertDevice.externalId = entry.externalId;
            const itemTechnicalData = dataTechnical.find(itemTechnical => {
                return itemTechnical.ID_EXT === entry.externalId;
            });
            for (const i of this.numberLaneRoad) {
                const trafficAlertData: TrafficAlertData = Object.assign({}, this.getTrafficAlertDataDefault());
                trafficAlertData['pool'] = i;
                if (itemTechnicalData && itemTechnicalData.Etat_Com !== CommonConstant.MapMesureTraffic.communicationNormal) {
                    trafficAlertData.communication.value_real = itemTechnicalData.Etat_Com;
                    trafficAlertData.communication.value_convert = CommonConstant.MapMesureTraffic.communication.error;
                    trafficAlertData.alert.color = CommonConstant.MapMesureTraffic.colorCommunicationError;
                } else {
                    const mesureFilter = entry.MESURE.filter(item => {
                        return item.Eqt_Mes_Id.startsWith('' + i);
                    });
                    trafficAlertData.communication.value_convert = CommonConstant.MapMesureTraffic.communication.normal;
                    for (const key in this.mesureConstant) {
                        if (this.mesureConstant.hasOwnProperty(key)) {
                            const mesureFilterData = mesureFilter.find(mesure => {
                                return mesure.Eqt_Mes_Id.includes(key);
                            });
                            trafficAlertData[this.mesureConstant[key]] = mesureFilterData.Eqt_Mes_Val_1;
                            if (mesureFilterData.alertBase.color) {
                                trafficAlertData.alert = mesureFilterData.alertBase;
                            }
                        }
                    }
                }
                trafficAlertDevice.dataAlert.push(trafficAlertData);
            }
            arrTrafficAlertDevice.push(trafficAlertDevice);
        }
        return arrTrafficAlertDevice;
    }
    public static SetLocationAdapter(data: any[]): any {
        return data;
    }
    public static SearchDeviceAdapter(data: any[]): any {
        return data;
    }

    /**
     * @description convert mesure data for device weather
     * @param data
     */
    public static mapWeatherDeviceAdapter(deviceAlertBase: DeviceAlertBase, arrDataOld: any[] = []): Array<any> {
        let data: Centrale[] = [];
        if (deviceAlertBase && !isNullOrUndefined(deviceAlertBase['CORPS']['CENTRALE'])) {
            data = deviceAlertBase['CORPS']['CENTRALE'];
        }
        const arrWeatherAlertDevice: WeatherAlertDevice[] = [];
        for (const entry of data) {
            const dataOld = arrDataOld.find(element => element.externalId === entry.externalId);
            let weatherAlertDevice: WeatherAlertDevice = {
                externalId: entry.externalId,
                updated_at: new Date(deviceAlertBase.CORPS.receivedDate),
            };
            for (const key in this.mesureWeatherTechnical) {
                if (this.mesureWeatherTechnical.hasOwnProperty(key)) {
                    const mesureFilterData = entry.MESURE.find(_mesure => {
                        return _mesure.Eqt_Mes_Id === key;
                    });
                    if (mesureFilterData) {
                        const _valueReal = mesureFilterData.Eqt_Mes_Val_1;
                        weatherAlertDevice[this.mesureWeatherTechnical[key].keyObject] = {};
                        weatherAlertDevice[this.mesureWeatherTechnical[key].keyObject]['value_convert'] = CommonConstant.CONSTANT_MAP.defaultValueMesure;
                        if (!this.checkItemEmpty(this.mesureWeatherTechnical[key].valueConvert[_valueReal])) {
                            weatherAlertDevice[this.mesureWeatherTechnical[key].keyObject]['value_convert'] = this.mesureWeatherTechnical[key].valueConvert[_valueReal];
                        }
                        weatherAlertDevice[this.mesureWeatherTechnical[key].keyObject]['value_real'] = _valueReal;
                    }
                }
            }
            if (dataOld) {
                weatherAlertDevice = Object.assign({}, { 'communication': dataOld.communication }, weatherAlertDevice);
            }
            let isTechnicalProblem = false;
            if (!isUndefined(weatherAlertDevice.communication) && !isUndefined(weatherAlertDevice.communication.value_real)) {
                isTechnicalProblem = weatherAlertDevice.communication.value_real === this.valueTechnicalErrorWeather;
            }
            if (!isTechnicalProblem) {
                for (const key in this.mesureWeatherConstant) {
                    if (this.mesureWeatherConstant.hasOwnProperty(key)) {
                        const mesureFilterData = entry.MESURE.find(mesure => {
                            return mesure.Eqt_Mes_Id === key;
                        });
                        if (mesureFilterData) {
                            const _value = mesureFilterData.Eqt_Mes_Val_1;
                            switch (this.mesureWeatherConstant[key].typeData) {
                                case this.mesureWeatherTypeConstant.convert_text: {
                                    weatherAlertDevice[this.mesureWeatherConstant[key].keyObject] = CommonConstant.CONSTANT_MAP.defaultValueMesure;
                                    if (!this.checkItemEmpty(this.mesureWeatherConstant[key].valueConvert[_value])) {
                                        weatherAlertDevice[this.mesureWeatherConstant[key].keyObject] = this.mesureWeatherConstant[key].valueConvert[_value];
                                    }
                                    break;
                                }
                                case this.mesureWeatherTypeConstant.convert_object: {
                                    weatherAlertDevice[this.mesureWeatherConstant[key].keyObject] = this.convertElementInObject(+_value, this.mesureWeatherConstant[key].valueConvert);
                                    break;
                                }
                                case this.mesureWeatherTypeConstant.convert_multiple: {
                                    weatherAlertDevice[this.mesureWeatherConstant[key].keyObject] = {};
                                    weatherAlertDevice[this.mesureWeatherConstant[key].keyObject]['value_convert'] = CommonConstant.CONSTANT_MAP.defaultValueMesure;
                                    if (!this.checkItemEmpty(this.mesureWeatherConstant[key].valueConvert[_value])) {
                                        weatherAlertDevice[this.mesureWeatherConstant[key].keyObject]['value_convert'] = this.mesureWeatherConstant[key].valueConvert[_value];
                                    }
                                    weatherAlertDevice[this.mesureWeatherConstant[key].keyObject]['value_real'] = _value;
                                    break;
                                }
                                default:
                                    weatherAlertDevice[this.mesureWeatherConstant[key].keyObject] = _value;
                                    break;
                            }
                            if (key === CommonConstant.MapMesureWeather.IdAlertWind) {
                                weatherAlertDevice['alertWind'] = mesureFilterData.alertBase;
                            }
                            if (key === CommonConstant.MapMesureWeather.IdAlertWeather) {
                                weatherAlertDevice['alertWeather'] = mesureFilterData.alertBase;
                            }
                        }
                    }
                }
            } else {
                weatherAlertDevice = Object.assign({}, this.getDefaultWeatherAlertDevice(), weatherAlertDevice);
            }

            arrWeatherAlertDevice.push(weatherAlertDevice);
        }
        return arrWeatherAlertDevice;
    }
    private static checkExists(_element: number, arrValue: Array<number>): boolean {

        if (arrValue.length < 2) {
            return false;
        } else {
            return (_element >= arrValue[0]) && (_element <= arrValue[1]);
        }
    }
    private static convertElementInObject(_element: number, arrElement: Array<Object>): string {

        for (let i = 0; i < arrElement.length; i++) {
            const objItem = arrElement[i];
            const arrKey = Object.keys(objItem);
            if (arrKey.length > 0) {
                if (this.checkExists(_element, objItem[arrKey[0]])) {
                    return arrKey[0];
                }
            }
        }
        return CommonConstant.CONSTANT_MAP.defaultValueMesure;
    }
    public static deviceTechnicalAdapter(objectTechnical: ObjectTechnical, oldDeviceTechnical: DeviceTechnical[] = [], mesureDataTraffic: TrafficAlertDevice[] = []): Array<any> {
        let data: DeviceTechnical[] = [];
        if (objectTechnical && !isNullOrUndefined(objectTechnical['TechnicalStatus']['ET'])) {
            data = objectTechnical['TechnicalStatus']['ET'];
        }
        const arrTrafficAlertDevice: TrafficAlertDevice[] = [];
        for (const entry of data) {
            let isItemData = false;
            const trafficAlertDevice: TrafficAlertDevice = { dataAlert: [], externalId: entry.ID_EXT, updated_at: new Date(objectTechnical.TechnicalStatus.receivedDate) };
            if (entry.Etat_Com !== CommonConstant.MapMesureTraffic.communicationNormal) {
                isItemData = true;
                for (const i of this.numberLaneRoad) {
                    const trafficAlertData: TrafficAlertData = Object.assign({}, this.getTrafficAlertDataDefault());
                    trafficAlertData['pool'] = i;
                    trafficAlertData.communication.value_real = entry.Etat_Com;
                    trafficAlertData.communication.value_convert = CommonConstant.MapMesureTraffic.communication.error;
                    trafficAlertData.alert.color = CommonConstant.MapMesureTraffic.colorCommunicationError;
                    trafficAlertDevice.dataAlert.push(trafficAlertData);
                }
            } else {
                const itemTechnicalData = oldDeviceTechnical.find(itemTechnical => {
                    return itemTechnical.ID_EXT === entry.ID_EXT;
                });
                const itemMesureTraffic = mesureDataTraffic.find(_mesure => _mesure.externalId === entry.ID_EXT);
                if ((itemTechnicalData && itemTechnicalData.Etat_Com !== CommonConstant.MapMesureTraffic.communicationNormal) || isUndefined(itemMesureTraffic)) {
                    isItemData = true;
                    for (const i of this.numberLaneRoad) {
                        const trafficAlertData: TrafficAlertData = Object.assign({}, this.getTrafficAlertDataDefault());
                        trafficAlertData['pool'] = i;
                        trafficAlertData.communication.value_real = entry.Etat_Com;
                        trafficAlertData.communication.value_convert = CommonConstant.MapMesureTraffic.communication.normal;
                        trafficAlertData.alert.color = CommonConstant.MapMesureTraffic.colorCommunicationNormal;
                        trafficAlertDevice.dataAlert.push(trafficAlertData);
                    }
                }
            }
            if (isItemData) {
                arrTrafficAlertDevice.push(trafficAlertDevice);
            }
        }
        return arrTrafficAlertDevice;
    }
    public static getTrafficAlertDataDefault() {
        return {
            pool: null,
            alert: {
                color: '',
                description: '',
                level: null
            },
            flow: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            averageSpeed: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            occupationRate: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            communication: {
                value_real: CommonConstant.MapMesureTraffic.communicationNormal,
                value_convert: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            },
            power: '',
            system: ''
        };
    }
    public static getDefaultWeatherAlertDevice() {
        return {
            externalId: '',
            surfaceTemperature: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            surfaceStatus: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            freezingTemperature: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            waterFilmHeight: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            airTemperature: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            airHumidity: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            dewPointTemperature: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            precipitationHeight: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            windSpeedMin: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            windSpeedMax: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            typeOfPrecipitation: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            intensityOfPrecipitation: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            windDirection: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            atmosphericPressure: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            winterConditionsWarning: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            winterPrecipitationsWarning: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            communication: {
                value_real: null,
                value_convert: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            },
            alertWeather: {
                color: null,
                description: null,
                alertCode: null
            },
            alertWind: {
                color: null,
                description: null,
                alertCode: null
            },
            updated_at: null
        };
    }
    private static checkItemEmpty(item: any) {
        return isNullOrUndefined(item) || item.toString().trim().length === 0;
    }
    public static mergeMesureDataWeather(oldMesureData: Array<WeatherAlertDevice>, newMesureData: Array<WeatherAlertDevice>): Array<any> {
        const arrDataDefault: WeatherAlertDevice[] = [];
        const arrMergeOldNewData = mergeTwoArrayObject(oldMesureData, newMesureData, 'externalId');
        arrMergeOldNewData.forEach(newData => {
            const index = arrDataDefault.findIndex(item => item.externalId === newData.externalId);
            if (index < 0) {
                const itemDefault = Object.assign({}, this.getDefaultWeatherAlertDevice(), this.defaultWeatherTechnical(), { externalId: newData.externalId });
                arrDataDefault.push(itemDefault);
            }
        });
        return mergeTwoArrayObject(arrDataDefault, arrMergeOldNewData, 'externalId');
    }
    public static defaultWeatherTechnical() {
        return {
            gateOpen: {
                value_real: null,
                value_convert: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            },
            powerDefault: {
                value_real: null,
                value_convert: CommonConstant.CONSTANT_MAP.defaultValueMesure,
            }
        };
    }
}
