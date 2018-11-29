import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { ClienteListModel } from './cliente-list/cliente-list.model';
import { ClienteAddEditModel } from './cliente-add-edit/cliente-add-edit.model';

const APIUrl = 'http://localhost:58458/api/v1/Clientes';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<ClienteListModel[]> {
        return this.http.get<ClienteListModel[]>(APIUrl);
    }

    getById(id: number): Observable<ClienteAddEditModel> {
        return this.http.get<ClienteAddEditModel>(APIUrl + `/${id}`);
    }

    add(cliente: ClienteAddEditModel) {
        const formData = this.getFormData(cliente);
        // console.log(formData);
        return this.http.post(APIUrl, formData, { observe: 'events', reportProgress: true});
    }

    edit(id: number, cliente: ClienteAddEditModel) {
        const formData = this.getFormData(cliente);
        return this.http.put(APIUrl + `/${id}`, formData, { observe: 'events', reportProgress: true});
    }

    del(id: number) {
        return this.http.delete(APIUrl + `/${id}`);
    }

    private getFormData(data: any) {
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        return formData;
    }
}
