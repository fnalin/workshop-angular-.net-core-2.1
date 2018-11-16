import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignUpService } from './signup.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailDisponivelValidatorService {


    constructor(private signUpService: SignUpService) { }

    checkEmailAvaliable() {

        // retorna uma função
        // funciona com FormControl também
        return (control: AbstractControl): Observable<ValidationErrors | null> => {

            // return new Observable(null);

            // control.valueChanges =>
            // observable onde o validador async do angular consegue obter
            // os dados necessários de um controle de formulário
            return control.valueChanges

                // segura por 500ms e evita ficar indo o tempo todo na api enquanto
                // o e-mail é digitado
                .pipe(debounceTime(500))

                // faz a troca de observable pelo o q faz a busca por e-mail
                .pipe(switchMap(email => this.signUpService.getUserByEmail(email)))

                // faz a troca de retorno para null se for válido
                // ou para obj em caso de inválido
                .pipe(map(data => {

                    // se true é inválido
                    if (data) {
                        return { emailAvaliable: true };
                    }

                    return null;
                }))

                // força o retorno para que o subscribe seja executado
                .pipe(first())

                ;
        };

    }
}
