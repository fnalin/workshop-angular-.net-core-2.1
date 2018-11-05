import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { ClienteService } from '../cliente.service';
import { ClienteListModel } from './cliente-list.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteListResolver implements Resolve<Observable<ClienteListModel[]>> {

    constructor(private clienteService: ClienteService) {}

    resolve() {
        return this.clienteService.getAll();
    }

}
