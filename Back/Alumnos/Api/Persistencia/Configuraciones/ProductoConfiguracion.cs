using Api.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Persistencia.Configuraciones;

public class ProductoConfiguracion
{
    public void Configure(EntityTypeBuilder<Producto> constructor)
    {
        constructor.HasKey(u => u.ProductoID);
    }

}