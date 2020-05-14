import { Router, NavigationEnd } from '@angular/router';
import { LayoutSandbox } from './layouts.sandbox';
import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit, Host, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '@shared/models';
import { AppSandbox } from '@app/app.sandbox';


import { strings as deStrings } from 'ngx-timeago/language-strings/de';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { TimeagoIntl } from 'ngx-timeago';


@Component({
    selector: 'rmhub-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit, OnDestroy, AfterViewInit {

    private subscriptions = new Subscription();
    lang = 'de';
    min_height = window.innerHeight + 'px';
    constructor(
        private router: Router,
        private intl: TimeagoIntl,
        public layoutSandbox: LayoutSandbox,
        private appSandbox: AppSandbox) {

    }

    ngOnInit() {
        this.appSandbox.setupRoles();
        this.appSandbox.registerEvents();
        this.registerEvents();
        this.setLang(this.lang);
        this.subscriptions.add(this.layoutSandbox.selectedLang$.subscribe(lang => {
            this.setLang(lang);
        }));
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.min_height = window.innerHeight + 'px';
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    private registerEvents() {
        // Subscribes to user changes
    }
    setLang(lang: string) {
        this.lang = lang;
        switch (lang) {
            case 'en': this.intl.strings = englishStrings; break;
            case 'de': this.intl.strings = deStrings; break;
            default: break;
        }
        this.intl.changes.next();
    }
}
