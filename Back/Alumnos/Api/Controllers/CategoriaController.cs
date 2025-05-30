using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Entidades;
using Api.Comun.Interfaces;
using Api.Comun.Utilidades;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/categorias")]
public class CategoriaController : ControllerBase
{
    private readonly ICategoriaService _categoriaService;

    public CategoriaController(ICategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    // Obtener todas las categor�as
    [HttpGet]
    public async Task<ActionResult<List<CategoriaDto>>> ObtenerCategorias()
    {
        var categorias = await _categoriaService.ObtenerTodas();
        return Ok(categorias.Select(c => c.ConvertirADto()).ToList());
    }

    // Obtener una categor�a por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoriaDto>> ObtenerCategoriaPorId(int id)
    {
        var categoria = await _categoriaService.ObtenerPorId(id);
        if (categoria == null)
            return NotFound();

        return Ok(categoria.ConvertirADto());
    }

    // Crear una nueva categor�a
    [HttpPost]
    public async Task<ActionResult> CrearCategoria([FromBody] CrearCategoriaDto dto)
    {
        var categoria = dto.ConvertirAEntidad();
        await _categoriaService.Agregar(categoria);
        return CreatedAtAction(nameof(ObtenerCategoriaPorId), new { id = categoria.Id }, categoria.ConvertirADto());
    }

    // Editar una categor�a existente
    [HttpPut("{id}")]
    public async Task<ActionResult> EditarCategoria(int id, [FromBody] EditarCategoriaDto dto)
    {
        var categoriaExistente = await _categoriaService.ObtenerPorId(id);
        if (categoriaExistente == null)
            return NotFound();

        categoriaExistente.ActualizarDesdeDto(dto);
        await _categoriaService.Actualizar(categoriaExistente);

        return NoContent();
    }

    // Eliminar una categor�a
    [HttpDelete("{id}")]
    public async Task<ActionResult> EliminarCategoria(int id)
    {
        var categoriaExistente = await _categoriaService.ObtenerPorId(id);
        if (categoriaExistente == null)
            return NotFound();

        await _categoriaService.Eliminar(id);
        return NoContent();
    }
}