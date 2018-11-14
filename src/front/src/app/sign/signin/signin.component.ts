import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
    templateUrl: 'signin.component.html',
    styleUrls: ['../../pages/css/forms.css']
})
export class SignInComponent implements OnInit, AfterViewInit {

    signInForm: FormGroup;

    // se comunica com o template e vai buscar o #emailInput (variável de template)
    @ViewChild('emailInput') emailInput: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    ngOnInit() {
        this.formSetup();
    }

    ngAfterViewInit(): void {
        this.emailInput.nativeElement.focus();
    }

    private formSetup() {
        this.signInForm = this.formBuilder.group({
            email: ['admin@fansoft.com.br', [Validators.required, Validators.minLength(5), Validators.email]],
            senha: ['123456', [Validators.required, Validators.minLength(4)]]
        });
    }

    get email() { return this.signInForm.get('email').value; }
    get senha() { return this.signInForm.get('senha').value; }

    login() {
        this.authService.authenticate(this.email, this.senha)
            .subscribe(
                () => {
                    this.router.navigate(['']); },
                err => {
                    this.signInForm.reset();
                    this.emailInput.nativeElement.focus();
                    alert('Email e/ou senha inválidos');
                });
    }

}
