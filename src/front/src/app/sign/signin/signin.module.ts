import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './signin.component';
import { LoadingModule } from 'src/app/loading/loading.module';

@NgModule({
    declarations: [ SignInComponent ],
    imports: [ RouterModule, CommonModule, ReactiveFormsModule, LoadingModule],
    exports: []
})
export class SignInModule {}
