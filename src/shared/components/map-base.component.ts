
import { divIcon, DomUtil, Draggable, icon, latLng, LayerGroup, marker, polyline, Polyline, popup, Popup, map, circle, tooltip, Tooltip, point, Marker, Circle, Map } from 'leaflet';
import 'leaflet-polylineoffset';
import { CommonConstant } from '@shared/common/constant.common';
export class MapBaseComponent {

    private _map: Map;
    private maxDistance = CommonConstant.CONSTANT_MAP.maxDistance;
    public setInitMap(_map) {
        this._map = _map;
    }
    public cloneArray(a: any, b: any): Array<any> {
        const d = this._map.distance(a, b);
        if (d < this.maxDistance) {
            return [a];
        }
        const line = polyline([a, b]);
        const c = line.getBounds().getCenter();
        return this.cloneArray(a, c).concat(this.cloneArray(c, b));
    }
    public repairData(inputData: Array<any>): Array<any> {
        let outputData = [];
        inputData.forEach((item, i) => {
            if (i === inputData.length - 1) {
                outputData.push(item);
            } else {
                outputData = outputData.concat(this.cloneArray(item, inputData[i + 1]));
            }
        });
        return outputData;
    }
    public drawPolyline(arrCoordinate, options: { lineWeight: number, lineColors: Array<string>, linesOnSegment: Array<number>, dataLine?: any, _popup?: Popup[], optionsPath?: Object }): Array<Polyline> {
        const busLines = new LayerGroup();
        let segmentWidth;
        const linesOnSegment = options.linesOnSegment;
        const lineWeight = options.lineWeight;
        const arrPolyline: Polyline[] = [];

        segmentWidth = linesOnSegment.length * (lineWeight + 1);
        for (let j = 0; j < linesOnSegment.length; j++) {
            const dataLine: Object = {};
            for (const key in options.dataLine) {
                if (options.dataLine.hasOwnProperty(key)) {
                    dataLine[key] = options.dataLine[key];
                }
            }
            dataLine['pool'] = linesOnSegment.length - j;
            const polylineRoad = polyline(arrCoordinate, {
                color: options.lineColors[linesOnSegment[j]],
                weight: lineWeight,
                offset: j * (lineWeight + 1) - (segmentWidth / 2) + ((lineWeight + 1) / 2),
                lineCap: 'butt',
                dataLine: dataLine,
                ...options.optionsPath
            }).addTo(busLines);
            arrPolyline.push(polylineRoad);
        }
        busLines.addTo(this._map);
        return arrPolyline;
    }
    public findPointOfCircle(arrCoordinate, positionCircle, radiusCircle): Array<any> {
        const arrPoint = [];
        arrCoordinate.forEach(element => {
            if ((this._map.distance(positionCircle, element) <= radiusCircle)) {
                arrPoint.push(element);
            }
        });
        return arrPoint;
    }
}
