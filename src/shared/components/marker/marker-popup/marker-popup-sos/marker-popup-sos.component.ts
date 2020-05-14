import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
   selector: 'rmhub-marker-popup-sos',
   templateUrl: './marker-popup-sos.component.html',
   styleUrls: ['./marker-popup-sos.component.css']
})
export class MarkerPopupSosComponent implements OnInit {
   @Input() markerData: any;
   @Input() typeActive = '';
   @Input() codeSOS = '';
   @Output() closePopup: EventEmitter<any> = new EventEmitter();

   constructor() { }

   ngOnInit() {
      this.markerData['typeActive'] = this.typeActive;
   }

   onClosePopup() {
      this.closePopup.emit();
   }
}
