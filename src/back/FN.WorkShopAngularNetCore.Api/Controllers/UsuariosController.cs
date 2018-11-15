using FN.WorkShopAngularNetCore.Domain.Contracts.Infra;
using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    public class UsuariosController: Controller
    {

        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IUnitOfWork _uow;

        public UsuariosController(IUsuarioRepository usuarioRepository, IUnitOfWork uow)
        {
            _usuarioRepository = usuarioRepository;
            _uow = uow;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _usuarioRepository.GetAsync();

            var model =
                data.Select(d => new Model.Usuarios.Get()
                {
                    Id = d.Id,
                    Nome = d.Nome,
                    Email = d.Email
                });
            return Ok(model);
        }


        [HttpGet("{id:int}", Name = "GetUsuarioById")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _usuarioRepository.GetAsync(id);

            if (data == null)
                return NotFound();

            var model = new Model.Usuarios.GetById()
            {
                Id = data.Id,
                Nome = data.Nome,
                Email = data.Email
            };

            return Ok(model);
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> AddUsuario([FromBody]Model.Usuarios.Add command)
        {

            if (ModelState.IsValid)
            {
                var usuario = new Usuario(command.Nome, command.Email, command.Senha);
                _usuarioRepository.Add(usuario);
                await _uow.CommitAsync();

                var model = new Model.Usuarios.GetById()
                {
                    Id = usuario.Id,
                    Nome = usuario.Nome,
                    Email = usuario.Email
                };

                return CreatedAtRoute("GetUsuarioById", new { usuario.Id }, model);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody]Model.Usuarios.Edit command)
        {

            if (ModelState.IsValid)
            {
                var usuario = await _usuarioRepository.GetAsync(id);
                if (usuario == null)
                    return BadRequest("Usuario não localizado");

                usuario.Alterar(command.Nome, command.Email);
                _usuarioRepository.Edit(usuario);
                await _uow.CommitAsync();
                return NoContent();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuario = await _usuarioRepository.GetAsync(id);
            if (usuario == null)
                return BadRequest("Usuario não localizado");

            _usuarioRepository.Del(usuario);
            await _uow.CommitAsync();
            return NoContent();
        }

    }
}
