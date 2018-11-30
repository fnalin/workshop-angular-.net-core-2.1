import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';

import { PayloadModel } from './payload.model';
const KEY = 'authToken';

@Injectable({ providedIn: 'root' })
export class TokenService {

    hasToken() {
        return !!this.getToken();
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }

    get payload(): PayloadModel {
        if (this.hasToken()) {

            // pega o payload do jwt
            const claims = jwt_decode(this.getToken());


            return {
                user: {
                    id: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                    nome: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                    email: claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
                },
                exp: claims['exp'],
                iss: claims['iss'],
                aud: claims['aud']
            };
        }

        return null;
    }

    get isTokenExpired(): boolean {

        try {
            const date = new Date(0);
            const exp = this.payload.exp;
            date.setUTCSeconds(exp);
            console.log({ 'token exp': date });
            return date.valueOf() < new Date().valueOf();

        } catch (err) {
            return false;

        }
    }

}
