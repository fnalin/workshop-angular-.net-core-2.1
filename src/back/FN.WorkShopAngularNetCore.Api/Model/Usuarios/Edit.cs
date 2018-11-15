using System.ComponentModel.DataAnnotations;

namespace FN.WorkShopAngularNetCore.Api.Model.Usuarios
{
    public class Edit
    {
        [Required(ErrorMessage = "{0} é obrigatório")]
        public string Nome { get; set; }

        [RegularExpression(@"([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)", ErrorMessage = "{0} inválido")]
        [Required(ErrorMessage = "{0} é obrigatório")]
        public string Email { get; set; }
    }
}
