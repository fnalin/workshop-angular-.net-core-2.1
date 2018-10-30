using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace FN.WorkShopAngularNetCore.Api.Controllers
{
    public class TesteController:Controller
    {
        [HttpGet("api/v1/ping"), AllowAnonymous]
        public string Ping() => $"Pong - {DateTime.Now}";
    }
}
