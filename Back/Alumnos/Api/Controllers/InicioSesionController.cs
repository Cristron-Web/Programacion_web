using Api.Comun.Interfaces;
using Api.Comun.Modelos;
using Api.Seguridad;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class InicioSesionController : ControllerBase
{
    private readonly ITokenIdentidadServicio _tokenIdentidadServicio;
    private readonly IdentidadAjuste _identidadAjuste;
    private readonly IUsuariosSesionServicio _usuariosSesionServicio;
    
    public InicioSesionController(ITokenIdentidadServicio tokenIdentidadServicio,
        IUsuariosSesionServicio usuariosSesionServicio, IdentidadAjuste identidadAjuste)
    {
        _identidadAjuste = identidadAjuste;
        _tokenIdentidadServicio = tokenIdentidadServicio;
        _usuariosSesionServicio = usuariosSesionServicio;
    }

    [Route("/login")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] IniciarSesionVm iniciarSesionVm,
        CancellationToken cancelacionToken)
    {
        var validadorVm = new IniciarSesionVmValidador();

        var resultados = await validadorVm.ValidateAsync(iniciarSesionVm, cancelacionToken);

        if (resultados.IsValid == false)
        {
            throw new ValidationException(resultados.Errors);
        }
        var nuevaSesion = await _usuariosSesionServicio.IniciarSesionAsync(iniciarSesionVm, cancelacionToken);
        if (nuevaSesion == null)
        {
            throw new UnauthorizedAccessException();
        }

        var token = _tokenIdentidadServicio.Generar(new ReclamosTokenIdentidad
        {
            EsPersistente = iniciarSesionVm.MantenerSesion,
            EstampaSeguridad = _identidadAjuste.EstampaSeguridad,
            FechaTicks = DateTime.Now.Ticks
        });
        
        Response.Headers.Add("Authorization", token);

        return NoContent();
    }
}
