using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Entidades;
using Api.Comun.Interfaces;
using Api.Comun.Utilidades;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/productos")]
public class ProductoController : ControllerBase
{
    private readonly IProductoService _productoService;

    public ProductoController(IProductoService productoService)
    {
        _productoService = productoService;
    }

    // Obtener todos los productos
    [HttpGet]
    public async Task<ActionResult<List<ProductoDto>>> ObtenerProductos()
    {
        var productos = await _productoService.ObtenerTodos();
        return Ok(productos.Select(p => p.ConvertirADto()).ToList());
    }

    // Obtener un producto por ID
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductoDto>> ObtenerProductoPorId(int id)
    {
        var producto = await _productoService.ObtenerPorId(id);
        if (producto == null)
            return NotFound();

        return Ok(producto.ConvertirADto());
    }

    // Crear un nuevo producto
    [HttpPost]
    public async Task<ActionResult> CrearProducto([FromBody] ProductoCrearDto dto)
    {
        var producto = dto.ConvertirAEntidad();
        await _productoService.Agregar(producto);
        return CreatedAtAction(nameof(ObtenerProductoPorId), new { id = producto.ProductoID }, producto.ConvertirADto());
    }

    // Editar un producto existente
    [HttpPut("{id}")]
    public async Task<ActionResult> EditarProducto(int id, [FromBody] ProductoEditarDto dto)
    {
        var productoExistente = await _productoService.ObtenerPorId(id);
        if (productoExistente == null)
            return NotFound();

        productoExistente.ActualizarDesdeDto(dto);
        await _productoService.Actualizar(productoExistente);

        return NoContent();
    }

    // Eliminar un producto
    [HttpDelete("{id}")]
    public async Task<ActionResult> EliminarProducto(int id)
    {
        var productoExistente = await _productoService.ObtenerPorId(id);
        if (productoExistente == null)
            return NotFound();

        await _productoService.Eliminar(id);
        return NoContent();
    }
}