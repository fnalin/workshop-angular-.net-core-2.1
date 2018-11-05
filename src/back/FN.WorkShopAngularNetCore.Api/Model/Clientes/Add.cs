using System.ComponentModel.DataAnnotations;

namespace FN.WorkShopAngularNetCore.Api.Model.Clientes
{
    public class Add
    {
        [Required(ErrorMessage = "O {0} é obrigatório")]
        [StringLength(80,ErrorMessage ="Atingido o limite de {1} caracteres em {0}")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "O {0} é obrigatório")]
        [StringLength(80,ErrorMessage ="Atingido o limite de {1} caracteres em {0}")]
        public string Sobrenome { get; set; }
        public int Idade { get; set; }
        public Sexo Sexo { get; set; }
    }
}
