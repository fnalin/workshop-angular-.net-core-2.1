import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClienteListComponent } from './cliente-list.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ ClienteListComponent ]
})
export class ClienteListModule {}
