import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ClienteListModule } from './cliente-list/cliente-list.module';
import { ClienteAddEditModule } from './cliente-add-edit/cliente-add-edit.module';
import { NotificationModule } from '../Notification/notification.module';
import { RequestInterceptor } from '../sign/request.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
        ClienteListModule, ClienteAddEditModule, NotificationModule ],
    exports: [ ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class ClienteModule {}
