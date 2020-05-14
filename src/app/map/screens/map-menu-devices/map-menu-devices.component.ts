import { Component, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { SideBarService } from '@shared/layouts/services/sidebars.service';
import { CommonConstant } from '@shared/common/constant.common';
import { Router } from '@angular/router';

@Component({
    selector: 'rmhub-map-menu-devices',
    templateUrl: './map-menu-devices.component.html',
    styleUrls: ['./map-menu-devices.component.scss']
})
export class MapMenuDevicesComponent implements OnInit, AfterViewInit {

    display = 'block';
    arrayMenuMap = [];
    currentTypeDevice: any;
    commonConstant = CommonConstant;
    constructor(
        public sideBarService: SideBarService,
        public router: Router,
    ) {
        this.currentTypeDevice = CommonConstant.TitleTapAllMap;
    }

    ngOnInit() {
        this.arrayMenuMap = this.sideBarService.arrayMenuMap;
        this.sideBarService.getCommonValue().subscribe(obj => {
            this.currentTypeDevice = obj.typeDevice;
        });
    }
    ngAfterViewInit(): void {
    }

    mapMenu(param) {

        let element: HTMLElement;
        element = document.querySelector('.page-sidebar-menu > li.open > a');
        let sub_menu: HTMLElement;
        sub_menu = document.querySelector('.page-sidebar-menu > li.open > ul.sub-menu');
        const isVisible = sub_menu && (sub_menu.style.display.toLocaleLowerCase() === this.display);
        if (element && isVisible) {
            const IdOfElement = element.getAttribute('id');
            if (IdOfElement !== param) {
                element.click();
            }
        }
        if (this.currentTypeDevice !== param) {
            this.sideBarService.changeTypeDevice(param);
        }
        this.router.navigateByUrl(CommonConstant.URL_PROJECT.map);
    }

}
