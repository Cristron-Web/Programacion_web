using Api.Comun.Modelos;
using Api.Comun.Modelos.Productos;
using Api.Comun.Modelos.Usuarios;
using Api.Entidades;

namespace Api.Comun.Utilidades;

public static class MapeoDtos
{
    public static BuscarUsuariosDto ConvertirDto(this Usuario usuario)
    {
        return new BuscarUsuariosDto()
        {
            Slug = usuario.Slug,
            Nombre = usuario.Nombre,
            ApellidoPaterno = usuario.ApellidoPaterno,
            ApellidoMaterno = usuario.ApellidoMaterno,
            NombreUsuario = usuario.NombreUsuario,
            Habilitado = usuario.Habilitado,
        };
    }


    //Mapeo de Productos

    public static ModificarProductoDto ConvertirADto(this Producto producto)
    {
        return new ModificarProductoDto
        {
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            CategoriasSlugs = new List<string>() // Puedes llenarla según tu lógica
        };
    }


    public static BuscarProductoDto ConvertirABuscarDto(this Producto producto)
    {
        return new BuscarProductoDto
        {
            Slug = producto.Slug,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            FechaPublicacion = producto.FechaPublicacion,
            VendedorNombre = producto.Vendedor?.Nombre, // Asegúrate de que la navegación esté bien configurada
            Categorias = producto.Categorias?.Select(c => c.Nombre).ToList() ?? new List<string>()
        };
    }


    public static Producto ConvertirADominio(this CrearProductoDto dto)
    {
        return new Producto
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            Precio = dto.Precio,
            VendedorID = dto.VendedorID,

            // Las categorías deben ser asignadas por separado según los IDs o slugs
            // Categorias = ... (debes resolver esto en la lógica de aplicación)
        };
    }

}
