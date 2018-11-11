import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ClienteListModel } from './cliente-list/cliente-list.model';
import { ClienteAddEditModel } from './cliente-add-edit/cliente-add-edit.model';

const APIUrl = 'http://localhost:58458/api/v1/Clientes';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<ClienteListModel[]> {
        return this.http.get<ClienteListModel[]>(APIUrl);
    }

    add(cliente: ClienteAddEditModel) {
        return this.http.post(APIUrl, cliente);
    }

    del(id: number) {
        return this.http.delete(APIUrl + `/${id}`);
    }
}
