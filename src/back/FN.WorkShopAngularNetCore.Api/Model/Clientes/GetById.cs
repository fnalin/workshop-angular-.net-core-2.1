﻿namespace FN.WorkShopAngularNetCore.Api.Model.Clientes
{
    public class GetById
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public int Idade { get; set; }
        public int Sexo { get; set; }
        public string dataURL { get; set; }
    }
}
