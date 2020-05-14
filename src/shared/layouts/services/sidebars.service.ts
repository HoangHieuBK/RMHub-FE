import { Injectable, Output, EventEmitter } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SideBarService {
    typeDevice: string;
    currentLocation: string;
    arrayMenuMap: Array<any> = [];
    private behaviorSubject = new BehaviorSubject<any>(CommonConstant.TitleTapAllMap);
    constructor() {
        this.typeDevice = CommonConstant.TitleTapAllMap;
        this.currentLocation = CommonConstant.ROAD_ID_DEFAULT;
        const titleTapMap = CommonConstant.TITLE_TAP_MAP;
        for (const key in titleTapMap) {
            if (titleTapMap.hasOwnProperty(key)) {
                this.arrayMenuMap.push(titleTapMap[key]);
            }
        }
    }
    changeTypeDevice(_typeDevice: string) {
        this.typeDevice = _typeDevice;
        this.changeSubject();
    }
    changeLocation(_road) {
        this.currentLocation = _road;
        this.changeSubject();
    }
    getCommonValue(): Observable<any> {
        return this.behaviorSubject.asObservable();
    }
    private changeSubject() {
        this.behaviorSubject.next({ typeDevice: this.typeDevice, currentLocation: this.currentLocation });
    }
    clearSubject() {
        this.behaviorSubject.next('');
        this.behaviorSubject.complete();
    }
    changeMenuMap() {
        if (this.arrayMenuMap.length > 0) {
            const itemSelectAll = this.arrayMenuMap[0];
            if (itemSelectAll.name) {
                itemSelectAll.name = CommonConstant.TITLE_ROAD_OF_MAP[this.currentLocation];
                this.arrayMenuMap[0] = itemSelectAll;
            }
        }


    }
}
