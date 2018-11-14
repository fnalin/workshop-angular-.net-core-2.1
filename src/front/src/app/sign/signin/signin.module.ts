import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './signin.component';

@NgModule({
    declarations: [ SignInComponent ],
    imports: [ RouterModule, CommonModule, ReactiveFormsModule],
    exports: []
})
export class SignInModule {}
