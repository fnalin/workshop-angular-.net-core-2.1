import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignUpComponent } from './signup.component';
import { LoadingModule } from 'src/app/loading/loading.module';

@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule, RouterModule, ReactiveFormsModule,
        LoadingModule
    ],
    exports: []
})
export class SignUpModule { }
