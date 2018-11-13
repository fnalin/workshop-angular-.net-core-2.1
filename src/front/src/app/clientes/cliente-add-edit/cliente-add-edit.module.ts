import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClienteAddEditComponent } from './cliente-add-edit.component';
import { LoadingModule } from 'src/app/loading/loading.module';

@NgModule({
    imports: [ CommonModule, RouterModule, ReactiveFormsModule, LoadingModule ],
    declarations: [ ClienteAddEditComponent ],
    exports: []
})
export class ClienteAddEditModule {}
