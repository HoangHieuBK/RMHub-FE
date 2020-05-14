import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'rmhub-map-vms-edit',
    templateUrl: './map-vms-edit.component.html',
    styleUrls: ['./map-vms-edit.component.scss']
})
export class MapVmsEditComponent implements OnInit, OnChanges {

    @Output() btnSendClick: EventEmitter<any> = new EventEmitter();
    @Input() typeActive = '';
    @Input() markerData: any;
    @ViewChild('closeModal') closeModal: ElementRef;
    editData: any = {};
    isCheckModalImg: false;
    currentActive = -1;
    @Input() name: string;
    arr_img: any[] = [
        {
            path: 'http://c10.labocom.fr/pcpmv/XML/referentiel/images/mivisu/base/TGG_64_eteint.PNG', choose: false
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        },
        {
            path: '/assets/img/img-signboards.png'
        }
    ];


    remainLetter = 23;

    ar = [
        {
            line: 'lines 1_lines',
            list: [
                {
                    child1: 'ACC',
                    list2: [
                        { child2: 'Accident' }
                    ]
                },
            ]
        },
        {
            line: 'lines 2_lines',
            list: []
        },
        {
            line: 'lines 3_lines',
            list: [
                {
                    child1: 'ACC',
                    list2: [
                        { child2: 'Accident' }
                    ]
                },
            ]
        },
        {
            line: 'lines 4_lines',
            list: []
        },
        {
            line: 'lines 5_lines',
            list: []
        },
        {
            line: 'lines 6_lines',
            list: []
        }
    ];
    temp = false;
    isCheckTemplate = false;
    constructor() { }

    ngOnInit() { }

    showFolder(index: number) {
        this.temp = !this.temp;
        this.ar[index]['show'] = this.temp;
    }
    templateShow(i: any) {
        this.isCheckTemplate = !this.isCheckTemplate;
    }

    chooseActive(index: number) {
        this.ar[index]['active'] = true;
    }

    chooseActiveChild(i: number, j: number) {
        this.ar[i].list[j]['active'] = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['markerData'].currentValue) {
            this.editData = { ...this.markerData.vmsData };
        }
        if (this.markerData !== undefined) {
            this.typeActive = this.markerData['color'];
        }
    }


    getImg(index: number) {
        this.currentActive = index;
        for (let i = 0; i < this.arr_img.length; i++) {
            this.arr_img[i].choose = false;
        }

        this.arr_img[index]['choose'] = true;
    }
    onKey(value: any): void {
        const length = value.target.value.length;
        if (value) {
            this.remainLetter = 23 - length;
        }
    }
    onBtnSendClick() {
        this.markerData.vmsData = { ...this.editData };
        this.closeModal.nativeElement.click();
        this.btnSendClick.emit();
    }

    onBtnSaveCommandClickL(): void {
        this.editData.imgL = this.arr_img[this.currentActive].path;
    }
    onBtnSaveCommandClickR(): void {
        this.editData.imgR = this.arr_img[this.currentActive].path;
    }

}
