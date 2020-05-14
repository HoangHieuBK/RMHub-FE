import { OnInit, Component, ViewChild, OnChanges, SimpleChanges, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterViewInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { MarkerComponent } from '@shared/components/marker/marker.component';
import { HttpClient } from '@angular/common/http';
import { MapMenuDevicesComponent } from '../map-menu-devices/map-menu-devices.component.js';
import { CommonConstant } from '@shared/common/constant.common';
import { SideBarService } from '@shared/layouts/services/sidebars.service';
import { Subscription, from, Observable, of } from 'rxjs';
import 'leaflet-polylineoffset';
import { ChooseLocationComponent } from '@app/map/components/choose-location/choose-location.component';
import { MapSetLocationComponent } from '@app/map/components/map-set-location/map-set-location.component';
import { icon, marker, Polyline, popup, Popup, circle, tooltip, Tooltip, point, Marker, Circle, control } from 'leaflet';
import { MapTooltipSetLocationComponent } from '@app/map/components/map-tooltip-set-location/map-tooltip-set-location.component';
import { MapBaseComponent } from '@shared/components/map-base.component';
import { MapSandbox } from '@app/map/map.sandbox';
import { MapAdapterService } from '@app/map/services/map-device-adapter';
import { PhysicalDevice, DeviceAlertBase } from '@app/map/models';
import { ConfirmPopupModel } from '@shared/models/shared/confirm-popup.model';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { isNullOrUndefined } from 'util';
import { mergeTwoArrayObject } from '@shared/utilites/function.common';
import { AppConfigService } from 'app-config.service';
import { MapCatApiClient } from '@app/map/services/map-cat-client.service';
import { map, catchError } from 'rxjs/operators';
declare let L;
declare let $;
@Component({
    selector: 'rmhub-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent extends MapBaseComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit, DoCheck {

    map: any;
    @ViewChild('markerComponent') markerComponent: MarkerComponent;
    @ViewChild('mapMenu') mapMenuDevicesComponent: MapMenuDevicesComponent;
    http: HttpClient;
    currentTypeDevice: string;
    maxZoom: number;
    api_key: string;
    tileLayer;
    coordinateView: any[];
    private subscriptions: Subscription = new Subscription();
    zoomLevel: string;
    max_variable = 10;
    commonConstant = CommonConstant;
    url_route = '';
    option_route = {
        'vehicle': 1,
        'eurocat': 1,
        'motorway': 1,
        'ferry': 1,
        'method': 'FAST',
        'vehicleclass': 'TRUCK',
        'weight': 25,
        'weight_axle': 10,
        'height': 2.5,
        'length': 15,
    };
    colorLineLink = '#FF2D2D';
    radiusCircle;
    optionsCircle = { color: '#FF2D2D', weight: 2, fillOpacity: 0.001 };
    optionIcon = {
        iconUrl: '/assets/img/map/ic_set-location.png',
        iconSize: [48, 58],
        iconAnchor: [24, 58],
    };
    marker_location: Marker;
    circle_location: Circle;
    idMarkerLocation = 'marker_location';
    idCircleLocation = 'circle_location';
    idPopupLocation = 'popup_location';
    optionPopup = { maxWidth: 'auto', maxHeight: 'auto', closeButton: false, autoClose: false, closeOnClick: false, className: CommonConstant.Class_Custom_Popup };
    coordinateRoad = [];
    polyline_location: Polyline;
    optionsPolyline = {
        lineWeight: 16,
        lineColors: ['#F49908'],
        linesOnSegment: [0],
    };
    currentZoom: number;
    chooseLocationComponent: ComponentRef<any>;
    currentLocation = CommonConstant.ROAD_ID_DEFAULT;
    defaultDeviceType = CommonConstant.CONSTANT_MAP.defaultDeviceType;
    popUpModel: ConfirmPopupModel;
    isZoomFirst = false;
    deviceChangeLocation: any;
    deviceType = CommonConstant.CONSTANT_MAP.defaultDeviceType;
    logDataAlertTraffic = [];
    dataDevice = [];
    notifySuccess = 'success';
    logDeviceTechnicalData = [];
    setLocationComponent: ComponentRef<any>;
    idConfirmSetLocationError = 'setLocation_error';
    logDataMesureWeather = [];
    urlTileLayer: string;
    attribution: string;
    optionsRoadData = {
        query: {},
        body: {}
    };
    notifyError = 'error';
    imgTileLayerError = '/assets/icon/map/tile-error.PNG';
    constructor(private _http: HttpClient,
        public sideBarService: SideBarService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private mapSandbox$: MapSandbox,
        private translate: TranslateService,
        private notifier: NotifierService,
        private cdr: ChangeDetectorRef,
        private configService: AppConfigService,
        private mapCatService: MapCatApiClient,
    ) {
        super();
        this.http = _http;
        this.currentTypeDevice = CommonConstant.TitleTapAllMap;
    }

    ngOnInit() {
        const configMap = this.configService.getConfig().map;
        this.maxZoom = configMap.defaultMaxZoom;
        this.api_key = configMap.apiKey;
        this.coordinateView = configMap.coordinateView;
        this.radiusCircle = configMap.radiusCircle;
        this.attribution = configMap.attribution;
        this.urlTileLayer = configMap.urlTileLayer;
        this.url_route = configMap.urlRoute;
        this.optionsRoadData = {
            query: {
                api_key: this.api_key
            },
            body: {
                'path': CommonConstant.COORDINATE_ROAD[this.currentLocation],
                ...this.option_route
            }
        };
        this.registerEventGetMapCat();
        this.mapConfiguration();
        this.zoomLevel = this.convertNumberToString(this.maxZoom);
        this.currentZoom = this.maxZoom;
        if (typeof (Storage) !== undefined) {
            if (localStorage.getItem('deviceTechnical')) {
                const deviceTechnical = JSON.parse(localStorage.getItem('deviceTechnical'));
                this.logDeviceTechnicalData = deviceTechnical['TechnicalStatus']['ET'];
            }
        }
        this.logDataAlertTraffic = this.getItemLocalStorage('alertBaseTraffic') || [];
        this.logDataMesureWeather = this.getItemLocalStorage('alertBaseWeather') || [];
        this.dispatchActionLoadAlert();
    }
    ngAfterViewInit(): void {
        this.getDataDevice();
        this.getTrafficAlert();
        this.getWeatherAlert();
        this.subscriptions.add(this.mapSandbox$.mapRefreshDeviceData$.subscribe(response => {
            if (response && response.data) {
                const listDevice: PhysicalDevice[] = response.data;
                const elementDevice = listDevice.find(_device => {
                    return _device.externalId === this.deviceChangeLocation.external_id;
                });
                if (elementDevice) {
                    if (this.currentTypeDevice === CommonConstant.TITLE_TAP_MAP.weather.type) {
                        this.markerComponent.updateLocationWeather(elementDevice, this.logDataMesureWeather);
                    }
                    if (this.currentTypeDevice === CommonConstant.TITLE_TAP_MAP.traffic.type) {
                        this.markerComponent.updateLocationTraffic(elementDevice, this.logDataAlertTraffic);
                    }
                    this.changeLayerWhenZoom();
                }
            }
        }));
        this.getDeviceTechnical();
        this.registerSetLocation();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.viewContainerRef.clear();
        this.mapSandbox$.resetSate();
        this.removeEventSetLocation();
    }
    registerEvent() {
        this.subscriptions.add(this.sideBarService.getCommonValue().subscribe(obj => {
            this.removeEventSetLocation();
            this.currentTypeDevice = obj.typeDevice;
            this.currentLocation = obj.currentLocation;
            this.markerComponent.removeAllMarker();
            this.deviceType = CommonConstant.CONSTANT_MAP.defaultDeviceType;
            if (this.currentTypeDevice !== CommonConstant.TitleTapAllMap) {
                this.deviceType = CommonConstant.TITLE_TAP_MAP[this.currentTypeDevice]['deviceType'];
            }
            this.mapSandbox$.loadDeviceData({ deploymentId: CommonConstant.DEPLOYMENT_ID, deviceType: this.deviceType });
        }));
    }
    getDataDevice() {
        this.subscriptions.add(this.mapSandbox$.mapDeviceData$.subscribe(response => {
            if (response && response.data) {
                const dataDevice: PhysicalDevice[] = response.data.filter(_item => (!isNullOrUndefined(_item.longitude) && !isNullOrUndefined(_item.latitude)));
                this.dataDevice = dataDevice;
                const dataDeviceWeather = dataDevice.filter(item => {
                    return item.deviceTypeId === CommonConstant.TITLE_TAP_MAP.weather.deviceType;
                });
                const dataDeviceTraffic = dataDevice.filter(item => {
                    return item.deviceTypeId === CommonConstant.TITLE_TAP_MAP.traffic.deviceType;
                });
                this.showDeviceByZoom(dataDeviceWeather, CommonConstant.TITLE_TAP_MAP.weather.type, CommonConstant.CONSTANT_MAP.typeLayer.icon);
                this.showDeviceByZoom(dataDeviceTraffic, CommonConstant.TITLE_TAP_MAP.traffic.type, CommonConstant.CONSTANT_MAP.typeLayer.icon);
                if (!isNullOrUndefined(this.coordinateRoad) && this.coordinateRoad.length > 0) {
                    this.drawLineOfDevice(this.dataDevice, this.currentTypeDevice);
                } else {
                    this.getCoordinateMapCat().subscribe(data => {
                        this.coordinateRoad = data;
                        this.markerComponent.coordinateRoad = data;
                        this.drawLineOfDevice(this.dataDevice, this.currentTypeDevice);
                    });
                }
            }

        }));
    }
    mapConfiguration() {
        this.initMap();
        // this.map.scrollWheelZoom.disable();
        this.markerComponent.map = this.map;
        this.eventMap();
        this.setInitialViewMapCat();
        this.setInitMap(this.map);
        this.changeLanguageTooltipZoom();
    }

    initMap() {
        this.map = L.map('map');
    }

    eventMap() {
        const _this = this;
        this.map.on('load', () => {
            this.registerEvent();
        });
        this.map.on('contextmenu', (e) => {
            if (this.currentTypeDevice !== CommonConstant.TitleTapAllMap && this.currentZoom >= CommonConstant.CONSTANT_MAP.zoomLevel.threeLevel) {
                this.eventSetLocation(e.latlng);
            }
        });
        this.map.on('zoomend', (event) => {
            _this.zoomLevel = _this.convertNumberToString(_this.map.getZoom());
            _this.currentZoom = _this.map.getZoom();
            if (this.isZoomFirst) {
                _this.changeLayerWhenZoom();
            }

            if (!this.isZoomFirst) {
                this.isZoomFirst = true;
            }
            if (_this.currentZoom < CommonConstant.CONSTANT_MAP.zoomLevel.threeLevel) {
                this.removeEventSetLocation();
            }
        });
        this.map.on('click', () => {
            this.removeEventSetLocation();
        });

    }

    setInitialViewMapCat() {
        this.map.setView(this.coordinateView, this.maxZoom);
        this.tileLayer = L.tileLayer(`${this.urlTileLayer}?api_key=${this.api_key}`, {
            attribution: `${this.attribution}`,
            errorTileUrl: this.imgTileLayerError
        }).addTo(this.map);

    }

    ngOnChanges(changes: SimpleChanges) {
    }

    convertNumberToString(_number: number): string {
        let output = _number.toString();
        if (_number < this.max_variable) {
            output = '0' + _number.toString();
        }
        return output;
    }
    eventSetLocation(coordinate) {
        this.removeEventSetLocation();
        const latLng_current = coordinate;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChooseLocationComponent);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        componentRef.changeDetectorRef.detectChanges();
        this.chooseLocationComponent = componentRef;
        const popupContent = componentRef.location.nativeElement;
        popup({ ...this.optionPopup, offset: point(60, 80) })
            .setLatLng(latLng_current).setContent(popupContent).openOn(this.map);
        componentRef.instance.render.subscribe(data => {
            if (data) {
                this.viewContainerRef.clear();
                const _popup = this.createPopupForm(latLng_current);
                const _tooltip = this.createTooltipForm(latLng_current);
                const markerIcon = icon({
                    ...this.optionIcon
                });
                this.marker_location = marker(latLng_current, { icon: markerIcon, id: this.idMarkerLocation }).addTo(this.map);
                this.marker_location.bindTooltip(_tooltip);
                this.circle_location = circle(latLng_current, { radius: this.radiusCircle[this.currentTypeDevice], ...this.optionsCircle }).addTo(this.map);
                if (!isNullOrUndefined(this.coordinateRoad) && this.coordinateRoad.length > 0) {
                    this.eventCheckSetLocationProblem(this.coordinateRoad, latLng_current, _popup);
                } else {
                    this.getCoordinateMapCat().subscribe(arrCoordinate => {
                        this.coordinateRoad = arrCoordinate;
                        this.markerComponent.coordinateRoad = arrCoordinate;
                        this.eventCheckSetLocationProblem(this.coordinateRoad, latLng_current, _popup);
                    });
                }

            }
        });

    }
    removeEventSetLocation() {
        this.viewContainerRef.clear();

        if (this.marker_location) {
            this.marker_location.removeFrom(this.map);
        }
        if (this.circle_location) {
            this.circle_location.removeFrom(this.map);
        }
        if (this.polyline_location) {
            this.polyline_location.remove(this.map);
        }
        if (this.chooseLocationComponent) {
            this.chooseLocationComponent.destroy();
        }
        if (this.setLocationComponent) {
            this.setLocationComponent.destroy();
            this.setLocationComponent = null;
        }
    }
    createTooltipForm(coordinate: Array<any>): Tooltip {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MapTooltipSetLocationComponent);
        this.viewContainerRef.detach();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.positionDevice = coordinate;
        componentRef.changeDetectorRef.detectChanges();
        const tooltipContent = componentRef.location.nativeElement;
        const toolTip = tooltip({ direction: 'bottom', permanent: true, className: 'map-tooltip' });
        toolTip.setContent(tooltipContent);
        return toolTip;
    }
    createPopupForm(coordinate: Array<any>): Popup {
        const latLng_current = coordinate;
        const componentFactorySet = this.componentFactoryResolver.resolveComponentFactory(MapSetLocationComponent);
        this.viewContainerRef.detach();
        const componentRefSet = this.viewContainerRef.createComponent(componentFactorySet);
        componentRefSet.instance.deviceType = CommonConstant.TITLE_TAP_MAP[this.currentTypeDevice]['deviceType'];
        componentRefSet.instance.positionDevice = latLng_current;
        componentRefSet.changeDetectorRef.detectChanges();
        componentRefSet.instance.closePopup.subscribe(() => {
            this.removeEventSetLocation();
        });
        componentRefSet.instance.updateData.subscribe(() => {
            componentRefSet.changeDetectorRef.detectChanges();
        });
        componentRefSet.instance.configPopup.subscribe((popupConfig) => {
            this.popUpModel = popupConfig;
        });

        componentRefSet.instance.removePopup.subscribe(() => {
            if (this.circle_location) {
                this.circle_location.remove();
            }
            if (this.marker_location) {
                this.marker_location.remove();
            }
        });
        this.setLocationComponent = componentRefSet;
        const popupContentSet = componentRefSet.location.nativeElement;
        const _popup = popup({ ...this.optionPopup, offset: point(0, -35), data: { id: this.idPopupLocation, beginPoint: latLng_current, color: this.colorLineLink } })
            .setLatLng(latLng_current).setContent(popupContentSet);
        return _popup;
    }
    drawPartRoad(arrCoordinate, position, radiusCircle): boolean {
        const arrPoint = this.findPointOfCircle(arrCoordinate, position, radiusCircle);
        const optionsPolyline = {
            ...this.optionsPolyline
        };
        const arrPolyline = this.drawPolyline(arrPoint, optionsPolyline);
        if (arrPolyline.length > 0) {
            this.polyline_location = arrPolyline[0];
        }
        return arrPoint.length > 0;
    }
    showDeviceByZoom(dataDevice, typeDevice, typeLayer) {
        if (typeLayer === CommonConstant.CONSTANT_MAP.typeLayer.alert) {
            this.showAlertDevice(dataDevice, typeDevice);
        }
        if (typeLayer === CommonConstant.CONSTANT_MAP.typeLayer.icon) {
            this.showIconDevice(dataDevice, typeDevice);
        }
        this.takeMesureLocalStorage();
        this.changeLayerWhenZoom();
    }

    showIconDevice(dataDevice, typeDevice) {
        if ((this.currentTypeDevice === CommonConstant.TitleTapAllMap) || (typeDevice === this.currentTypeDevice)) {
            this.markerComponent.addDeviceOnMap(dataDevice, typeDevice);
        }
    }
    showAlertDevice(dataDevice, typeDevice) {
        if ((typeDevice === CommonConstant.TitleTapAllMap)) {
            this.markerComponent.drawAlertDevice(dataDevice, CommonConstant.TITLE_TAP_MAP.traffic.type);
        } else {
            this.markerComponent.drawAlertDevice(dataDevice, typeDevice);
        }
    }
    getTrafficAlert() {
        this.subscriptions.add(this.mapSandbox$.mapTrafficAlertDevice$.subscribe((alertBase: DeviceAlertBase) => {
            if (alertBase) {
                let dataAlert = [];
                if (Array.isArray(alertBase)) {
                    dataAlert = alertBase;
                } else {
                    dataAlert = MapAdapterService.MapDeviceAdapter(alertBase, this.logDeviceTechnicalData);
                }
                this.markerComponent.updateDataAlertTraffic(dataAlert);
                const oldDataAlert = this.getItemLocalStorage('alertBaseTraffic') || [];
                const newDataAlert = mergeTwoArrayObject(oldDataAlert, dataAlert, 'externalId');
                this.setItemLocalStorage('alertBaseTraffic', newDataAlert);
                this.logDataAlertTraffic = newDataAlert;
            }
        }));
    }
    getWeatherAlert() {
        this.subscriptions.add(this.mapSandbox$.mapWeatherAlertDevice$.subscribe((alertBase: DeviceAlertBase) => {
            if (alertBase) {
                let dataAlert = [];
                const oldMesureDataWeather = this.getItemLocalStorage('alertBaseWeather') || [];
                if (Array.isArray(alertBase)) {
                    dataAlert = alertBase;
                } else {
                    dataAlert = MapAdapterService.mapWeatherDeviceAdapter(alertBase, oldMesureDataWeather);
                }
                const mesureDataWeather = MapAdapterService.mergeMesureDataWeather(oldMesureDataWeather, dataAlert);
                this.markerComponent.updateDataAlertWeather(mesureDataWeather);
                this.setItemLocalStorage('alertBaseWeather', mesureDataWeather);
                this.logDataMesureWeather = mesureDataWeather;
            }
        }));
    }
    dispatchActionLoadAlert() {
        this.dispatchActionLoadDeviceTechnical();
        this.dispatchActionLoadAlertTraffic();
        this.dispatchActionLoadAlertWeather();
    }

    dispatchActionLoadAlertTraffic() {
        const alertBaseTraffic = this.getItemLocalStorage('alertBaseTraffic');
        this.mapSandbox$.loadTrafficAlertDevice(alertBaseTraffic);
    }
    dispatchActionLoadAlertWeather() {
        const alertBaseWeather = this.getItemLocalStorage('alertBaseWeather');
        this.mapSandbox$.loadWeatherAlertDevice(alertBaseWeather);
    }
    dispatchActionLoadDeviceTechnical() {
        this.mapSandbox$.loadDeviceTechnical();
    }
    getDeviceTechnical() {
        this.subscriptions.add(this.mapSandbox$.mapDeviceTechnicalData$.subscribe((deviceTechnical) => {
            if (deviceTechnical && deviceTechnical['TechnicalStatus']['ET']) {

                // get technical device traffic
                const dataAlertTraffic = MapAdapterService.deviceTechnicalAdapter(deviceTechnical, this.logDeviceTechnicalData, this.logDataAlertTraffic);
                const oldAlertTraffic = this.getItemLocalStorage('alertBaseTraffic') || [];
                this.logDeviceTechnicalData = deviceTechnical['TechnicalStatus']['ET'];
                const newAlertTraffic = mergeTwoArrayObject(oldAlertTraffic, dataAlertTraffic, 'externalId');
                this.markerComponent.updateDataAlertTraffic(dataAlertTraffic);
                this.logDataAlertTraffic = newAlertTraffic;
                this.setItemLocalStorage('alertBaseTraffic', newAlertTraffic);
                this.setItemLocalStorage('deviceTechnical', deviceTechnical);
            }
        }));
    }
    ngDoCheck(): void {
        if (this.setLocationComponent) {
            this.setLocationComponent.changeDetectorRef.detectChanges();
        }
    }
    setItemLocalStorage(name, value) {
        if (typeof (Storage) !== undefined) {
            localStorage.setItem(name, JSON.stringify(value));
        }
    }
    getItemLocalStorage(name) {
        let output = null;
        if (typeof (Storage) !== undefined) {
            if (localStorage.getItem(name)) {
                output = JSON.parse(localStorage.getItem(name));
            }
        }
        return output;
    }
    changeLayerWhenZoom() {
        this.markerComponent.changeLayerFollowZoom();
    }
    takeMesureLocalStorage() {
        const alertBaseTraffic = this.getItemLocalStorage('alertBaseTraffic') || [];
        this.markerComponent.updateDataAlertTraffic(alertBaseTraffic);
        const alertBaseWeather = this.getItemLocalStorage('alertBaseWeather') || [];
        this.markerComponent.updateDataAlertWeather(alertBaseWeather);
    }
    changeLanguageTooltipZoom() {
        this.translate.onLangChange.subscribe(() => {
            const zoomInTitle = this.translate.instant('Map.zoomInTitle');
            const zoomOutTitle = this.translate.instant('Map.zoomOutTitle');
            control.zoom({ zoomInTitle, zoomOutTitle }).addTo(this.map);
        });
    }
    registerSetLocation() {
        this.subscriptions.add(this.mapSandbox$.setLocationData$.subscribe((_response: any) => {
            if (!_response) {
                return;
            }
            if (this.setLocationComponent) {
                this.setLocationComponent.instance.disableEmitData = false;
            }
            if (_response.data && _response.data.length > 0) {
                this.deviceChangeLocation = _response.data[0];
                this.mapSandbox$.loadRefreshDeviceData({ deploymentId: CommonConstant.DEPLOYMENT_ID, deviceType: this.deviceType });
                this.popUpModel = null;
                this.notifier.notify(this.notifySuccess, this.translate.instant('Map.Notifier.Change_Location_Success'));
            }
            this.removeEventSetLocation();
        }));
    }
    getCoordinateMapCat(): Observable<any> {
        return this.mapCatService.getCoordinateMapCat(this.optionsRoadData.query, this.optionsRoadData.body).pipe(
            map(data => {
                if (data && data.geometry) {
                    return this.convertCoordinateMapCat(data.geometry);
                }
                return [];
            }),
            catchError(error => {
                this.notifier.notify(this.notifyError, this.translate.instant('Map.errorRouteRequest'));
                return of([]);
            }
            )
        );
    }
    convertCoordinateMapCat(objCoordinate) {
        const coordinates = [];
        objCoordinate.forEach((coords) => {
            coordinates.push(L.latLng([coords.lat, coords.long]));
        });

        return this.repairData(coordinates);
    }
    drawLineOfDevice(dataDevice, currentTypeDevice) {
        let typeDevice = currentTypeDevice;
        if (currentTypeDevice === CommonConstant.TitleTapAllMap) {
            typeDevice = CommonConstant.TITLE_TAP_MAP.traffic.type;
        }
        const dataDeviceSub = dataDevice.filter(item => {
            return item.deviceTypeId === CommonConstant.TITLE_TAP_MAP[typeDevice]['deviceType'];
        });
        this.showDeviceByZoom(dataDeviceSub, typeDevice, CommonConstant.CONSTANT_MAP.typeLayer.alert);
    }
    eventCheckSetLocationProblem(coordinateRoad, latLng_current, _popup) {
        const isDrawPartRoad = this.drawPartRoad(coordinateRoad, latLng_current, this.radiusCircle[this.currentTypeDevice]);
        if (isDrawPartRoad) {
            this.marker_location.bindPopup(_popup);
        } else {
            this.popUpModel = new ConfirmPopupModel({
                type: 3,
                title: 'Map.Confirm_Popup_Error.title',
                id: this.idConfirmSetLocationError,
                content: 'Map.Confirm_Popup_Error.content',
                textYes: 'Map.Confirm_Popup_Error.textYes',
                funcYes: () => {
                    this.removeEventSetLocation();
                },
                funcClose: () => {
                    this.removeEventSetLocation();
                }
            });
            this.cdr.detectChanges();
            $('#' + this.idConfirmSetLocationError).modal();
        }

    }
    registerEventGetMapCat() {
        this.getCoordinateMapCat().subscribe(data => {
            this.coordinateRoad = data;
            this.markerComponent.coordinateRoad = data;
        });
    }
}
