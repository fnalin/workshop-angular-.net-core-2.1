
export interface ClienteAddEditModel {
    id: number;
    nome: string;
    sobrenome: string;
    idade: number;
    sexo: Sexo;
    file: File;
}

export enum Sexo { Masculino = 1, Feminino = 2 }
