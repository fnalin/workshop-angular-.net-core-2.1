import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ClienteListModule } from './cliente-list/cliente-list.module';
import { ClienteAddEditModule } from './cliente-add-edit/cliente-add-edit.module';


@NgModule({
    imports: [
        HttpClientModule,
        ClienteListModule, ClienteAddEditModule ],
    exports: []
})
export class ClienteModule {}
