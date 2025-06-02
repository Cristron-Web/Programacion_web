using Api.Comun.Modelos.Productos;
using Api.Comun.Modelos.Usuarios;
using Api.Comun.Modelos.Categorias;
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

    public static BuscarProductosDto ConvertirDto(this Producto producto)
    {
        return new BuscarProductosDto
        {
            ProductoID = producto.ProductoID,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Disponible = producto.Disponible
        };
    }

    public static BuscarCategoriaDto ConvertirDto(this Categoria categoria)
    {
        return new BuscarCategoriaDto
        {
            CategoriaID = categoria.CategoriaID,
            Nombre = categoria.Nombre,
            Descripcion = categoria.Descripcion,
            Slug = categoria.Slug,
        };
    }

}