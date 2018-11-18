import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteListResolver } from './clientes/cliente-list/cliente-list.resolver';
import { ClienteAddEditComponent } from './clientes/cliente-add-edit/cliente-add-edit.component';
import { ClienteAddEditResolver } from './clientes/cliente-add-edit/cliente-add-edit.resolver';
import { SignInComponent } from './sign/signin/signin.component';
import { AuthGuard } from './sign/auth.guard';
import { SignUpComponent } from './sign/signup/signup.component';
import { SignComponent } from './sign/sign.component';

const routes: Routes = [
    { path: '', component: HomeComponent },

    {
        path: 'sign',
        component: SignComponent,
        children: [
            { path: 'in', component: SignInComponent },
            { path: 'up', component: SignUpComponent }
        ]
    },

    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },

    {
        path: 'clientes',
        component: ClienteListComponent,
        resolve: { clientes: ClienteListResolver },
        canActivate: [AuthGuard]
    },

    {
        path: 'clientes/add',
        component: ClienteAddEditComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'clientes/edit/:id',
        component: ClienteAddEditComponent,
        resolve: { cliente: ClienteAddEditResolver },
        canActivate: [AuthGuard]

    },

    { path: '404', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
