import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

    constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {}

    clienteForm: FormGroup;
    ngOnInit() {
        // console.log(Object.keys(this.generos));
        // this.keys = Object.keys(this.generos).filter(key =>  typeof(this.generos[key]) !== 'number');
        // console.log(this.keys);
        // console.log(this.generos);

        this.formSetup();
    }

    formSetup() {

        this.clienteForm = this.formBuilder.group({
            nome: [null, [ Validators.required, Validators.minLength(5), this.validarStringSemNumeros ] ],
            sobrenome: [null,  [Validators.required, Validators.minLength(5), this.validarStringSemNumeros ] ],
            idade: [ null, [ Validators.required, Validators.min(18) ] ],
            sexo: [ null, Validators.required ]
        });
    }

    get nome() { return this.clienteForm.get('nome'); }

    validarStringSemNumeros(control: FormControl) {

        const re = /^[A-Za-z ]+$/;

        const texto: string = (control.value);

        if (!re.test(texto)) {
            return { stringComNumeros: true };
        }

        return null;
    }

    save() {
        const cliente: ClienteAddEditModel = {
            id: 0,
            nome: this.clienteForm.value.nome,
            sobrenome : this.clienteForm.value.sobrenome,
            idade: this.clienteForm.value.idade,
            sexo: this.clienteForm.value.sexo
        };
        // console.log(cliente);

         this.clienteService.add(cliente)
            .subscribe(data => {
                 console.log(data);
                 this.clienteForm.reset();
                },
                error => console.log(error));
    }

    write(data: any) {
        console.log(data);
    }
}

