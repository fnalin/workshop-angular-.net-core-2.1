using FN.WorkShopAngularNetCore.Api.Model.Security;
using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
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


        public SecurityController(IConfiguration configuration, IUsuarioRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> RequestToken([FromBody] Login request)
        {

            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user != null && request.Password.Encrypt() == user.Senha)
            {
                var claims = new[]
                {
                     new Claim(ClaimTypes.Name, request.Email),
                     //new Claim(ClaimTypes.Role, "Admin")
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
                     expires: DateTime.Now.AddMinutes(30),
                     signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            return BadRequest("Credenciais inválidas...");
        }

        [HttpGet]
        public IActionResult GetClaims() {
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

            var data = claimsIdentity.Claims.ToList().Select(c => new {
                c.Type, c.Value
            });

            return Ok(data);
        }

    }
}
