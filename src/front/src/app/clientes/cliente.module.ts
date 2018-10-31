import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClienteListComponent } from './cliente-list/cliente-list.component';


@NgModule({
    imports: [ CommonModule, HttpClientModule ],
    declarations: [ ClienteListComponent ],
    exports: []
})
export class ClienteModule {}
