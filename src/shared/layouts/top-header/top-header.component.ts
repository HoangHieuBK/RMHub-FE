import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/auth/service/user.service';
import { CommonConstant } from '@shared/common/constant.common';
import { SideBarService } from '../services/sidebars.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'rmhub-top-header',
    templateUrl: './top-header.component.html',
    styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit, OnChanges {

    timer: number;
    date: any;
    dropDownLocation = CommonConstant.LOCATION;
    dropDownLanguage = CommonConstant.LANGUAGE;

    currentLanguage = localStorage.getItem('currentLang.Culture') || CommonConstant.CURRENT_LANGUAGE.code;
    chooseLanguage: any;
    arrLanguageRest = [];
    timeDate = new Date();
    commonConstant = CommonConstant;
    currentLocation;
    constructor(private router: Router,
        private userService: UserService,
        public sideBarService: SideBarService,
        public translate: TranslateService
    ) {}

    ngOnInit() {
        this.userService.countDown();
        window.setInterval(() => {
            this.timer = this.userService.getUser().timer;
            if (this.timer === 0) {
                // this.logOut();
            }
        }, 0);
        this.updateListLanguage();
        setInterval(() => {
            this.timeDate = new Date();
        }, 1000);
        this.currentLocation = this.dropDownLocation.find(item => item.id === this.commonConstant.CODE_LOCATION_DEFAULT);
    }
    ngOnChanges(): void {
    }

    logOut() {
        if (localStorage.getItem('user')) {
            this.userService.clearTimer();
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        }
    }

    DateFormat(value: number): string {
        const hour: number = Math.floor(value / 3600);
        const minutes: number = Math.floor((value - hour * 3600) / 60);
        const second: number = (value - hour * 3600) - 60 * minutes;
        if (second < 10) {
            this.date = '0' + second;
        } else {
            this.date = second;
        }
        if (minutes < 10) {
            this.date = '0' + minutes + ':' + this.date;
        } else {
            this.date = minutes + ':' + this.date;
        }
        if (hour < 10) {
            this.date = '0' + hour + ':' + this.date;
        } else {
            this.date = hour + ':' + this.date;
        }
        return this.date;
    }

    changeLocation(road_id) {
        this.sideBarService.changeLocation(road_id);
        this.sideBarService.changeMenuMap();
    }


    useLanguage(language: string) {
        this.currentLanguage = language;
        this.updateListLanguage();
        this.translate.use(language);
        localStorage.setItem('currentLang.Culture', language);

    }
    updateListLanguage() {
        this.chooseLanguage = this.dropDownLanguage.find(item => {
            return item.code === this.currentLanguage;
        });
        this.arrLanguageRest = this.dropDownLanguage.filter(item => {
            return item.code !== this.currentLanguage;
        });
    }
}
