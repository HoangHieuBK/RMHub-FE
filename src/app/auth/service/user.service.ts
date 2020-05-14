import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    timeOut = 8 * 3600;
    constructor() { }
    user: User = {
        username: 'admin',
        password: 'admin',
        timer: this.timeOut
    };
    intervalId = 0;

    getUser(): User {
        return this.user;
    }

    clearTimer() { clearInterval(this.intervalId); }

    countDown() {
        this.clearTimer();
        this.intervalId = window.setInterval(() => {
            this.user.timer -= 1;
            if (this.user.timer <= 0) {
                this.clearTimer();
            }
        }, 1000);
    }
}
