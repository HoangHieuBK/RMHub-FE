export interface IConfirmPopupModel {
   // 1.confirm, 2-alert
   type?: number;
   title?: string;
   id?: string;
   content?: boolean;
   textYes?: string;
   textNo?: string;
   funcYes?: any;
   funcNo?: any;
   funcClose?: any;
}

export class ConfirmPopupModel implements IConfirmPopupModel {
   type?: number;
   title?: string;
   id?: string;
   content?: boolean;
   textYes?: string;
   textNo?: string;
   funcYes?: any;
   funcNo?: any;
   funcClose?: any;

   constructor(data?: any) {
      if (data) {
         for (const property in data) {
            if (data.hasOwnProperty(property)) {
               (<any>this)[property] = (<any>data)[property];
            }
         }
      }
   }
}
