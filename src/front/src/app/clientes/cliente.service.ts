import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Cliente } from './cliente';

const APIUrl = 'http://localhost:58458/api/v1/Clientes';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(APIUrl);
    }
}
