import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClienteService } from '../cliente.service';
import { Sexo, ClienteAddEditModel } from './cliente-add-edit.model';


@Component({
    templateUrl: 'cliente-add-edit.component.html',
    styleUrls: ['cliente-add-edit.component.css']
})
export class ClienteAddEditComponent implements OnInit {

    title = 'Clientes';
    subtitle = 'Adicionar';
    keys: any[] = [ 1, 2 ];
    generos = Sexo;

    cliente: ClienteAddEditModel = {
        id: 0, nome: '', sobrenome : '', idade: 0, sexo: null
    };

    constructor(private clienteService: ClienteService) {}

    frm: FormGroup;
    ngOnInit() {
        // console.log(Object.keys(this.generos));
        // this.keys = Object.keys(this.generos).filter(key =>  typeof(this.generos[key]) !== 'number');
        // console.log(this.keys);
        // console.log(this.generos);

        this.frm = new FormGroup({
            'idade': new FormControl(this.cliente.idade, [
              Validators.required,
              Validators.min(18),
            ])
          });
    }

    save(frm: FormGroup) {
        // console.log(frm);
        this.clienteService.add(this.cliente)
            .subscribe(data => console.log(data), error => console.log(error) );
    }

    write(data: any) {
        console.log(data);
    }

}

