namespace FN.WorkShopAngularNetCore.Domain.Entities
{
    public class Cliente : Entity
    {
        protected Cliente()
        {}

        public Cliente(int id, string nome, string sobrenome, int idade, Enums.Sexo sexo, string fotoPath)
        {
            Id = id;
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
            Sexo = sexo;
            FotoNome = fotoPath;
        }

        public Cliente(string nome, string sobrenome, int idade, Enums.Sexo sexo, string fotoPath)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
            Sexo = sexo;
            FotoNome = fotoPath;
        }

        public Cliente(string nome, string sobrenome, int idade, int sexo, string fotoPath)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
            Sexo = (Enums.Sexo)sexo;
            FotoNome = fotoPath;
        }

        public int Id { get; private set; }
        public string Nome { get; private set; }
        public string Sobrenome { get; private set; }
        public string NomeCompleto => $"{Nome} {Sobrenome}";
        public int Idade { get; private set; }

        public string FotoNome { get; private set; }

        public Enums.Sexo Sexo { get; private set; }

        public void Alterar(string nome, string sobrenome, int idade, Enums.Sexo sexo, string fotoPath)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
            Sexo = sexo;
            FotoNome = fotoPath;
        }

        public void Alterar(string nome, string sobrenome, int idade, int sexo, string fotoPath)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
            Sexo = (Enums.Sexo)sexo;
            FotoNome = fotoPath;
        }


        public void Alterar(string nome, string sobrenome, int idade, int sexo)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Idade = idade;
            Sexo = (Enums.Sexo)sexo;
        }
    }
}
