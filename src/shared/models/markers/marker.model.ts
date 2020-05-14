
import { ComponentRef } from '@angular/core';
import { tileLayer, latLng, marker, Marker, icon, popup, Draggable, DomUtil, Browser, imageOverlay, polyline, Popup, Polyline, LayerGroup, divIcon, circle } from 'leaflet';
import { MarkerPopupComponent } from '@shared/components/marker/marker-popup/marker-popup.component';


export interface MarkerMetaData {
    id: string;
    typeDevice: string;
    markerInstance?: Marker;
    componentInstance?: ComponentRef<any>;
    polylineInstance?: Polyline;
}
export interface PolylineMetaData {
    id: string;
    polyline: Polyline;
    pool?: number;
}
export interface SpeedMetaData {
    id: string;
    typeDevice: string;
    markerInstance?: Marker;
    componentInstance?: ComponentRef<any>;
    pool: number;
    direction?: number;
}
