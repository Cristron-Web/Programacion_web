using Api.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones;

public class CategoriaConfiguracion
{
    public void Configure(EntityTypeBuilder<Categoria> constructor)
    {
        constructor.HasKey(u => u.CategoriaID);
    }

}
