import {
    Component,
    ElementRef,
    OnInit
} from '@angular/core';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { LeftSideBars, NavItems } from '../services/left-sidebars.service';
import { Router, NavigationEnd } from '@angular/router';
import { SideBarService } from '../services/sidebars.service';
import { CommonConstant } from '@shared/common/constant.common';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'rmhub-left-sidebars',
    templateUrl: './left-sidebars.component.html',
    styleUrls: ['./left-sidebars.component.scss']
})
export class LeftSidebarsComponent implements OnInit {

    navbar: LeftSideBars[] = NavItems;
    public isItemCurrent: Object = {};
    arrImgSidebarToggler: Array<string> = [
        '/assets/icon/ic_sidebar-toggler-close.png',
        '/assets/icon/ic_sidebar-toggler-open.png'
    ];
    imgSidebarToggler = '';
    isChoseToggler = false;
    display = 'block';
    classActive = 'open';
    currentTypeDevice: any;
    titleMap = CommonConstant.TitleTapAllMap;
    constructor(
        public layoutSandbox: LayoutSandbox,
        public router: Router,
        public sideBarService: SideBarService,
        private elementRef: ElementRef,
    ) {
        this.currentTypeDevice = this.titleMap;
        this.sideBarService.changeTypeDevice(this.currentTypeDevice);
    }
    ngOnInit(): void {
        this.openMenuByUrl();
        this.imgSidebarToggler = this.arrImgSidebarToggler[+this.isChoseToggler];
        let arrCookie: Array<string> = document.cookie.split(';');
        arrCookie = arrCookie.map((element) => {
            return element.replace(/^\s+/g, '');
        });
        if (arrCookie.indexOf('isSidebarClose=1') >= 0) {
            this.isChoseToggler = true;
            this.imgSidebarToggler = this.arrImgSidebarToggler[+this.isChoseToggler];
        }
        this.sideBarService.getCommonValue().subscribe(obj => {
            this.currentTypeDevice = obj.typeDevice;
        });
    }

    updateSubMenuCurrent() {
        this.navbar.forEach((item, i) => {
            if (item.children.length > 0 && item.type) {
                if (item.url && this.router.isActive(item.url, true)) {
                    this.sideBarService.changeTypeDevice(item.type);
                }
                item.children.forEach((_element, j) => {
                    if (_element.url && this.router.isActive(_element.url, true)) {
                        this.sideBarService.changeTypeDevice(item.type);
                        return;
                    }
                });
            }
        });
    }

    eventSidebarToggler() {
        this.isChoseToggler = !this.isChoseToggler;
        this.imgSidebarToggler = this.arrImgSidebarToggler[+this.isChoseToggler];
    }

    changeMenu(item, index?: number) {
        if (!isNullOrUndefined(index)) {
            this.openTabMenu(item);
            const element = this.elementRef.nativeElement.querySelector('.page-sidebar-menu > li.open > a');
            const sub_menu = this.elementRef.nativeElement.querySelector('.page-sidebar-menu > li.open > ul.sub-menu');
            const isVisible = sub_menu && (sub_menu.style.display.toLocaleLowerCase() === this.display);
            if (element && isVisible) {
                element.click();
            }
            if (item !== this.currentTypeDevice) {
                this.sideBarService.changeTypeDevice(item);
            }
            if (index === 0) {
                const subItemMap = this.elementRef.nativeElement.querySelector('.mapView');
                subItemMap.classList.add(this.classActive);
            } else {
                this.router.navigateByUrl(CommonConstant.URL_PROJECT.map);
            }
        } else {
            this.currentTypeDevice = item;
        }
    }

    openTabMenu(deviceType: string) {
        if (deviceType === this.currentTypeDevice) {
            this.openTab(deviceType);
            this.openIcon(deviceType);
        }
    }

    openTab(deviceType: string) {
        const menu = document.getElementById(deviceType);
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        } else {
            menu.classList.add('open');
        }
    }

    openIcon(deviceType: string) {
        const open = document.getElementById(deviceType + '_icon_open');
        if (open.classList.contains('open')) {
            open.classList.remove('open');
        } else {
            open.classList.add('open');
        }
    }

    openMenuByUrl() {
        this.activeMenuTabByUrl(this.router.url);
        this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.activeMenuTabByUrl(e.url);
            }
        });
    }

    activeMenuTabByUrl(url: string) {
        this.updateSubMenuCurrent();
        this.checkCurrentMenuByUrl(url);
    }

    checkCurrentMenuByUrl(url: string) {
        if (url.includes(CommonConstant.URL_TRAFFIC_LOGGER.detail)) {
            this.currentTypeDevice = CommonConstant.TITLE_TAP_MAP.traffic.type;
            this.sideBarService.changeTypeDevice(this.currentTypeDevice);
        }
        if (url.includes(CommonConstant.URL_WEATHER_STATION.detail)) {
            this.currentTypeDevice = CommonConstant.TITLE_TAP_MAP.weather.type;
            this.sideBarService.changeTypeDevice(this.currentTypeDevice);
        }
    }

    activeSubTabMenu(url: string): boolean {
        if (url === CommonConstant.URL_TRAFFIC_LOGGER.list || url === CommonConstant.URL_WEATHER_STATION.list) {
            return this.typeOfDeviceDetail(this.router.url, url);
        }
        return false;
    }

    typeOfDeviceDetail(urlRouter, urlGet) {
        if (urlRouter.includes(urlGet)) {
            return true;
        }
    }
}
