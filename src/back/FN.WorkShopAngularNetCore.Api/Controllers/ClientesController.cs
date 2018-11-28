using FN.WorkShopAngularNetCore.Domain.Contracts.Infra;
using FN.WorkShopAngularNetCore.Domain.Contracts.Repositories;
using FN.WorkShopAngularNetCore.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
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
        private readonly string _uploads;


        public ClientesController(IClienteRepository clienteRepository, IUnitOfWork uow, IHostingEnvironment hostingEnvironment)
        {
            _clienteRepository = clienteRepository;
            _uow = uow;
            _uploads = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
            Directory.CreateDirectory(_uploads);
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
                    Sexo = Enum.GetName(typeof(Domain.Enums.Sexo), d.Sexo),
                    FotoNome = d.FotoNome
                    // ,DataURL = $"data:image/*;base64,{Convert.ToBase64String(System.IO.File.ReadAllBytes(d.FotoPath))}"
                });
            return Ok(model);
        }

        [HttpGet("{file}"), AllowAnonymous]
        public async Task<IActionResult> GetImage(string file)
        {
            var path = $@"{_uploads}\{file}";
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "image/jpeg");
        }


        [HttpGet("{id:int}", Name = "GetClienteById")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _clienteRepository.GetAsync(id);

            if (data == null)
                return NotFound();

            var imageArray = System.IO.File.ReadAllBytes($@"{_uploads}\{data.FotoNome}");
            var model = new Model.Clientes.GetById()
            {
                Id = data.Id,
                Nome = data.Nome,
                Sobrenome = data.Sobrenome,
                Idade = data.Idade,
                Sexo = (int)data.Sexo,
                dataURL = $"data:image/*;base64,{Convert.ToBase64String(imageArray)}"
            };

            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add(
            [FromForm]Model.Clientes.Add command,
            IFormFile file
            //,[FromServices]IHostingEnvironment hostingEnvironment
            )
        {

            if (file == null) ModelState.AddModelError("", "Foto inválida");

            if (ModelState.IsValid)
            {
                var filename = Guid.NewGuid().ToString("N") + file.FileName.Substring(file.FileName.LastIndexOf('.'));
                var filePath = Path.Combine(_uploads, filename);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var cliente = new Cliente(command.Nome, command.Sobrenome, command.Idade, (int)command.Sexo, filename);
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
        public async Task<IActionResult> Update(
            int id,
            [FromForm]Model.Clientes.Edit command,
            IFormFile file
            //,[FromServices]IHostingEnvironment hostingEnvironment
            )
        {

            if (ModelState.IsValid)
            {
                var cliente = await _clienteRepository.GetAsync(id);
                if (cliente == null)
                    return BadRequest("Cliente não localizado");


                if (file?.Length > 0)
                {
                    string filePath = "";

                    delFile(cliente.FotoNome);
                    
                    var filename = Guid.NewGuid().ToString("N") + file.FileName.Substring(file.FileName.LastIndexOf('.'));
                    filePath = Path.Combine(_uploads, filename);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    cliente.Alterar(command.Nome, command.Sobrenome, command.Idade, (int)command.Sexo, filename);
                }
                else
                {
                    cliente.Alterar(command.Nome, command.Sobrenome, command.Idade, (int)command.Sexo);
                }

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

            delFile(cliente.FotoNome);

            _clienteRepository.Del(cliente);
            await _uow.CommitAsync();
            return NoContent();
        }

        private void delFile(string fotoNome)
        {
            if (System.IO.File.Exists($@"{_uploads}\{fotoNome}"))
            {
                System.IO.File.Delete($@"{_uploads}\{fotoNome}");
            }
        }
    }
}
