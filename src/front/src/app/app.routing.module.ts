import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteListResolver } from './clientes/cliente-list/cliente-list.resolver';
import { ClienteAddEditComponent } from './clientes/cliente-add-edit/cliente-add-edit.component';
import { ClienteAddEditResolver } from './clientes/cliente-add-edit/cliente-add-edit.resolver';
import { AuthGuard } from './sign/auth.guard';

// pathMatch: 'full'=> não vincula partes da rota, ou seja, tem que ser todo o endereço
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },

    {
        // path q será a raiz da rota filha
        path: 'sign',
        loadChildren: './sign/sign.module#SignModule'
        /*
            sign.module: arquivo físico do módulo
            SignModule nome da classe onde está o módulo
         */
    },

    { path: 'about', component: AboutComponent },

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
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
