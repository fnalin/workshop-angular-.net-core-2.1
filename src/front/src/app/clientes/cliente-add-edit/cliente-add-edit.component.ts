import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { ClienteService } from '../cliente.service';
import { Sexo, ClienteAddEditModel } from './cliente-add-edit.model';
import { NotificationService } from '../../notification/notification.service';


@Component({
    templateUrl: 'cliente-add-edit.component.html',
    styleUrls: ['cliente-add-edit.component.css']
})
export class ClienteAddEditComponent implements OnInit, AfterViewInit {

    title = 'Clientes';
    subtitle = 'Adicionar';
    keys: any[] = [1, 2];
    generos = Sexo;
    showLoadingIndicator = false;

    constructor(
        private clienteService: ClienteService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    clienteForm: FormGroup;
    ngOnInit() {

        this.formSetup();
        const id = this.activatedRoute.snapshot.params.id;
        if (id != null) {
            this.subtitle = 'Editar';
            const data = this.activatedRoute.snapshot.data.cliente;
            this.clienteForm.setValue(
                { 'id': data.id, 'nome': data.nome, 'sobrenome': data.sobrenome, 'idade': data.idade, 'sexo': data.sexo }
            );
        }
    }

    ngAfterViewInit(): void {
        const item: any = document.querySelector('#nomeInput');
        this.setFocus(item);
    }

    private setFocus(element: any) {
        if (element) {
            element.focus();
        }
    }

    private formSetup() {
        this.clienteForm = this.formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(5), this.validarStringSemNumeros]],
            sobrenome: [null, [Validators.required, Validators.minLength(5), this.validarStringSemNumeros]],
            idade: [null, [Validators.required, Validators.min(18)]],
            sexo: [null, Validators.required]
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
        this.showLoadingIndicator = true;
        const cliente: ClienteAddEditModel = {
            id: this.clienteForm.value.id,
            nome: this.clienteForm.value.nome,
            sobrenome: this.clienteForm.value.sobrenome,
            idade: this.clienteForm.value.idade,
            sexo: this.clienteForm.value.sexo
        };

        if (cliente.id === 0) {
            this.adicionarCliente(cliente);
        } else {
            this.editarCliente(cliente);
        }
    }
    editarCliente(cliente: ClienteAddEditModel): any {
        this.clienteService.edit(cliente)
            .subscribe(data => {
                this.notification.showSuccess(`Cliente alterado com sucesso!`, 'WorkShopNG2+');
                const item: any = document.querySelector('#nomeInput');
                this.setFocus(item);
            },
                error => {
                    this.notification.showError(`Erro ao tentar editar o cliente`, 'WorkShopNG2+');
                },
                () => this.showLoadingIndicator = false
            );
    }

    adicionarCliente(cliente: ClienteAddEditModel) {
        this.clienteService.add(cliente)
            .subscribe(data => {
                this.notification.showSuccess(`Cliente cadastrado com sucesso!`, 'WorkShopNG2+');
                this.clienteForm.reset();
                const item: any = document.querySelector('#nomeInput');
                this.setFocus(item);
            },
                error => {
                    this.notification.showError(`Erro ao tentar cadastrar o cliente`, 'WorkShopNG2+');
                },
                () => this.showLoadingIndicator = false
            );
    }

    write(data: any) {
        console.log(data);
    }
}

