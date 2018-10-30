using FN.WorkShopAngularNetCore.Domain.Contracts.Infra;
using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FN.WorkShopAngularNetCore.Api.Controllers
{
    [Route("api/v1/[controller]")]
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
            return Ok(data);
        }


        [HttpGet("{id:int}", Name = "GetClienteById")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _clienteRepository.GetAsync(id);

            if (data == null)
                return NotFound();

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]Model.Clientes.Add command)
        {

            if (ModelState.IsValid)
            {
                var cliente = new Cliente(command.Nome, command.Sobrenome, command.Idade);
                _clienteRepository.Add(cliente);
                await _uow.CommitAsync();
                return CreatedAtRoute("GetClienteById", new { cliente.Id }, cliente);
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

                cliente.Alterar(command.Nome, command.Sobrenome, command.Idade);
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
