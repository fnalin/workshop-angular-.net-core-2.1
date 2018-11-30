namespace FN.WorkShopAngularNetCore.Api.Model.Security
{
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string RefreshToken { get; set; }
        public string GrantType { get; set; } // password | refresh_token
    }
}
