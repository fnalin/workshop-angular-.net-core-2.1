import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioAddModel } from './usuario-add.model';

const API_URL = 'http://localhost:58458/api/v1/usuarios';

@Injectable({ providedIn: 'root' })
export class SignUpService {

    constructor(private http: HttpClient) { }

    add(data: UsuarioAddModel) {
        // console.log(data);
        return this.http.post(API_URL, data);
    }
}
