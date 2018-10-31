import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {

    clientes: Cliente[] = [];

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.clientes = this.activatedRoute.data['clientes'];
    }
}
