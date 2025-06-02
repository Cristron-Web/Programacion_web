using Api.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones;

public class MensajesConfiguracion
{
    public void Configure(EntityTypeBuilder<Mensajes> constructor)
    {
        constructor.HasKey(u => u.MensajeID);
    }

}
