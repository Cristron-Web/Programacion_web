using Api.Comun.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Comun.Modelos;
using Api.Entidades;
using Api.Seguridad;

namespace Api.Servicios;

public class UsuarioSesionServicio : IUsuariosSesionServicio
{
    private readonly IAplicacionBdContexto _contexto;

    public UsuarioSesionServicio(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    public Task<SesionUsuario> IniciarSesionAsync(IniciarSesionVm inicioSesion,
        CancellationToken cancelacionToken)
    {
        var usuario = _contexto.Usuarios
            .FirstOrDefault(x => x.NombreUsuario == inicioSesion.UsuarioNombre
             && x.Contraseña == inicioSesion.Contrasena);
        
        if (usuario == null)
            return null;

        var nuevaSesion = new SesionUsuario
        {
            EsPersistente = inicioSesion.MantenerSesion,
            FechaInicio = DateTime.UtcNow,
            UsuarioId = usuario.UsuarioId,
            UltimoUso = DateTime.UtcNow,
            Valido = true
        };
        
        _contexto.SesionesUsuario.Add(nuevaSesion);
        _contexto.SaveChanges();
        
        return Task.FromResult(nuevaSesion);
    }
}