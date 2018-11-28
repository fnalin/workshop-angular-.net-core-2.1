import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

import { ClienteService } from '../cliente.service';
import { Sexo, ClienteAddEditModel } from './cliente-add-edit.model';
import { NotificationService } from '../../notification/notification.service';


@Component({
    templateUrl: 'cliente-add-edit.component.html',
    styleUrls: ['../../pages/css/forms.css']
})
export class ClienteAddEditComponent implements OnInit, AfterViewInit {

    title = 'Clientes';
    subtitle = 'Adicionar';
    keys: any[] = [1, 2];
    generos = Sexo;
    showLoadingIndicator = false;
    id = 0;
    file: File; // recebe o valor no (change) do input
    previewBase64: string; // recebe o base 64 da foto

    constructor(
        private clienteService: ClienteService,
        private formBuilder: FormBuilder,
        private sanitizer: DomSanitizer,
        private notification: NotificationService,
        private activatedRoute: ActivatedRoute) { }

    clienteForm: FormGroup;
    ngOnInit() {

        this.formSetup();
        const _id = this.activatedRoute.snapshot.params.id;
        if (_id != null) {
            this.subtitle = 'Editar';
            const data = this.activatedRoute.snapshot.data.cliente;
            this.clienteForm.setValue(
                { 'nome': data.nome, 'sobrenome': data.sobrenome, 'idade': data.idade, 'sexo': data.sexo, 'file': 'ok' }
            );
            this.id = _id;
            this.previewBase64 = data.dataURL;
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
            nome: [null, [Validators.required, Validators.minLength(5), this.validarStringSemNumeros]],
            sobrenome: [null, [Validators.required, Validators.minLength(5), this.validarStringSemNumeros]],
            idade: [null, [Validators.required, Validators.min(18)]],
            sexo: [null, Validators.required],
            file: [null, Validators.required]
        }
        // , {
        //     validator: (): any => {
        //         // validação não vinculada à itens do form
        //         if (!this.previewBase64) {
        //             // console.log('tá inválido');
        //             return { dataURL: true };
        //         }
        //         console.log('tá válido');
        //         return null;
        //     }
        //     }
            );
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

    public getSafeContent(): SafeHtml {
        if (!this.previewBase64) {
            return this.sanitizer.bypassSecurityTrustUrl('#');
        }

        return this.sanitizer.bypassSecurityTrustUrl(this.previewBase64);
    }

    handleFile(file: File) {
        if (!!file) {
            this.file = file;
            const reader = new FileReader();
            reader.onload = (event: any) => this.previewBase64 = event.target.result;
            reader.readAsDataURL(file);
            this.clienteForm.patchValue({file: 'ok'});
        }
    }

    save() {
        this.showLoadingIndicator = true;
        const cliente: ClienteAddEditModel = {
            id: this.id,
            nome: this.clienteForm.value.nome,
            sobrenome: this.clienteForm.value.sobrenome,
            idade: this.clienteForm.value.idade,
            sexo: this.clienteForm.value.sexo,
            file: this.file
        };

        // console.log(cliente, this.clienteForm.value.file);

        if (cliente.id === 0) {
            this.adicionarCliente(cliente);
        } else {
            this.editarCliente(cliente);
        }
    }

    private editarCliente(cliente: ClienteAddEditModel): any {
        this.clienteService.edit(this.id, cliente)
            .subscribe(data => {
                this.notification.showSuccess(`Cliente alterado com sucesso!`, 'WorkShopNG2+');
                const item: any = document.querySelector('#nomeInput');
                this.setFocus(item);
            },
                error => {
                    this.notification.showError(`Erro ao tentar editar o cliente`, 'WorkShopNG2+');
                    this.showLoadingIndicator = false;
                },
                () => this.showLoadingIndicator = false
            );
    }

    private adicionarCliente(cliente: ClienteAddEditModel) {
        this.clienteService.add(cliente)
            .subscribe(data => {
                this.notification.showSuccess(`Cliente cadastrado com sucesso!`, 'WorkShopNG2+');
                this.clienteForm.reset();
                this.previewBase64 = this.file = null;
                const item: any = document.querySelector('#nomeInput');
                this.setFocus(item);
            },
                error => {
                    this.notification.showError(`Erro ao tentar cadastrar o cliente`, 'WorkShopNG2+');
                    this.showLoadingIndicator = false;
                },
                () => this.showLoadingIndicator = false
            );
    }

}
