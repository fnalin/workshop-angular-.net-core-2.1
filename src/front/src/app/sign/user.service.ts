import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

import { BehaviorSubject } from 'rxjs'; // permite que seja notificado para quem se inscrever uma alteração
import * as jwt_decode from 'jwt-decode';

import { UserModel } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    userSubject = new BehaviorSubject<UserModel>(null); // é obrigatótio passar algo na construção
    constructor(private tokenService: TokenService) {

        // Caso tenha um token notifique quem se inscreveu no userSubject
        if (this.tokenService.hasToken()) {
            this.decodeAndNotifyUser();
        }
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotifyUser();
    }

    private decodeAndNotifyUser() {
        const token = this.tokenService.getToken();

        // pega o payload do jwt
        const claims = jwt_decode(token);
        const user: UserModel = {
            id: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            nome: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            email: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
        };
        // console.log(user);

        // Dispara para quem assinou uma notificação de alteração no userSubject
        this.userSubject.next(user);
    }

    logOut() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    get user() {
        // basta dar um subscribe()
        return this.userSubject.asObservable();
    }

    get isLogged() {
        return this.tokenService.hasToken();
    }
}
