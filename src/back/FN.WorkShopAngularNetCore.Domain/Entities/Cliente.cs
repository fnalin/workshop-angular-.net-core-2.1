namespace FN.WorkShopAngularNetCore.Domain.Entities
{
    public class Cliente : Entity
    {
        protected Cliente()
        {}

        public Cliente(int id, string nome, string sobrenome, int idade)
        {
            Id = id;
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
        }

        public Cliente(string nome, string sobrenome, int idade)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
        }

        public int Id { get; private set; }
        public string Nome { get; private set; }
        public string Sobrenome { get; private set; }
        public string NomeCompleto => $"{Nome} {Sobrenome}";
        public int Idade { get; private set; }

        public void Alterar(string nome, string sobrenome, int idade)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
        }
    }
}
