import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ClienteListComponent } from './cliente-list.component';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModalModule ],
    declarations: [ ClienteListComponent ]
})
export class ClienteListModule {}
