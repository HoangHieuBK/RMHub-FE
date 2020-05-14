import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'rmhub-marker-popup-camera',
  templateUrl: './marker-popup-camera.component.html',
  styleUrls: ['./marker-popup-camera.component.scss']
})
export class MarkerPopupCameraComponent implements OnInit {
  @Input() markerData: any;
  @Input() typeActive = '';
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  @Input() titleCamera = '';
  @Input() videoLive = '';
  constructor() { }

  ngOnInit() {
    this.markerData['color'] = this.typeActive;
  }

  onClosePopup() {
    this.closePopup.emit();
  }
}
