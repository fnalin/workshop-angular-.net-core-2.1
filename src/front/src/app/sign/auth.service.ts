import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from './user.service';

const API_URL = 'http://localhost:58458/api/v1/Security';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient,
        private userService: UserService) { }

    authenticate(email: string, password: string) {
        // { observe: 'response' } = dá acesso à todos os dados da requisição (sem ele só vem o body)
        // pipe => coloca um código à ser executado fora do .subscribe()
        // tap => permite capturar a resposta do servidor

        return this.http
                    .post(API_URL, { email, password }, { observe: 'response' })
                    .pipe(tap( res => {
                        // console.log(res);
                        const body: any = res.body;
                        // console.log(body.token);

                        if (!!body && !!body.token) {
                            this.userService.setToken(body.token);
                        }

                        // não consegui pegar o header
                        // const authToken = res.headers.get('x-access-token');
                        // console.log(authToken);
                    }));
    }

}
