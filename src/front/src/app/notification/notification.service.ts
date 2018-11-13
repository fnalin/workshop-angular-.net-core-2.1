import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastr: ToastrService) {}

    showSuccess(message, title) {
        this.toastr.success(message, title);
    }

    showSuccessHTMLMessage(message, title) {
        this.toastr.success(message, title, {
            enableHtml :  true
        });
    }

    showSuccessWithTimeout(message, title, timespan) {
        this.toastr.success(message, title , {
            timeOut :  timespan
        });
    }

    showError(message, title) {
        this.toastr.error(message, title);
    }

}
