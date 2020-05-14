import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { MarkerMetaData, PolylineMetaData, SpeedMetaData } from '@shared/models';
import { divIcon, DomUtil, Draggable, icon, latLng, LayerGroup, marker, polyline, Polyline, popup, Popup, Map, Marker, tooltip, Tooltip } from 'leaflet';
import 'leaflet-imageoverlay-rotated';
import 'leaflet-polylineoffset';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { MapBaseComponent } from '../map-base.component';
import { MarkerSpeedComponent } from './marker-speed/marker-speed.component';
import { WeatherAlertDevice, Mesure, TrafficAlertDevice, TrafficAlertData, Centrale, PhysicalDevice } from '@app/map/models';
import { MarkerTooltipWeatherComponent } from './marker-tooltip-weather/marker-tooltip-weather.component';
import { isNullOrUndefined, isArray, isUndefined } from 'util';
import { AppConfigService } from 'app-config.service';
@Component({
    selector: 'rmhub-marker',
    templateUrl: './marker.component.html',
    styleUrls: ['./marker.component.scss']
})

export class MarkerComponent extends MapBaseComponent implements OnInit, OnChanges {
    @Input() map: Map;
    markers: MarkerMetaData[] = [];
    polyLines: PolylineMetaData[] = [];
    roadMarkers: MarkerMetaData[] = [];
    @Input() coordinateRoad = [];
    optionsLine = {
        color: '#38AB58',
        weight: 2
    };
    objColor = {
        'green': '#38AB58',
        'black': '#4F4F4F',
        'pink': '#BDBDBD'
    };
    iconSize = [72, 86];
    iconSizeSpeed = ['auto', 'auto'];
    typeActive = 1;
    optionPopup = {
        maxWidth: 'auto', minWidth: 275, closeButton: false, autoClose: false, closeOnClick: false, className: CommonConstant.Class_Custom_Popup
    };
    radiusCircle;
    lineColors = CommonConstant.LINES_COLORS;
    lineWeight = {
        'weather': 16,
        'traffic': 8
    };
    linesOnSegment = {
        'weather': [0],
        'traffic': [0, 1]
    };
    arrayPopup: Popup = [];
    arrComponentSpeed: SpeedMetaData[] = [];
    offsetLat = 23;
    offsetLng = 72;
    wayLeft = 1;
    wayRight = 2;
    wayBalance = 3;
    pools = [1, 2];
    iconChangeLocation = '/assets/icon/weather/icon_finish_location.png';
    iconSizeChange = [70, 85];
    objOptionCreateMarker = {
        'createNew': 'createNew',
        'updated': 'updated'
    };
    timeChange = 10000;
    timeOutChangeLocation: Object = {};
    iconAlertWind = '/assets/icon/weather/icon_alert_wind.png';
    iconSizeAlertWind = [48, 48];
    @Input() currentTypeDevice;
    arrayMarkerAlertWind: MarkerMetaData[] = [];
    offsetAlertWind = 30;
    valueTechnicalNormal = CommonConstant.MapMesureWeather.valueTechnicalNormal;
    indexIconTechnical = 2;
    weatherTechnical: Object = {};
    offsetLineAndPopup = {
        y: 50
    };
    iconAnchorAlertWind = [80, 48];
    offsetToolTipAlertWind = [-58, 0];
    technicalErrorWeather = CommonConstant.MapMesureWeather.valueTechnicalError;
    offsetDiv = 5;
    indexOffset = 8;
    optionsLineTraffic = { weight: 8, offset: 4.5 };
    optionsLineTrafficByZoom = { weight: 8, offset: 0 };
    showIconTraffic = false;
    constructor(private translateService: TranslateService,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private configService: AppConfigService
    ) {
        super();
    }

    ngOnInit() {
        const configMap = this.configService.getConfig().map;
        this.radiusCircle = configMap.radiusCircle;
        this.showIconTraffic = configMap.showIconTraffic;
        this.setInitMap(this.map);
        this.onEventOpenPopup();
        this.onEventClosePopup();
    }
    ngOnChanges() {
    }
    // tslint:disable-next-line: use-life-cycle-interface
    ngDoCheck() {
        // since our components are dynamic, we need to manually iterate over them and trigger
        // change detection on them.
        this.markers.forEach(entry => {
            if (entry.componentInstance) {
                entry.componentInstance.changeDetectorRef.detectChanges();
            }
        });
        this.arrComponentSpeed.forEach(item => {
            if (item.componentInstance) {
                item.componentInstance.changeDetectorRef.detectChanges();
            }
        });
        this.roadMarkers.forEach(_entry => {
            if (_entry.componentInstance) {
                _entry.componentInstance.changeDetectorRef.detectChanges();
            }
        });
    }
    removeMarker(_marker) {
        // remove it from the array meta objects
        this.markers = this.markers.filter(element => element.id !== _marker.id);
        // remove the marker from the map
        if (_marker.markerInstance) {
            _marker.markerInstance.removeFrom(this.map);
        }
        if (_marker.polylineInstance) {
            _marker.polylineInstance.removeFrom(this.map);
        }
        // destroy the component to avoid memory leaks
        if (_marker.componentInstance) {
            _marker.componentInstance.destroy();
        }
    }

    removeAllMarker() {
        const arrMarkerRemove = this.markers;
        arrMarkerRemove.forEach((_marker) => {
            this.removeMarker(_marker);
        });
        this.arrayPopup.forEach(_pop => {
            _pop.removeFrom(this.map);
        });
        const arrComponentSpeedRemove = this.arrComponentSpeed;
        arrComponentSpeedRemove.forEach(itemSpeed => {
            this.arrComponentSpeed = this.arrComponentSpeed.filter(element => element.id !== itemSpeed.id && element.pool !== itemSpeed.pool);
            if (itemSpeed.markerInstance) {
                itemSpeed.markerInstance.removeFrom(this.map);
            }
            if (itemSpeed.componentInstance) {
                itemSpeed.componentInstance.destroy();
            }
        });
        this.roadMarkers.forEach(_roadMarker => {
            if (_roadMarker.markerInstance) {
                _roadMarker.markerInstance.removeFrom(this.map);
            }
            if (_roadMarker.polylineInstance) {
                _roadMarker.polylineInstance.removeFrom(this.map);
            }
            // destroy the component to avoid memory leaks
            if (_roadMarker.componentInstance) {
                _roadMarker.componentInstance.destroy();
            }
        });
        this.arrayMarkerAlertWind.forEach(_itemMarker => {
            _itemMarker.markerInstance.removeFrom(this.map);
        });

        this.markers = [];
        this.arrayPopup = [];
        this.arrComponentSpeed = [];
        this.polyLines = [];
        this.roadMarkers = [];
        this.arrayMarkerAlertWind = [];
    }
    makeDraggable(_popup, _map) {
        const lines = this.polyLines;
        const pos = _map.latLngToLayerPoint(_popup.getLatLng());
        const $data = _popup.options.data;
        DomUtil.setPosition(_popup._wrapper.parentNode, pos);
        const draggable = new Draggable(_popup._container, _popup._wrapper);
        draggable.enable();
        const $this = this;
        let newOffset = 0;
        if (!isUndefined(_popup.options.offset)) {
            const offsetPopup = _popup.options.offset;
            if (isArray(offsetPopup) && offsetPopup.length >= 2) {
                newOffset = Math.ceil(Math.abs(offsetPopup[1]) / this.offsetDiv);
            }
            if (!isUndefined(offsetPopup.y)) {
                newOffset = Math.ceil(Math.abs(offsetPopup.y) / this.offsetDiv);
            }
        }
        draggable.on('drag', function (e) {
            const arrNewPos = e.target._newPos;
            arrNewPos.y = arrNewPos.y - $this.offsetLineAndPopup.y - newOffset;
            const newSecondPoint = _map.layerPointToLatLng(arrNewPos);
            let firstPoint;
            let currentLine: PolylineMetaData;
            if ($data) {
                if ($data.beginPoint) {
                    firstPoint = $data.beginPoint;
                }
                currentLine = lines.find(x => x.id === $data.id);
                if ($data.typeDevice === CommonConstant.TITLE_TAP_MAP.traffic.type) {
                    currentLine = lines.find(line => line.id === $data.id && line.pool === $data.pool);
                }
                if (currentLine) {
                    if (currentLine.polyline.getLatLngs() && currentLine.polyline.getLatLngs().length > 0) {
                        firstPoint = currentLine.polyline.getLatLngs()[0];
                    }
                    currentLine.polyline.setLatLngs([firstPoint, newSecondPoint]);
                    currentLine.polyline.redraw();
                }
            }

        });
        draggable.on('dragend', function (e) {
            const arrNewPos = e.target._newPos;
            arrNewPos.y = arrNewPos.y + $this.offsetLineAndPopup.y + newOffset;
            const _pos = _map.layerPointToLatLng(arrNewPos);
            _popup.setLatLng(_pos);
        });
    }
    onEventOpenPopup() {
        this.map.on('popupopen', (e) => {
            const $data = e.popup.options.data;
            if ($data) {
                this.makeDraggable(e.target._popup, this.map);
                let firstPoint;
                let pool: any;
                const secondPoint = [e.target._popup._latlng.lat, e.target._popup._latlng.lng];
                let optionsLine = Object.assign({}, this.optionsLine);
                if ($data.color) {
                    optionsLine = Object.assign({}, optionsLine, { color: $data.color });
                }
                if ($data.beginPoint) {
                    firstPoint = $data.beginPoint;
                }
                if ($data.typeDevice === CommonConstant.TITLE_TAP_MAP.traffic.type) {
                    pool = $data.pool;
                }
                if (firstPoint && secondPoint) {
                    const itemPolyline: any = {
                        id: $data.id,
                        polyline: polyline([firstPoint, secondPoint], optionsLine).addTo(this.map),
                    };
                    if (pool) {
                        itemPolyline['pool'] = pool;
                    }
                    this.polyLines.push(itemPolyline);
                }
            }

        });
    }
    onEventClosePopup() {
        this.map.on('popupclose', (e) => {
            const $data = e.popup.options.data;
            if ($data) {
                let itemLine;
                itemLine = this.polyLines.find(poly => poly.id === $data.id);
                if ($data.typeDevice === CommonConstant.TITLE_TAP_MAP.traffic.type) {
                    itemLine = this.polyLines.find(poly => poly.id === $data.id && poly.pool === $data.pool);
                }

                if (itemLine) {
                    itemLine.polyline.removeFrom(this.map);
                    let index = this.polyLines.findIndex(item => item.id === itemLine.id);
                    if (itemLine['pool']) {
                        index = this.polyLines.findIndex(item => item.id === itemLine.id && item.pool === itemLine.pool);
                    }
                    if (index >= 0) {
                        this.polyLines.splice(index, 1);
                    }
                }
            }
        });
    }

    addDeviceOnMap(dataDevice: Array<any>, typeDevice: string, optionalCreate = '') {
        // simply iterate over the array of markers from our data service
        // and add them to the map
        for (const entry of dataDevice) {
            // dynamically instantiate a HTMLMarkerComponent
            const factory = this.resolver.resolveComponentFactory(MarkerPopupComponent);
            // we need to pass in the dependency injector
            const component = factory.create(this.injector);
            // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
            component.instance.deviceData = entry;
            component.instance.keyShowComponent = typeDevice;
            component.instance.typeActive = '';
            component.changeDetectorRef.detectChanges();
            // we need to manually trigger change detection on our in-memory component
            // s.t. its template syncs with the data we passed in
            let markerIcon;
            let m;
            let popupContent;
            let _popup;
            // create a new Leaflet marker at the given position
            const position = [entry.longitude, entry.latitude];
            let itemMarker: MarkerMetaData = null;
            switch (typeDevice) {
                case CommonConstant.TITLE_TAP_MAP.weather.type: {
                    const indexIcon = this.weatherTechnical[entry.externalId] ? this.indexIconTechnical : this.typeActive;
                    let iconUrl = CommonConstant.ICON_DEVICE[typeDevice][indexIcon];
                    if (optionalCreate && optionalCreate === this.objOptionCreateMarker.updated) {
                        iconUrl = this.iconChangeLocation;
                    }
                    const optionsMarkerIcon = {
                        iconUrl: iconUrl,
                        iconSize: this.iconSize,
                        iconAnchor: [Math.floor(this.iconSize[0] / 2), this.iconSize[1]],
                    };
                    markerIcon = icon(optionsMarkerIcon);
                    component.instance.weatherComponent.closePopup.subscribe(() => {
                        m.closePopup();
                    });
                    component.instance.weatherComponent.actionShowMore.subscribe(() => {
                        component.changeDetectorRef.detectChanges();
                        if (m.getPopup()) {
                            m.getPopup().update();
                        }
                    });
                    m = marker(position, { icon: markerIcon });

                    popupContent = component.location.nativeElement;
                    const optionPopup = { ...this.optionPopup, data: { id: entry.externalId, color: CommonConstant.CONSTANT_MAP.defaultColor, typeDevice, beginPoint: position } };
                    _popup = this.createPopup({ optionPopup, position, 'content': popupContent });
                    m.bindPopup(_popup);

                    if (m) {
                        m.addTo(this.map);
                    }
                    itemMarker = {
                        id: entry.externalId,
                        markerInstance: m,
                        componentInstance: component,
                        typeDevice: typeDevice
                    };
                    break;
                }
                case CommonConstant.TITLE_TAP_MAP.traffic.type: {
                    if (this.checkEventShowIconTraffic(this.showIconTraffic)) {
                        const iconUrl = CommonConstant.ICON_DEVICE[typeDevice];
                        const optionsMarkerIcon = {
                            iconUrl: iconUrl,
                            iconSize: this.iconSize,
                            iconAnchor: [Math.floor(this.iconSize[0] / 2), this.iconSize[1]],
                            className: 'map-marker-custom'
                        };
                        markerIcon = icon(optionsMarkerIcon);
                        m = marker(position, { icon: markerIcon });
                        if (m) {
                            m.addTo(this.map);
                        }
                        itemMarker = {
                            id: entry.externalId,
                            markerInstance: m,
                            typeDevice: typeDevice
                        };
                    }
                    break;
                }
            }
            // add a metadata object into a local array which helps us
            // keep track of the instantiated markers for removing/disposing them later
            if (itemMarker) {
                this.markers.push(itemMarker);
            }

        }
    }

    drawAlertDevice(dataDevice: Array<any>, typeDevice: string) {

        for (const entry of dataDevice) {
            const position = [entry.longitude, entry.latitude];
            const radiusCircle = this.radiusCircle[typeDevice];
            let $dataLine = {
                externalId: entry.externalId,
            };
            if (typeDevice === CommonConstant.TITLE_TAP_MAP.weather.type) {
                $dataLine = Object.assign({}, $dataLine, { isDrawByAlert: false });
            }
            const optionsPolyline = {
                lineWeight: this.lineWeight[typeDevice],
                lineColors: this.lineColors,
                linesOnSegment: this.linesOnSegment[typeDevice],
                dataLine: $dataLine,
            };
            const arrPoint = this.findPointOfCircle(this.coordinateRoad, position, radiusCircle);
            if (arrPoint.length > 0) {
                const arrPolyline = this.drawPolyline(arrPoint, optionsPolyline);
                for (const line of arrPolyline) {
                    const markerData: MarkerMetaData = {
                        id: entry.externalId,
                        typeDevice: typeDevice,
                        polylineInstance: line,
                    };
                    if (typeDevice === CommonConstant.TITLE_TAP_MAP.weather.type) {
                        line.removeFrom(this.map);
                    }
                    if (typeDevice === CommonConstant.TITLE_TAP_MAP.traffic.type) {
                        markerData.componentInstance = this.bindEventTraffic(entry, typeDevice, line);
                    }
                    this.roadMarkers.push(markerData);
                }
            }

        }
    }
    createPopup(options: { optionPopup: Object, position: Array<any>, content: string }): Popup {
        const _popup = popup(options.optionPopup).setLatLng(latLng(options.position)).setContent(options.content);
        return _popup;
    }
    eventLineRoadOfTraffic(line) {
        const _$this = this;
        line.on('click', function ($event) {
            const item = $event.target;
            const itemPopup = _$this.arrayPopup.find(_pop => {
                const $data = _pop.options.data || {};
                return $data.id === item.options.dataLine.externalId && $data.pool === item.options.dataLine.pool;
            });
            if (itemPopup && !itemPopup.isOpen()) {
                const _latLngOfLine = $event.target.getLatLngs();
                const _elementPoint = _$this.map.latLngToLayerPoint(_latLngOfLine[Math.floor(_latLngOfLine.length / 2)]);
                _elementPoint.y = _elementPoint.y + $event.target.options.offset;
                _elementPoint.x = _elementPoint.x + $event.target.options.offset;
                const _positionPopup = _$this.map.layerPointToLatLng(_elementPoint);
                itemPopup.options.data = Object.assign({}, itemPopup.options.data, { beginPoint: _positionPopup });
                itemPopup.setLatLng(_positionPopup);
                itemPopup.update();
                itemPopup.openOn(_$this.map);
            }
        });
    }
    bindEventTraffic(dataDevice, typeDevice, line: Polyline): ComponentRef<any> {
        const pool = line.options.dataLine.pool;
        const latLngOfLine = line.getLatLngs();
        const elementPoint = this.map.latLngToLayerPoint(latLngOfLine[Math.floor(latLngOfLine.length / 2)]);
        elementPoint.y = elementPoint.y + line.options.offset;
        elementPoint.x = elementPoint.x + line.options.offset;
        const positionPopup = this.map.layerPointToLatLng(elementPoint);
        const factory = this.resolver.resolveComponentFactory(MarkerPopupComponent);
        const component = factory.create(this.injector);
        const dataDeviceChange: Object = {};
        for (const key in dataDevice) {
            if (dataDevice.hasOwnProperty(key)) {
                dataDeviceChange[key] = dataDevice[key];
            }
        }
        dataDeviceChange['pools'] = [dataDevice['pools'].find((dataDev) => dataDev.poolValue === pool.toString())];
        component.instance.deviceData = dataDeviceChange;
        component.instance.keyShowComponent = typeDevice;
        component.changeDetectorRef.detectChanges();
        const popupContent = component.location.nativeElement;
        const optionPopup = { ...this.optionPopup, data: { id: dataDevice.externalId, color: CommonConstant.CONSTANT_MAP.defaultColor, pool: pool, typeDevice, beginPoint: positionPopup } };
        const _popup = this.createPopup({ optionPopup, position: positionPopup, 'content': popupContent });
        this.arrayPopup.push(_popup);
        component.instance.trafficComponent.closePopup.subscribe(() => {
            _popup.removeFrom(this.map);
        });
        this.eventLineRoadOfTraffic(line);
        const index = Math.floor((latLngOfLine.length) / 2);
        const pointPopupSpeed = latLngOfLine[Math.floor((latLngOfLine.length) / 2)];
        // check direction has change
        const defaultPoint = {
            lat: 0,
            lng: 0
        };
        const firstPoint = latLngOfLine[index - this.indexOffset] || defaultPoint;
        const secondPoint = latLngOfLine[index + this.indexOffset] || defaultPoint;
        const direction = this.detectDirection(firstPoint.lat, secondPoint.lat);
        this.createMarkerSpeed({ id: dataDevice.externalId, typeDevice, pool, direction }, pointPopupSpeed);
        let isDrawByZoom = true;
        if (pool === 2) {
            isDrawByZoom = false;
        }
        let $dataLine = line.options.dataLine || {};
        const weightLine = line.options.weight;
        const offsetLine = line.options.offset || 0;
        $dataLine = Object.assign({}, $dataLine, { isDrawByZoom, weight: weightLine, offset: offsetLine });
        this.updateOptionsPolyline(line, { dataLine: $dataLine });
        return component;
    }
    createMarkerSpeed(options: { id: string, typeDevice: string, pool: number, direction: number }, position: Array<any>) {
        const factory = this.resolver.resolveComponentFactory(MarkerSpeedComponent);
        const component = factory.create(this.injector);
        component.changeDetectorRef.detectChanges();
        let markerIcon;
        let m;
        const divIconContent = component.location.nativeElement;
        markerIcon = divIcon({
            html: divIconContent.innerHTML,
            iconSize: this.iconSizeSpeed,
            iconAnchor: this.calcAnchorPosition(options.pool, options.direction)
        });

        m = marker(position, { icon: markerIcon, ...options });
        if (m) {
            m.addTo(this.map);
        }
        this.arrComponentSpeed.push({
            ...options,
            componentInstance: component,
            markerInstance: m,
        });
        this.eventOpenPopupOfMarkerSpeed(m);
    }
    calcAnchorPosition(pool: number, direction: number): Array<any> {
        if (direction === this.wayBalance) {
            if (pool === this.pools[0]) {
                return [0, - this.offsetLat];
            } else {
                return [this.offsetLng, this.offsetLat * 2];
            }
        }
        if (direction === this.wayLeft) {
            if (pool === this.pools[0]) {
                return [- this.offsetLng / 2, - this.offsetLat / 2];
            } else {
                return [this.offsetLng * 1.5, this.offsetLat * 1.5];
            }
        } else {
            if (pool === this.pools[0]) {
                return [this.offsetLng * 1.5, - this.offsetLat];
            } else {
                return [- this.offsetLng / 2, this.offsetLat * 2];
            }
        }
    }
    detectDirection(latFirst: number, latLast: number): number {
        if (Math.abs(latFirst - latLast) < 0.00001) {
            return this.wayBalance;
        }
        return latFirst < latLast ? this.wayLeft : this.wayRight;
    }
    updateDataAlertTraffic(arrDataAlert: Array<any>) {
        const currentZoomLevel = this.map.getZoom();
        const isDrawOneLine = this.checkDrawRoadByZoom(currentZoomLevel);

        for (const entry of arrDataAlert) {
            const itemMarker = this.roadMarkers.filter(item => {
                return entry.externalId === item.id && item.typeDevice === CommonConstant.TITLE_TAP_MAP.traffic.type;
            });
            itemMarker.forEach(element => {
                const pool = element.polylineInstance.options.dataLine.pool;
                const dataAlert = entry.dataAlert.find(alert =>
                    element.polylineInstance.options.dataLine.pool === alert.pool
                );
                if (element.componentInstance) {
                    element.componentInstance.instance.alertDeviceData = dataAlert;
                    element.componentInstance.instance.trafficComponent.updated_at = entry.updated_at;
                    element.componentInstance.changeDetectorRef.detectChanges();
                }
                let optionsPolyline: Object = { color: CommonConstant.CONSTANT_MAP.defaultColor };
                if (dataAlert.alert.color) {
                    optionsPolyline = {
                        color: dataAlert.alert.color
                    };
                }
                this.updateOptionsPolyline(element.polylineInstance, optionsPolyline);
                const metaData = this.arrComponentSpeed.find(componentSpeed => {
                    return pool === componentSpeed.pool && element.id === componentSpeed.id;
                });
                if (metaData) {
                    metaData.componentInstance.instance.alertDeviceData = dataAlert;
                    metaData.componentInstance.changeDetectorRef.detectChanges();
                    this.updateSpeedRealTime(metaData, dataAlert);
                }
                const popupOfLine = this.arrayPopup.find(_popup => {
                    return pool === _popup.options.data.pool && _popup.options.data.id === element.id;
                });
                if (popupOfLine) {
                    let $dataLine = popupOfLine.options.data || {};
                    $dataLine = Object.assign({}, $dataLine, { color: optionsPolyline['color'] });
                    this.updateOptionsPopup(popupOfLine, { data: $dataLine });
                }
                const itemPolyline = this.polyLines.find(_polyline => {
                    return pool === _polyline.pool && _polyline.id === element.id;
                });
                if (itemPolyline) {
                    this.updateOptionsPolyline(itemPolyline.polyline, { color: optionsPolyline['color'] });
                }
                const index = this.prioritizeAlertTraffic(entry.dataAlert);
                this.showLineOfTrafficFollowZoom(element.polylineInstance, index, isDrawOneLine);
            });
        }
    }
    updateOptionsPolyline(line: Polyline, options: Object) {
        const currentOptions = line.options || {};
        const optionsChanged = Object.assign({}, currentOptions, options);
        line.setStyle(optionsChanged);
        line.redraw();
    }
    findPolyLinesMeta(id: string, pool: number = null): PolylineMetaData {
        let polyLinesMeta = this.polyLines.find(item => item.id === id);
        if (pool) {
            polyLinesMeta = this.polyLines.find(item => item.id === id && item.pool === pool);
        }
        return polyLinesMeta;
    }
    updateSpeedRealTime(speedMetaData: SpeedMetaData, data, options: Object = {}) {
        const currentZoomLevel = this.map.getZoom();
        const isShowItem = currentZoomLevel >= CommonConstant.CONSTANT_MAP.zoomLevel.threeLevel;
        speedMetaData.componentInstance.instance.alertDeviceData = data;
        speedMetaData.componentInstance.changeDetectorRef.detectChanges();
        const component = speedMetaData.componentInstance;
        const currentOptions = speedMetaData.markerInstance.options;
        const divIconContent = component.location.nativeElement;
        const markerIcon = divIcon(Object.assign({}, currentOptions.icon.options, { html: divIconContent.innerHTML }));
        if (speedMetaData.markerInstance) {
            speedMetaData.markerInstance.setIcon(markerIcon);
            speedMetaData.markerInstance.remove();
            if (isShowItem) {
                speedMetaData.markerInstance.addTo(this.map);
            }
        }
    }
    updateOptionsPopup(_popup: Popup, options: Object) {
        const currentOptions = _popup.options || {};
        const optionsChanged = Object.assign(currentOptions, options);
        _popup.options = optionsChanged;
    }
    updateOptionsIconMarker(_marker: Marker, optionsIcon: Object) {
        _marker.setIcon(optionsIcon);
    }
    createMarker(_position, options: Object) {
        return marker(_position, options);
    }
    updateLocationWeather(deviceInfo, arrDataAlert: Array<any> = []) {
        const _positionDevice = [deviceInfo.longitude, deviceInfo.latitude];
        const itemMarker = this.markers.find(item => item.id === deviceInfo.externalId);
        const itemRoadMarker = this.roadMarkers.find(item => item.id === deviceInfo.externalId);
        let previousIconMarker = CommonConstant.ICON_DEVICE[CommonConstant.TITLE_TAP_MAP.weather.type][this.typeActive];
        if (itemMarker) {
            if (itemMarker.markerInstance) {
                if (itemMarker.markerInstance.getPopup()) {
                    itemMarker.markerInstance.closePopup();
                    const _popup = itemMarker.markerInstance.getPopup();
                    const _optionPopup = _popup.options || {};
                    if (_optionPopup.hasOwnProperty('data')) {
                        let _optionDataPopup = _optionPopup.data || {};
                        _optionDataPopup = Object.assign({}, _optionDataPopup, { beginPoint: _positionDevice });
                        const _optionPopupChanged = Object.assign({}, _optionPopup, { data: _optionDataPopup });
                        this.updateOptionsPopup(_popup, _optionPopupChanged);
                    }
                }
                const _optionMarker = itemMarker.markerInstance.options || {};
                const _iconMarkerCurrent = _optionMarker.icon;
                const _iconMarkerChanged = {
                    iconUrl: this.iconChangeLocation,
                    iconSize: this.iconSize,
                    iconAnchor: [Math.floor(this.iconSize[0] / 2), this.iconSize[1]],
                };
                const markerIcon = icon(Object.assign({}, _iconMarkerCurrent.options, _iconMarkerChanged));
                itemMarker.markerInstance.setIcon(markerIcon);
                itemMarker.markerInstance.setLatLng(_positionDevice);

                const dataMesure = arrDataAlert.find(element => element.externalId === deviceInfo.externalId);
                if (dataMesure) {
                    this.showIconAlertWeather(itemMarker.markerInstance, dataMesure);
                }
                previousIconMarker = _iconMarkerCurrent.options.iconUrl;
            }
        } else {
            this.addDeviceOnMap([deviceInfo], CommonConstant.TITLE_TAP_MAP.weather.type, this.objOptionCreateMarker.updated);
            this.drawAlertDevice([deviceInfo], CommonConstant.TITLE_TAP_MAP.weather.type);
        }
        if (itemRoadMarker) {
            if (itemRoadMarker.polylineInstance) {
                const _radiusCircle = this.radiusCircle[CommonConstant.TITLE_TAP_MAP.weather.type];
                const arrPoint = this.findPointOfCircle(this.coordinateRoad, _positionDevice, _radiusCircle);
                itemRoadMarker.polylineInstance.setLatLngs(arrPoint);
                itemRoadMarker.polylineInstance.redraw();
            }
        }
        const itemMarkerUpdate = this.markers.find(item => item.id === deviceInfo.externalId);
        if (itemMarkerUpdate && itemMarkerUpdate.markerInstance) {
            const _optionsMarker = itemMarkerUpdate.markerInstance.options;
            const optionsMarkerIcon = {
                iconUrl: previousIconMarker,
                iconSize: this.iconSize,
                iconAnchor: [Math.floor(this.iconSize[0] / 2), this.iconSize[1]],
            };
            const _markerIcon = icon(Object.assign({}, _optionsMarker.icon.options, optionsMarkerIcon));
            this.timeOutChangeLocation[deviceInfo.externalId] = setTimeout(() => {
                itemMarkerUpdate.markerInstance.setIcon(_markerIcon);
                this.timeOutChangeLocation[deviceInfo.externalId] = null;
            }, this.timeChange);
        }
    }
    updateLocationTraffic(deviceInfo, arrDataAlert: Array<any> = []) {
        const arrItemRoadMarker = this.roadMarkers.filter(item => item.id === deviceInfo.externalId);
        this.roadMarkers = this.roadMarkers.filter(item => item.id !== deviceInfo.externalId);
        arrItemRoadMarker.forEach(itemRoadMarker => {
            if (itemRoadMarker.markerInstance) {
                itemRoadMarker.markerInstance.removeFrom(this.map);
            }
            if (itemRoadMarker.componentInstance) {
                itemRoadMarker.componentInstance.destroy();
            }
            if (itemRoadMarker.polylineInstance) {
                itemRoadMarker.polylineInstance.removeFrom(this.map);
            }
        });
        const arrItemPopup = this.arrayPopup.filter(_popup => {
            return _popup.options.data.id === deviceInfo.externalId;
        });
        arrItemPopup.forEach(_popup => {
            _popup.removeFrom(this.map);
        });
        this.arrayPopup = this.arrayPopup.filter(_popup => {
            return _popup.options.data.id !== deviceInfo.externalId;
        });
        const arrItemMarkerSpeed = this.arrComponentSpeed.filter(_element => _element.id === deviceInfo.externalId);
        this.arrComponentSpeed = this.arrComponentSpeed.filter(_element => _element.id !== deviceInfo.externalId);
        arrItemMarkerSpeed.forEach(itemMarkerSpeed => {
            if (itemMarkerSpeed.componentInstance) {
                itemMarkerSpeed.componentInstance.destroy();
            }
            if (itemMarkerSpeed.markerInstance) {
                itemMarkerSpeed.markerInstance.removeFrom(this.map);
            }
        });
        this.drawAlertDevice([deviceInfo], CommonConstant.TITLE_TAP_MAP.traffic.type);
        if (arrItemRoadMarker.length > 0) {
            this.updateDataAlertTraffic(arrDataAlert);
        }
        const _marker = this.markers.find(_item => _item.id === deviceInfo.externalId);
        if (_marker && _marker.markerInstance) {
            _marker.markerInstance.remove();
        }
        this.markers = this.markers.filter(_item => _item.id !== deviceInfo.externalId);
        this.addDeviceOnMap([deviceInfo], CommonConstant.TITLE_TAP_MAP.traffic.type);
    }
    createTooltipWeather(dataAlert: Object, optionTooltip: Object): Tooltip {
        const factory = this.resolver.resolveComponentFactory(MarkerTooltipWeatherComponent);
        const component = factory.create(this.injector);
        component.instance.alertDeviceData = dataAlert;
        component.changeDetectorRef.detectChanges();
        const tooltipContent = component.location.nativeElement;
        const _toolTip = tooltip(optionTooltip);
        _toolTip.setContent(tooltipContent);
        return _toolTip;
    }
    createMarkerAlertWeather(dataAlert, _position) {

        const optionsMarkerIcon = {
            iconUrl: this.iconAlertWind,
            iconSize: this.iconSizeAlertWind,
            iconAnchor: this.iconAnchorAlertWind,
        };
        const markerIcon = icon(optionsMarkerIcon);
        const _marker = marker(_position, { icon: markerIcon });

        if (_marker) {
            _marker.addTo(this.map);
        }
        return _marker;
    }
    checkTechnicalProblemWeather(communication: number, gateOpen: number, powerDefault: number): boolean {
        const firstCondition = (powerDefault === this.technicalErrorWeather || gateOpen === this.technicalErrorWeather);
        const secondCondition = communication === this.technicalErrorWeather;
        return firstCondition || secondCondition;
    }
    changeIconMarkerWeather(_marker, dataAlert) {
        const checkTechnical = this.checkTechnicalProblemWeather(dataAlert.communication.value_real, dataAlert.gateOpen.value_real, dataAlert.powerDefault.value_real);
        const indexIcon = checkTechnical ? this.indexIconTechnical : this.typeActive;
        this.weatherTechnical[dataAlert.externalId] = checkTechnical;
        if (this.timeOutChangeLocation[dataAlert.externalId]) {
            clearTimeout(this.timeOutChangeLocation[dataAlert.externalId]);
        }
        const _optionMarker = _marker.options || {};
        const _iconMarkerCurrent = _optionMarker.icon;
        const _iconMarkerChanged = {
            iconUrl: CommonConstant.ICON_DEVICE[CommonConstant.TITLE_TAP_MAP.weather.type][indexIcon],
        };
        const markerIcon = icon(Object.assign({}, _iconMarkerCurrent.options, _iconMarkerChanged));
        _marker.setIcon(markerIcon);
    }
    showIconAlertWeather(_marker, dataAlert) {
        const currentZoomLevel = this.map.getZoom();
        this.arrayMarkerAlertWind.forEach(_itemWind => {
            if (_itemWind.id === dataAlert.externalId) {
                _itemWind.markerInstance.closePopup();
                _itemWind.markerInstance.remove();
            }
        });
        this.arrayMarkerAlertWind = this.arrayMarkerAlertWind.filter(item => item.id !== dataAlert.externalId);
        if (dataAlert.alertWind && dataAlert.alertWind.alertCode) {
            const lngLatMarker = Object.assign({}, _marker.getLatLng());
            const optionToolTip = {
                direction: 'bottom',
                className: 'map-tooltip',
                offset: this.offsetToolTipAlertWind,
            };
            const _markerAlertWind = this.createMarkerAlertWeather(dataAlert, lngLatMarker);
            const _tooltipWind = this.createTooltipWeather(dataAlert.alertWind, optionToolTip);
            _markerAlertWind.bindTooltip(_tooltipWind);
            this.arrayMarkerAlertWind.push({
                id: dataAlert.externalId,
                markerInstance: _markerAlertWind,
                typeDevice: CommonConstant.TITLE_TAP_MAP.weather.type
            });
            if (currentZoomLevel < CommonConstant.CONSTANT_MAP.zoomLevel.threeLevel) {
                _markerAlertWind.remove();
            }
        }
    }
    updateDataAlertWeather(arrDataAlert: Array<any>) {
        const currentZoomLevel = this.map.getZoom();
        for (const entry of arrDataAlert) {
            const itemMarker = this.markers.find(item => {
                return entry.externalId === item.id && item.typeDevice === CommonConstant.TITLE_TAP_MAP.weather.type;
            });
            if (itemMarker) {
                if (itemMarker.componentInstance) {
                    itemMarker.componentInstance.instance.alertDeviceData = entry;
                    itemMarker.componentInstance.changeDetectorRef.detectChanges();
                }
                if (this.currentTypeDevice === CommonConstant.TITLE_TAP_MAP.weather.type) {
                    const itemRoadMarker = this.roadMarkers.find(item => {
                        return entry.externalId === item.id;
                    });
                    if (itemRoadMarker) {
                        const _optionLineCurrent = itemRoadMarker.polylineInstance.options;
                        const $dataLineCurrent = _optionLineCurrent.dataLine || {};
                        let isDrawByAlert = false;
                        let _optionLineChanged = {};
                        if (itemRoadMarker.polylineInstance.getTooltip()) {
                            itemRoadMarker.polylineInstance.getTooltip().remove();
                        }
                        if (entry.alertWeather && entry.alertWeather.alertCode) {
                            _optionLineChanged = Object.assign({}, _optionLineChanged, {
                                color: entry.alertWeather.color
                            });
                            const _tooltip = this.createTooltipWeather(entry.alertWeather, { direction: 'bottom', className: 'map-tooltip', sticky: true, offset: [0, 15] });
                            itemRoadMarker.polylineInstance.bindTooltip(_tooltip);
                            isDrawByAlert = true;
                        }
                        const $dataLineChanged = Object.assign({}, $dataLineCurrent, { isDrawByAlert });
                        _optionLineChanged = Object.assign({}, _optionLineChanged, {
                            dataLine: $dataLineChanged
                        });
                        const newOptionLine = Object.assign({}, _optionLineCurrent, _optionLineChanged);
                        this.updateOptionsPolyline(itemRoadMarker.polylineInstance, newOptionLine);
                        if (currentZoomLevel >= CommonConstant.CONSTANT_MAP.zoomLevel.threeLevel && isDrawByAlert) {
                            itemRoadMarker.polylineInstance.addTo(this.map);
                        } else {
                            itemRoadMarker.polylineInstance.removeFrom(this.map);
                        }
                    }

                }
                this.showIconAlertWeather(itemMarker.markerInstance, entry);
                this.changeIconMarkerWeather(itemMarker.markerInstance, entry);
            }
        }
    }
    changeLayerFollowZoom() {
        const _zoomLevel = this.map.getZoom();
        let showItem = false;
        const isShowOneLine = this.checkDrawRoadByZoom(_zoomLevel);
        if (_zoomLevel >= CommonConstant.CONSTANT_MAP.zoomLevel.threeLevel) {
            showItem = true;
        }
        this.changeLayerWayWhenZoom(showItem, isShowOneLine);
        this.changeLayerIconWhenZoom(showItem);
        this.changePopupOfTrafficWhenZoom(showItem);
        this.changePolylineWhenZoom();
        this.changeMarkerSpeedOfTrafficWhenZoom(showItem);
    }
    changeLayerIconWhenZoom(isShow: boolean) {
        this.markers.forEach(_marker => {
            if (isShow) {
                _marker.markerInstance.addTo(this.map);
            } else {
                _marker.markerInstance.closePopup();
                _marker.markerInstance.remove();
            }
        });
        this.arrayMarkerAlertWind.forEach(element => {
            if (isShow) {
                element.markerInstance.addTo(this.map);
            } else {
                element.markerInstance.remove();
            }
        });

    }
    changeLayerWayWhenZoom(isShow: boolean, isShowOneLine = false) {
        this.roadMarkers.forEach(item => {
            const _optionCurrent = item.polylineInstance.options || {};
            let check = isShow;
            if (item.typeDevice === CommonConstant.TITLE_TAP_MAP.weather.type) {
                let _isDrawByAlert = true;
                if (!isNullOrUndefined(_optionCurrent.dataLine) && !isNullOrUndefined(_optionCurrent.dataLine.isDrawByAlert)) {
                    _isDrawByAlert = _optionCurrent.dataLine.isDrawByAlert;
                }
                check = isShow && _isDrawByAlert;
            }
            if (item.typeDevice === CommonConstant.TITLE_TAP_MAP.traffic.type) {
                const $dataLine = _optionCurrent.dataLine || {};
                const pool = $dataLine.pool;
                let j = 1;
                if (pool === 2) {
                    j = -1;
                }
                let newWeight = this.optionsLineTraffic.weight;
                let newOffset = this.optionsLineTraffic.offset * j;
                if (isNullOrUndefined($dataLine.weight)) {
                    newWeight = $dataLine.weight;
                }
                if (isNullOrUndefined($dataLine.offset)) {
                    newOffset = $dataLine.offset;
                }
                if (isShowOneLine) {
                    let _isDrawByZoom = true;
                    if (!isNullOrUndefined(_optionCurrent.dataLine) && !isNullOrUndefined(_optionCurrent.dataLine.isDrawByZoom)) {
                        _isDrawByZoom = _optionCurrent.dataLine.isDrawByZoom;
                    }
                    check = isShow && _isDrawByZoom;
                    newWeight = this.optionsLineTrafficByZoom.weight;
                    newOffset = this.optionsLineTrafficByZoom.offset * j;
                }
                const optionsRoad = { weight: newWeight, offset: newOffset };
                this.updateOptionsPolyline(item.polylineInstance, optionsRoad);
            }
            if (check) {
                item.polylineInstance.addTo(this.map);
            } else {
                item.polylineInstance.removeFrom(this.map);
            }
            const line = item.polylineInstance;
            if (line) {
                this.changePopupWhenZoom(line);
            }
        });
    }
    changePopupWhenZoom(line) {
        const latLngOfLine = line.getLatLngs();
        const $dataLine = line.options.dataLine || {};
        const elementPoint = this.map.latLngToLayerPoint(latLngOfLine[Math.floor(latLngOfLine.length / 2)]);
        elementPoint.y = elementPoint.y + line.options.offset;
        elementPoint.x = elementPoint.x + line.options.offset;
        const positionPopup = this.map.layerPointToLatLng(elementPoint);
        const itemPopup = this.arrayPopup.find(_popup => {
            const $data = _popup.options.data || {};
            return $data.id === $dataLine.externalId && $data.pool === $dataLine.pool;
        });
        if (itemPopup) {
            let dataOptionPopup = itemPopup.options.data || {};
            dataOptionPopup = Object.assign({}, dataOptionPopup, { beginPoint: positionPopup });
            itemPopup.options.data = dataOptionPopup;
        }
    }
    convertCoordinate(coordinate, offset: { x?: number, y?: number } = { x: 0, y: 0 }) {
        offset = Object.assign({}, { x: 0, y: 0 }, offset);
        const elementPoint = this.map.latLngToLayerPoint(coordinate);
        elementPoint.y = elementPoint.y + offset.y;
        elementPoint.x = elementPoint.x + offset.x;
        return this.map.layerPointToLatLng(elementPoint);
    }
    changePolylineWhenZoom() {
        const _$this = this;
        this.map.eachLayer(function (layer) {
            if (layer.options && layer.options.data) {
                const _optionPopup = layer.options || {};
                const _$data = _optionPopup.data || {};
                let newOffset = 0;
                if (!isUndefined(_optionPopup.offset)) {
                    const offsetPopup = _optionPopup.offset;
                    if (isArray(offsetPopup) && offsetPopup.length >= 2) {
                        newOffset = Math.ceil(Math.abs(offsetPopup[1]) / _$this.offsetDiv);
                    }
                    if (!isUndefined(offsetPopup.y)) {
                        newOffset = Math.ceil(Math.abs(offsetPopup.y) / _$this.offsetDiv);
                    }
                }
                let itemRoad = _$this.polyLines.find(item => item.id === _$data.id);
                if (_$data.pool) {
                    itemRoad = _$this.polyLines.find(item => item.id === _$data.id && item.pool === _$data.pool);
                }
                if (itemRoad) {
                    const firstPoint = _$data.beginPoint;
                    const newSecondLatLng = _$this.convertCoordinate(layer.getLatLng(), { y: - _$this.offsetLineAndPopup.y - newOffset });
                    itemRoad.polyline.setLatLngs([firstPoint, newSecondLatLng]);
                    itemRoad.polyline.redraw();
                }
            }
        });
    }
    changePopupOfTrafficWhenZoom(isShow) {
        if (!isShow) {
            this.arrayPopup.forEach(_popup => {
                _popup.removeFrom(this.map);
            });
        }
    }
    checkDrawRoadByZoom(_zoom: number) {
        let check = false;
        if (_zoom <= CommonConstant.CONSTANT_MAP.zoomLevel.secondLevel && _zoom >= CommonConstant.CONSTANT_MAP.zoomLevel.threeLevel) {
            check = true;
        }
        return check;
    }
    prioritizeAlertTraffic(arrAlertTraffic: Array<any>): number {
        let j = 1;
        if (arrAlertTraffic.length >= 2) {
            const firstItem = arrAlertTraffic[0];
            const secondItem = arrAlertTraffic[1];
            if (!isNullOrUndefined(firstItem.alert) && !isNullOrUndefined(firstItem.alert.level) && !isNullOrUndefined(secondItem.alert) && !isNullOrUndefined(secondItem.alert.level)) {
                if (!isNullOrUndefined(firstItem.alert.color) && !isNullOrUndefined(secondItem.alert.color)) {
                    if (firstItem.alert.level < secondItem.alert.level) {
                        j = firstItem.pool;
                    } else {
                        if (firstItem.alert.level > secondItem.alert.level) {
                            j = secondItem.pool;
                        }
                    }
                } else {
                    if (!isNullOrUndefined(firstItem.alert.color)) {
                        j = firstItem.pool;
                    }
                    if (!isNullOrUndefined(secondItem.alert.color)) {
                        j = secondItem.pool;
                    }
                }
            } else {
                if (!isNullOrUndefined(firstItem.alert) && !isNullOrUndefined(firstItem.alert.level) && !isNullOrUndefined(firstItem.alert.color)) {
                    j = firstItem.pool;
                }
                if (!isNullOrUndefined(secondItem.alert) && !isNullOrUndefined(secondItem.alert.level) && !isNullOrUndefined(secondItem.alert.color)) {
                    j = secondItem.pool;
                }
            }
        }
        return j;
    }
    changeMarkerSpeedOfTrafficWhenZoom(isShow) {
        this.arrComponentSpeed.forEach(_itemSpeed => {
            if (isShow) {
                _itemSpeed.markerInstance.addTo(this.map);
            } else {
                _itemSpeed.markerInstance.remove();
            }
        });
    }
    eventOpenPopupOfMarkerSpeed(_marker: Marker) {
        const _$this = this;
        _marker.on('click', function ($event) {
            const item = $event.target;
            const itemPopup = _$this.arrayPopup.find(_pop => {
                const $data = _pop.options.data || {};
                return $data.id === item.options.id && $data.pool === item.options.pool;
            });
            let line = null;
            const itemLine = _$this.roadMarkers.find(element => {
                const $dataLine = element.polylineInstance.options.dataLine || {};
                return element.id === item.options.id && $dataLine.pool === item.options.pool;
            });
            if (itemLine && itemLine.polylineInstance) {
                line = itemLine.polylineInstance;
            }
            if (itemPopup && !itemPopup.isOpen()) {
                const optionsPopup = itemPopup.options || {};
                const dataOptionPopup = optionsPopup.data || {};
                let _positionPopup = dataOptionPopup.beginPoint || null;
                if (line) {
                    const _latLngOfLine = line.getLatLngs();
                    const _elementPoint = _$this.map.latLngToLayerPoint(_latLngOfLine[Math.floor(_latLngOfLine.length / 2)]);
                    _elementPoint.y = _elementPoint.y + line.options.offset;
                    _elementPoint.x = _elementPoint.x + line.options.offset;
                    _positionPopup = _$this.map.layerPointToLatLng(_elementPoint);
                    itemPopup.options.data = Object.assign({}, itemPopup.options.data, { beginPoint: _positionPopup });
                }
                if (_positionPopup) {
                    itemPopup.setLatLng(_positionPopup);
                }
                itemPopup.update();
                itemPopup.openOn(_$this.map);
            }
        });
    }
    showLineOfTrafficFollowZoom(line, poolTarget: number, isDrawOneLine: boolean) {
        const currentZoomLevel = this.map.getZoom();
        const optionsLineRoad = line.options;
        let dataLineRoad = optionsLineRoad.dataLine || {};
        const pool = dataLineRoad.pool;
        let j = 1;
        if (pool === 2) {
            j = -1;
        }
        let newWeight = this.optionsLineTraffic.weight;
        let newOffset = this.optionsLineTraffic.offset * j;
        if (isNullOrUndefined(dataLineRoad.weight)) {
            newWeight = dataLineRoad.weight;
        }
        if (isNullOrUndefined(dataLineRoad.offset)) {
            newOffset = dataLineRoad.offset;
        }
        const isDrawByZoom = pool === poolTarget;
        if (isDrawOneLine) {
            newWeight = this.optionsLineTrafficByZoom.weight;
            newOffset = this.optionsLineTrafficByZoom.offset * j;
            if (poolTarget === pool) {
                line.addTo(this.map);
            } else {
                line.remove();
            }
        } else {
            if (currentZoomLevel >= CommonConstant.CONSTANT_MAP.zoomLevel.firstLevel) {
                line.addTo(this.map);
            }
        }
        const optionsRoad = {
            weight: newWeight,
            offset: newOffset
        };
        dataLineRoad = Object.assign({}, dataLineRoad, { isDrawByZoom });
        const newOptionsLineRoad = Object.assign({}, optionsRoad, { dataLine: dataLineRoad });
        this.updateOptionsPolyline(line, newOptionsLineRoad);
    }
    checkEventShowIconTraffic(valueTarget: boolean | string): boolean {
        let output = false;
        if (typeof valueTarget === 'boolean') {
            output = valueTarget;
        } else {
            if (typeof valueTarget === 'string') {
                output = valueTarget.toLocaleLowerCase() === 'true';
            }
        }
        return output;
    }
}
