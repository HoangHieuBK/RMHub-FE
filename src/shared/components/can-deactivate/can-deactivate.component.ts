import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { Subject } from 'rxjs';
import { isFunction } from 'util';

@Component({
  selector: 'app-can-deactivate',
  templateUrl: './can-deactivate.component.html',
  styleUrls: ['./can-deactivate.component.scss']
})
export class CanDeactivateComponent implements OnInit {
  canDeactivate$: Subject<boolean> = new Subject<boolean>();
  popUpModel: PopUpModel = new PopUpModel({ isVisible: false });
  routerChangedCallBack: Function;
  constructor(
    public translateService: TranslateService,
    public layoutSandbox: LayoutSandbox
  ) { }

  ngOnInit() {
    this.initPopUpModel();
  }

  initPopUpModel(): void {
    this.popUpModel = new PopUpModel({
      isVisible: false,
      title: this.translateService.instant('CanDeactive.Title'),
      message: this.translateService.instant('CanDeactive.Message'),
      textYes: this.translateService.instant('CanDeactive.Yes'),
      textNo: this.translateService.instant('CanDeactive.No'),
      funcYes: () => this.onYes(),
      funcNo: () => this.onNo()
    });
  }

  invokeCallback() {
    return isFunction(this.routerChangedCallBack) && this.routerChangedCallBack();
  }

  onYes(): void {
    this.invokeCallback();
    this.popUpModel.isVisible = false;
    this.canDeactivate$.next(true);
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
  }

  onNo(): void {
    this.popUpModel.isVisible = false;
    this.canDeactivate$.next(false);
    this.layoutSandbox.clearDeletingSticky();
  }

  canDeactivate(activate: boolean, callback?) {
    this.routerChangedCallBack = callback;
    if (activate) {
      return this.waitConfirmation();
    }
    this.invokeCallback();
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  waitConfirmation() {
    this.popUpModel.isVisible = true;
    return this.canDeactivate$;
  }
}
