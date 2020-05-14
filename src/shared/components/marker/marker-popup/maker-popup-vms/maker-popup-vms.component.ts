import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy, OnChanges, ElementRef } from '@angular/core';
import { MakerPopupVmsInfoComponent } from './maker-popup-vms-info/maker-popup-vms-info.component';

@Component({
   selector: 'rmhub-maker-popup-vms',
   templateUrl: './maker-popup-vms.component.html',
   styleUrls: ['./maker-popup-vms.component.scss']
})
export class MakerPopupVmsComponent implements OnInit, OnChanges {
   @ViewChild('popupvms') element: ElementRef;
   @ViewChild('vmsinfoComponent') vmsinfoComponent: MakerPopupVmsInfoComponent;
   @Output() closePopup: EventEmitter<any> = new EventEmitter();
   @Output() openInfo: EventEmitter<any> = new EventEmitter();
   @Output() openEditVMS: EventEmitter<any> = new EventEmitter();
   @Output() openInforVMS: EventEmitter<any> = new EventEmitter();
   @Input() typeActive = '';
   @Input() codeVms = '';
   @Input() markerData: any;
   show = true;
   constructor() { }

   ngOnChanges() {
   }

   ngOnInit() {
      this.markerData['color'] = this.typeActive;
   }

   onClosePopup() {
      this.closePopup.emit();
   }
}
