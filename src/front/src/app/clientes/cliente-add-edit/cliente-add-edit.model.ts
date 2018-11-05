
export interface ClienteAddEditModel {
    id: number;
    nome: string;
    sobrenome: string;
    idade: number;
    sexo: Sexo;
}

export enum Sexo { Masculino = 1, Feminino = 2 }
