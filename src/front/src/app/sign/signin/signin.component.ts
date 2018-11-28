import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
    templateUrl: 'signin.component.html',
    styleUrls: ['../../pages/css/forms.css']
})
export class SignInComponent implements OnInit, AfterViewInit {

    signInForm: FormGroup;
    showLoadingIndicator = false;
    returnURL: string;
    // se comunica com o template e vai buscar o #emailInput (variável de template)
    @ViewChild('emailInput') emailInput: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => this.returnURL = params.returnURL);
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
        this.showLoadingIndicator = true;
        this.authService.authenticate(this.email, this.senha)
            .subscribe(
                () => {
                    this.showLoadingIndicator = false;
                    this.notificationService.showSuccess('Autenticação efetuada c/ sucesso!', 'WorkShopAngularNetCore');

                    if (this.returnURL) {
                        this.router.navigateByUrl(this.returnURL);
                    } else {
                        this.router.navigate(['']);
                    }
                },
                err => {
                    this.signInForm.reset();
                    this.emailInput.nativeElement.focus();
                    this.showLoadingIndicator = false;
                    this.notificationService.showError(this.msgError(err), 'WorkShopAngularNetCore');
                    this.emailInput.nativeElement.focus();
                });
    }

    msgError(err: any) {
        let msg = '';

        switch (err.status) {
            case 404:
                msg = 'erro ao contatar api';
                break;
            case 400:
                msg = (!!err.error ? err.error : 'Dados inválidos');
                break;
            default:
                msg = 'Não foi possível se autenticar';
                break;
        }

        return msg;

    }

}
