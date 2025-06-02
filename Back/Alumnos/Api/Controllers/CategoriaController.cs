using Api.Comun.Interfaces;
using Api.Comun.Modelos.Categorias;
using Api.Entidades;
using Api.Comun.Utilidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("categorias")]
public class CategoriasController : ControllerBase
{
    private readonly IAplicacionBdContexto _contexto;

    public CategoriasController(IAplicacionBdContexto contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<List<BuscarCategoriaDto>> ObtenerCategorias(string? nombre)
    {
        var query = _contexto.Categoria.AsQueryable();

        if (!string.IsNullOrWhiteSpace(nombre))
        {
            query = query.Where(c => c.Nombre.Contains(nombre) || c.Descripcion.Contains(nombre));
        }

        var lista = await query.ToListAsync();
        return lista.ConvertAll(x => x.ConvertirDto());
    }

    [HttpGet("{slug}")]
    public async Task<BuscarCategoriaDto> ObtenerCategoria(string slug, CancellationToken cancelacionToken)
    {
        var categoria = await _contexto.Categoria
            .FirstOrDefaultAsync(c => c.Slug == slug, cancelacionToken);

        return categoria != null ? categoria.ConvertirDto() : new BuscarCategoriaDto();
    }

    [HttpPost]
    public async Task<int> CrearCategoria([FromBody] CrearCategoriaDto categoriaDto, CancellationToken cancelacionToken)
    {
        var nuevaCategoria = new Categoria
        {
            Nombre = categoriaDto.Nombre,
            Descripcion = categoriaDto.Descripcion,
            Slug = categoriaDto.Slug
        };

        await _contexto.Categoria.AddAsync(nuevaCategoria, cancelacionToken);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return nuevaCategoria.CategoriaID;
    }

    [HttpPut("{slug}")]
    public async Task<BuscarCategoriaDto> ModificarCategoria([FromBody] ModificarCategoriaDto categoriaDto,
                                                             CancellationToken cancelacionToken)
    {
        var categoria = await _contexto.Categoria
            .FirstOrDefaultAsync(c => c.Slug == categoriaDto.Slug, cancelacionToken);

        if (categoria == null)
            return new BuscarCategoriaDto();

        categoria.Nombre = categoriaDto.Nombre;
        categoria.Descripcion = categoriaDto.Descripcion;

        if (!string.IsNullOrWhiteSpace(categoriaDto.Slug) && categoria.Slug != categoriaDto.Slug)
        {
            categoria.Slug = categoriaDto.Slug;
        }

        await _contexto.SaveChangesAsync(cancelacionToken);

        return categoria.ConvertirDto();
    }

    [HttpDelete("{id}")]
    public async Task<bool> EliminarCategoria(int id, CancellationToken cancelacionToken)
    {
        var categoria = await _contexto.Categoria.FirstOrDefaultAsync(c => c.CategoriaID == id, cancelacionToken);

        if (categoria == null)
            return false;

        _contexto.Categoria.Remove(categoria);
        await _contexto.SaveChangesAsync(cancelacionToken);

        return true;
    }



}
