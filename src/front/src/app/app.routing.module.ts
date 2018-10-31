import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteListResolver } from './clientes/cliente-list/cliente-list.resolver';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'clientes', component: ClienteListComponent, resolve: { clientes: ClienteListResolver } },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
