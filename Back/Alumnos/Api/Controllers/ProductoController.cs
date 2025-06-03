using Api.Comun.Interfaces;
using Api.Comun.Modelos.Productos;
using Api.Entidades;
using Api.Comun.Utilidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("productos")]
public class ProductosController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public ProductosController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarProductosDto>> ObtenerProductos(string nombre, bool disponible)
    {
        var query = _contexto.Producto.Where(x => x.Disponible == disponible);

        if (!string.IsNullOrEmpty(nombre))
        {
            query = query.Where(x => x.Nombre.Contains(nombre));
        }

        var lista = await query.ToListAsync();
        return lista.ConvertAll(x => x.ConvertirDto());
    }

    [HttpGet("{id}")]
    public async Task<BuscarProductosDto> ObtenerProducto(int id, CancellationToken cancelacionToken)
    {
        var producto = await _contexto.Producto.FirstOrDefaultAsync(x => x.ProductoID == id, cancelacionToken);

        return producto != null ? producto.ConvertirDto() : new BuscarProductosDto();
    }

    [HttpPost]
    public async Task<int> CrearProducto([FromBody] CrearProductoDto productoDto, CancellationToken cancelacionToken)
    {
        var categoria = _contexto.Categoria.FirstOrDefault(x => x.Slug == productoDto.CategoriaSlug);
        var usuarios = _contexto.Usuarios.FirstOrDefault(x => x.Slug == productoDto.UsuarioSlug);
        var nuevoProducto = new Producto()
        {
            ProductoID = productoDto.ProductoID,
            Nombre = productoDto.Nombre,
            Descripcion = productoDto.Descripcion,
            CategoriaID = categoria.CategoriaID,
            UsuarioId = usuario.Id,
            Precio = productoDto.Precio,
            Disponible = productoDto.Disponible,
            FechaPublicacion = productoDto.FechaPublicacion
        };

        await _contexto.Producto.AddAsync(nuevoProducto, cancelacionToken);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return nuevoProducto.ProductoID;
    }

    [HttpPut("{id}")]
    public async Task<BuscarProductosDto> ModificarProducto([FromBody] ModificarProductoDto productoDto, CancellationToken cancelacionToken)
    {
        var producto = await _contexto.Producto.FirstOrDefaultAsync(x => x.ProductoID == productoDto.Id, cancelacionToken);

        if (producto == null) return new BuscarProductosDto();

        producto.Nombre = productoDto.Nombre;
        producto.Descripcion = productoDto.Descripcion;
        producto.Precio = productoDto.Precio;
        producto.Disponible = productoDto.Disponible;

        await _contexto.SaveChangesAsync(cancelacionToken);
        return producto.ConvertirDto();
    }

    [HttpDelete("{id}")]
    public async Task<bool> EliminarProducto(int id, CancellationToken cancelacionToken)
    {
        var producto = await _contexto.Producto.FirstOrDefaultAsync(x => x.ProductoID == id, cancelacionToken);

        if (producto == null) return false;

        _contexto.Producto.Remove(producto);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return true;
    }
}