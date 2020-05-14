import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'rmhub-map-vms-manage',
    templateUrl: './map-vms-manage.component.html',
    styleUrls: ['./map-vms-manage.component.scss']
})
export class MapVmsManageComponent implements OnInit {

    @Input() ar: any[];
    @Input() editData: any;
    @Input() arr_img: any[];
    @Input() typeActive: string;

    temp = false;
    isCheckTemplate = false;
    remainLetter = 23;
    currentActive = -1;

    constructor() { }

    ngOnInit() {
    }

    chooseActive(index: number) {
        this.ar[index]['active'] = true;
    }

    showFolder(index: number) {
        this.temp = !this.temp;
        this.ar[index]['show'] = this.temp;
    }

    chooseActiveChild(i: number, j: number) {
        this.ar[i].list[j]['active'] = true;
    }

    templateShow(i: any) {
        this.isCheckTemplate = !this.isCheckTemplate;
    }

    onKey(value: any): void {
        const length = value.target.value.length;
        if (value) {
            this.remainLetter = 23 - length;
        }
    }

    onBtnSaveCommandClickR(): void {
        this.editData.imgR = this.arr_img[this.currentActive].path;
    }

}
