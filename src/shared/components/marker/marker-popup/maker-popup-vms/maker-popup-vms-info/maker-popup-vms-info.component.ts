import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rmhub-maker-popup-vms-info',
  templateUrl: './maker-popup-vms-info.component.html',
  styleUrls: ['./maker-popup-vms-info.component.scss']
})
export class MakerPopupVmsInfoComponent implements OnInit {
  @ViewChild('vmsInfoElement') vmsInfoElement: ElementRef;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  showTable: boolean;
  constructor() { }
  ngOnInit() {
    this.showTable = true;
  }
  showInfo() {
    this.showTable = !this.showTable;
  }
  onClosePopup() {
    this.closePopup.emit();
  }
}
