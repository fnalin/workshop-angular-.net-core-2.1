import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClienteListModel } from './cliente-list.model';

@Component({
    templateUrl: 'cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {

    clientes: ClienteListModel[] = [];

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        // this.clientes = this.activatedRoute.snapshot.data['clientes'];
        this.clientes = this.activatedRoute.snapshot.data.clientes;
        // console.log(this.activatedRoute.snapshot);
    }
}
