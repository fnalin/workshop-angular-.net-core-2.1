using FN.WorkShopAngularNetCore.Domain.Contracts.Infra;
using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    public class ClientesController : Controller
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IUnitOfWork _uow;

        public ClientesController(IClienteRepository clienteRepository, IUnitOfWork uow)
        {
            _clienteRepository = clienteRepository;
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _clienteRepository.GetAsync();

            var model =
                data.Select(d => new Model.Clientes.Get()
                {
                    Id = d.Id,
                    NomeCompleto = d.NomeCompleto,
                    Idade = d.Idade,
                    Sexo = Enum.GetName(typeof(Domain.Enums.Sexo), d.Sexo)
                });
            return Ok(model);
        }


        [HttpGet("{id:int}", Name = "GetClienteById")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _clienteRepository.GetAsync(id);

            if (data == null)
                return NotFound();

            var model = new Model.Clientes.GetById()
            {
                Id = data.Id,
                Nome = data.Nome,
                Sobrenome = data.Sobrenome,
                Idade = data.Idade,
                Sexo = (int)data.Sexo
            };

            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]Model.Clientes.Add command)
        {

            if (ModelState.IsValid)
            {
                var cliente = new Cliente(command.Nome, command.Sobrenome, command.Idade, (int)command.Sexo);
                _clienteRepository.Add(cliente);
                await _uow.CommitAsync();

                var model = new Model.Clientes.Get()
                {
                    Id = cliente.Id,
                    NomeCompleto = cliente.NomeCompleto,
                    Idade = cliente.Idade,
                    Sexo = Enum.GetName(typeof(Domain.Enums.Sexo), cliente.Sexo)
                };

                return CreatedAtRoute("GetClienteById", new { cliente.Id }, model);
            }

            return BadRequest(ModelState);
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody]Model.Clientes.Edit command)
        {

            if (ModelState.IsValid)
            {
                var cliente = await _clienteRepository.GetAsync(id);
                if (cliente == null)
                    return BadRequest("Cliente não localizado");

                cliente.Alterar(command.Nome, command.Sobrenome, command.Idade, (int)command.Sexo);
                _clienteRepository.Edit(cliente);
                await _uow.CommitAsync();
                return NoContent();
            }

            return BadRequest(ModelState);
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var cliente = await _clienteRepository.GetAsync(id);
            if (cliente == null)
                return BadRequest("Cliente não localizado");

            _clienteRepository.Del(cliente);
            await _uow.CommitAsync();
            return NoContent();
        }
    }
}
