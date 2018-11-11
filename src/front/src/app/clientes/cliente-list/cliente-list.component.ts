import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ClienteListModel } from './cliente-list.model';
import { ClienteService } from '../cliente.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: 'cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {

    clientes: ClienteListModel[] = [];
    cliente: any = {};
    closeResult: string;
    constructor(private activatedRoute: ActivatedRoute, private clienteService: ClienteService, private modalService: NgbModal) {}

    ngOnInit(): void {
        // this.clientes = this.activatedRoute.snapshot.data['clientes'];
        this.clientes = this.activatedRoute.snapshot.data.clientes;
        // console.log(this.activatedRoute.snapshot);
    }

    open(content, cliente: ClienteListModel) {
        this.cliente = {... cliente};
        // console.log(this.cliente);
        // console.log(content);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

      confirmDel() {
        this.clienteService.del(this.cliente.id)
        .subscribe(() => {
                    const cliente = this.clientes.find(cli => cli.id === this.cliente.id);
                    const index: number = this.clientes.indexOf(cliente);
                    // console.log(index);
                    if (index !== -1) {
                        this.clientes.splice(index, 1);
                    }
                    this.modalService.dismissAll('');
                },
                (error: HttpErrorResponse)  => {
                    console.log(error);
                    alert('Erro ao tentar excluir o cliente');
                    this.modalService.dismissAll('');
                }
            );
      }
}
