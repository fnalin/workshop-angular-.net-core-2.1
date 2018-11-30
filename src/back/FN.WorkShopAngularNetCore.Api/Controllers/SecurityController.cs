using FN.WorkShopAngularNetCore.Api.Model.Security;
using FN.WorkShopAngularNetCore.Domain.Contracts.Infra;
using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using FN.WorkShopAngularNetCore.Domain.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Api.Controllers
{
    [Route("api/v1/[controller]")]
    public class SecurityController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUsuarioRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IUnitOfWork _uow;

        public SecurityController(
            IConfiguration configuration,
            IUsuarioRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository,
            IUnitOfWork uow)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _uow = uow;
        }


        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> RequestToken([FromBody] Login credenciais)
        {
            // https://medium.com/@renato.groffe/asp-net-core-2-0-jwt-implementando-refresh-tokens-7fa525ffb461

            Usuario userData = null;
            bool credenciaisValidas = false;

            if (credenciais != null && !string.IsNullOrWhiteSpace(credenciais.Email))
            {

                userData = await _userRepository.GetByEmailAsync(credenciais.Email);

                if (credenciais.GrantType == "password")
                {
                    credenciaisValidas = (userData != null && credenciais.Password.Encrypt() == userData.Senha);
                }
                else if (credenciais.GrantType == "refresh_token" && !string.IsNullOrWhiteSpace(credenciais.RefreshToken) && userData != null)
                {
                    // verificar se o token é válido
                    var refreshTokenData = await _refreshTokenRepository.GetAsync(userData.Id, credenciais.RefreshToken);
                    credenciaisValidas = (refreshTokenData != null && credenciais.RefreshToken == refreshTokenData.Token);

                    if (credenciaisValidas)
                    {
                        _refreshTokenRepository.Del(refreshTokenData);
                        await _uow.CommitAsync();
                    }
                }
            }

            if (credenciaisValidas)
            {
                // Add o token no header também
                // Request.HttpContext.Response.Headers.Add("x-access-token", new JwtSecurityTokenHandler().WriteToken(token));
                return await GenerateToken(userData.Id, userData.Nome, userData.Email);
            }
            else
            {
                return BadRequest("Credenciais inválidas...");
            }
        }


        private async Task<OkObjectResult> GenerateToken(int userId, string name, string email)
        {
            // https://github.com/wellingtonjhn/DemoJwt/blob/master/src/DemoJwt.Application/Services/JwtService.cs
            // https://openid.net/specs/openid-connect-core-1_0.html#ClaimsContents

            var claims = new[]
               {
                     new Claim(JwtRegisteredClaimNames.NameId, userId.ToString()),
                     new Claim(JwtRegisteredClaimNames.GivenName, name),
                     new Claim(JwtRegisteredClaimNames.Email, email),
                     
                     //new Claim(ClaimTypes.Role, "Admin")
                     // p/ policy:
                     // new Claim("permissions", policy)
                };


            //recebe uma instancia da classe SymmetricSecurityKey 
            //armazenando a chave de criptografia usada na criação do token
            var key = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));

            //recebe um objeto do tipo SigninCredentials contendo a chave de 
            //criptografia e o algoritmo de segurança empregados na geração 
            // de assinaturas digitais para tokens
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "fansoft.com.br",
                audience: "fansoft.com.br",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(5),
                notBefore: DateTime.UtcNow,
                signingCredentials: creds);

            var refreshTokenOld = await _refreshTokenRepository.GetByUserIdAsync(userId);

            if (refreshTokenOld != null) _refreshTokenRepository.Del(refreshTokenOld);

            var refreshTokenData = new RefreshToken(userId, Guid.NewGuid().ToString("N").ToUpper());
            _refreshTokenRepository.Add(refreshTokenData);

            await _uow.CommitAsync();


            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                refreshToken = refreshTokenData.Token
            });
        }

        [HttpGet]
        public IActionResult GetClaims()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;

            // alternatively
            // claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;

            // get some claim by type
            var someClaim = claimsIdentity.FindFirst("some-claim");

            // iterate all claims
            //foreach (var claim in claimsIdentity.Claims)
            //{
            //    System.Console.WriteLine(claim.Type + ":" + claim.Value);
            //}

            var data = claimsIdentity.Claims.ToList().Select(c => new
            {
                c.Type,
                c.Value
            });

            return Ok(data);
        }

    }
}
