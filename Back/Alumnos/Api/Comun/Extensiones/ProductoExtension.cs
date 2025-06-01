using Api.Entidades;
using Api.Comun.Modelos.Productos;

namespace Api.Comun.Extensiones;

public static class ProductoExtension
{
    public static BuscarProductoDto ConvertirDto(this Producto producto)
    {
        return new BuscarProductoDto
        {
            Slug = producto.Slug,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            FechaPublicacion = producto.FechaPublicacion,
            VendedorNombre = producto.Vendedor?.NombreUsuario,
            Categorias = producto.Categorias?.Select(c => c.Nombre).ToList() ?? new List<string>()
        };
    }
}
