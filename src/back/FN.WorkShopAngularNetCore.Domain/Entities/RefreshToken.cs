using System;

namespace FN.WorkShopAngularNetCore.Domain.Entities
{
    public class RefreshToken: Entity
    {
        public RefreshToken(int usuarioId, string token)
        {
            UsuarioId = usuarioId;
            Token = token;
        }

        protected RefreshToken(){}

        public int UsuarioId { get; private set; }
        public Usuario Usuario { get; private set; }

        public string Token { get; private set; }

        public DateTime DataExpiracao { get; private set; } = DateTime.UtcNow.AddHours(24);

        public bool IsValid => DateTime.UtcNow < DataExpiracao;

    }
}
