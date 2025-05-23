using Api.Comun.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Comun.Modelos;

namespace Api.Servicios;

public class JwtTokenServicio : ITokenIdentidadServicio
{
    private readonly IdentidadAjuste _identidadAjustes;

    public JwtTokenServicio(IdentidadAjuste identidadAjustes)
    {
        _identidadAjustes = identidadAjustes;
    }

    public string Generar(ReclamosTokenIdentidad reclamos)
    {
        if (string.IsNullOrWhiteSpace(_identidadAjustes.Secreto))
            throw new InvalidOperationException("El secreto JWT no está configurado.");
        
        var llave = Encoding.ASCII.GetBytes(_identidadAjustes.Secreto);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Expires = reclamos.EsPersistente
                ? DateTime.MaxValue
                : DateTime.UtcNow.AddDays(1),
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.IsPersistent, reclamos.EsPersistente.ToString()),
                new Claim(ClaimTypes.SerialNumber, reclamos.EstampaSeguridad),
                new Claim(nameof(ReclamosTokenIdentidad.FechaTicks), reclamos.FechaTicks.ToString()),
            }),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(llave),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenManejador = new JwtSecurityTokenHandler();

        var token = tokenManejador.CreateToken(tokenDescriptor);

        return tokenManejador.WriteToken(token);
    }

    public ReclamosTokenIdentidad ObtenerReclamos(IEnumerable<Claim> reclamos)
    {
        try
        {
            _ = int.TryParse(reclamos.SingleOrDefault(c => c.Type == ClaimTypes.GroupSid)?.Value, out int empresaId);

            return new ReclamosTokenIdentidad
            {
                EsPersistente = reclamos.Any(c => c.Type == ClaimTypes.IsPersistent && c.Value == true.ToString()),
                EstampaSeguridad = reclamos.Single(c => c.Type == ClaimTypes.SerialNumber).Value,
                FechaTicks = long.Parse(reclamos.Single(c => c.Type == nameof(ReclamosTokenIdentidad.FechaTicks)).Value)
            };
        }
        catch
        {
            return null;
        }
    }

    public async Task<bool> ValidarAsync(ReclamosTokenIdentidad reclamos, CancellationToken cancelacionToken = default)
    {
        if (reclamos == null)
        {
            return false;
        }

        var fechaLimite = DateTime.Now.AddMinutes(-_identidadAjustes.Expiracion);

        var correcto = reclamos.EstampaSeguridad == _identidadAjustes.EstampaSeguridad &&
                       (reclamos.EsPersistente || reclamos.Fecha < fechaLimite);

        return await Task.FromResult(correcto);
    }
}