import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [],
    imports: [ BrowserAnimationsModule, ToastrModule.forRoot() ],
    exports: [ ]
})
export class NotificationModule {}
