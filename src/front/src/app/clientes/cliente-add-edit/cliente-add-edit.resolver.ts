import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ClienteService } from '../cliente.service';
import { ClienteAddEditModel } from './cliente-add-edit.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteAddEditResolver implements Resolve<Observable<ClienteAddEditModel>> {

    constructor(private clienteService: ClienteService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClienteAddEditModel> {
        const id = route.params.id;
        return this.clienteService.getById(id);
    }
}
