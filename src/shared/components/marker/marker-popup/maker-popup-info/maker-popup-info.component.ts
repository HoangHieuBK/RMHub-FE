import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rmhub-maker-popup-info',
  templateUrl: './maker-popup-info.component.html',
  styleUrls: ['./maker-popup-info.component.scss']
})
export class MakerPopupInfoComponent implements OnInit {
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClosePopup() {
    this.closePopup.emit();
  }

}
