using System.ComponentModel.DataAnnotations;

namespace FN.WorkShopAngularNetCore.Api.Model.Usuarios
{
    public class Add
    {
        [Required(ErrorMessage = "{0} é obrigatório")]
        public string Nome { get; set; }

        [RegularExpression(@"([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)", ErrorMessage = "{0} inválido")]
        [Required(ErrorMessage = "{0} é obrigatório")]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0} é obrigatório")]
        [MinLength(8, ErrorMessage = "O mímino de {1} não foi atingido na {0}")]
        public string Senha { get; set; }
    }
}
