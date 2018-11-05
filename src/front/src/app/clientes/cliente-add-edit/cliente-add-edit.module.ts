import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteAddEditComponent } from './cliente-add-edit.component';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule ],
    declarations: [ ClienteAddEditComponent ],
    exports: []
})
export class ClienteAddEditModule {}
