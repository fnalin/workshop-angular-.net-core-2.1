import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpService } from './signup.service';
import { UsuarioAddModel } from './usuario-add.model';

@Component({
    templateUrl: 'signup.component.html',
    styleUrls: ['../../pages/css/forms.css']
})
export class SignUpComponent implements OnInit, AfterViewInit {

    title = 'Usuários';
    subtitle = 'Add';
    showLoadingIndicator = false;
    signupForm: FormGroup;
    @ViewChild('nomeInput') nomeInput: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private signUpService: SignUpService) { }

    ngOnInit() {
        this.formSetup();
    }

    ngAfterViewInit() {
        this.nomeInput.nativeElement.focus();
    }

    formSetup() {
        this.signupForm = this.formBuilder.group({
            id: [null],
            nome: ['fabiano alberto nalin', [Validators.required, Validators.minLength(5)]],
            email: ['nalin@fansoft.com.br', [Validators.required, Validators.email]],
            senha: ['12345678', [Validators.required, Validators.minLength(8)]]
        });
    }

    save() {
        this.showLoadingIndicator = true;
        const data = this.signupForm.getRawValue() as UsuarioAddModel;
        this.signUpService.add(data).subscribe(
            _ => {
                console.log('usuário add c/ sucesso');
                this.showLoadingIndicator = false;
            }, err => {
                this.showLoadingIndicator = false;
                alert('Erro ao tentar adicionar usuário');
            });
    }
}
