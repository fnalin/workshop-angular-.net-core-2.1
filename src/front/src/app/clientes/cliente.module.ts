import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ClienteListModule } from './cliente-list/cliente-list.module';
import { ClienteAddEditModule } from './cliente-add-edit/cliente-add-edit.module';
import { NotificationModule } from '../Notification/notification.module';

@NgModule({
    imports: [
        HttpClientModule,
        ClienteListModule, ClienteAddEditModule, NotificationModule ],
    exports: [ ]
})
export class ClienteModule {}
