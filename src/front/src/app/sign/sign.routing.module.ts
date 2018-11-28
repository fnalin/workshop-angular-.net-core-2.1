import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignComponent } from './sign.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',
        component: SignComponent,
        children: [
            { path: 'in', component: SignInComponent },
            { path: 'up', component: SignUpComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignRoutingModule { }
