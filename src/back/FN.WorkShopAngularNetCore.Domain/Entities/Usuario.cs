using FN.WorkShopAngularNetCore.Domain.Helpers;

namespace FN.WorkShopAngularNetCore.Domain.Entities
{
    public class Usuario : Entity
    {

        protected Usuario(){}

        public Usuario(int id, string nome, string email, string senha)
        {
            Id = id;
            Nome = nome;
            Email = email;
            Senha = senha.Encrypt();
        }

        public Usuario(string nome, string email, string senha)
        {
            Nome = nome;
            Email = email;
            Senha = senha.Encrypt();
        }
        public int Id { get; private set; }

        public string Nome { get; private set; }

        public string Email { get; private set; }

        public string Senha { get; private set; }

        public void Alterar(string nome, string email)
        {
            Nome = nome;
            Email = email;
        }

    }
}
