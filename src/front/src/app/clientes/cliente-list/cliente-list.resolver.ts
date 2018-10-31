import { Injectable } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Resolve } from '@angular/router';

import { Cliente } from '../cliente';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClienteListResolver implements Resolve<Observable<Cliente[]>> {

    constructor(private clienteService: ClienteService) {}

    resolve() {
        return this.clienteService.getAll();
    }

}
