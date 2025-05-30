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

    public static ProductoDto ConvertirADto(this Producto producto)
    {
        return new ProductoDto
        {
            ProductoID = producto.ProductoID,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Stock = producto.Stock,
            CategoriaID = producto.CategoriaID,
            VendedorID = producto.VendedorID
        };
    }

    public static Producto ConvertirAEntidad(this ProductoCrearDto dto)
    {
        return new Producto
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            Precio = dto.Precio,
            Stock = dto.Stock,
            CategoriaID = dto.CategoriaID,
            VendedorID = dto.VendedorID
        };
    }

    public static void ActualizarDesdeDto(this Producto producto, ProductoEditarDto dto)
    {
        producto.Nombre = dto.Nombre;
        producto.Descripcion = dto.Descripcion;
        producto.Precio = dto.Precio;
        producto.Stock = dto.Stock;
        producto.CategoriaID = dto.CategoriaID;
        producto.VendedorID = dto.VendedorID;
    }


    //Mapeo de Categorias 

    public static CategoriaDto ConvertirADto(this Categoria categoria)
    {
        return new CategoriaDto
        {
            Id = categoria.Id,
            Nombre = categoria.Nombre,
            Descripcion = categoria.Descripcion,
            FechaCreacion = categoria.FechaCreacion
        };
    }

    public static Categoria ConvertirAEntidad(this CrearCategoriaDto dto)
    {
        return new Categoria
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            FechaCreacion = DateTime.UtcNow // Establecer la fecha de creación
        };
    }

    public static void ActualizarDesdeDto(this Categoria categoria, EditarCategoriaDto dto)
    {
        categoria.Nombre = dto.Nombre;
        categoria.Descripcion = dto.Descripcion;
    }













}












}