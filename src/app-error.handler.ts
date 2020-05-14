import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppErrorHandler extends ErrorHandler {
    constructor() {
        super();
    }

    handleError(error) {
        super.handleError(error);
    }
}
