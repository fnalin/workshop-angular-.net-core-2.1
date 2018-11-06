import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClienteAddEditComponent } from './cliente-add-edit.component';

@NgModule({
    imports: [ CommonModule, RouterModule, ReactiveFormsModule ],
    declarations: [ ClienteAddEditComponent ],
    exports: []
})
export class ClienteAddEditModule {}
