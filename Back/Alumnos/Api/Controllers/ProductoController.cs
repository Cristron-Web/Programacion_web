using Api.Comun.Extensiones;
using Api.Comun.Interfaces;
using Api.Comun.Modelos;
using Api.Comun.Modelos.Productos;
using Api.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("/productos")]
    public class ProductosController : ControllerBase
    {
        private readonly IAplicacionBdContexto _contexto;

        public ProductosController(IAplicacionBdContexto contexto)
        {
            _contexto = contexto;
        }

        // GET /productos?nombre=camisa
        [HttpGet]
        public async Task<List<BuscarProductoDto>> ObtenerProductos(string? nombre)
        {
            var query = _contexto.Productos
                .Include(p => p.Vendedor)
                .Include(p => p.Categorias)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(nombre))
            {
                query = query.Where(p => p.Nombre.Contains(nombre) || p.Descripcion.Contains(nombre));
            }

            var lista = await query.ToListAsync();
            return lista.ConvertAll(p => p.ConvertirDto());
        }

        // GET /productos/{slug}
        [HttpGet("{slug}")]
        public async Task<ActionResult<BuscarProductoDto>> ObtenerProductoPorSlug(string slug, CancellationToken cancelToken)
        {
            var producto = await _contexto.Productos
                .Include(p => p.Vendedor)
                .Include(p => p.Categorias)
                .FirstOrDefaultAsync(p => p.Slug == slug, cancelToken);

            if (producto == null)
                return NotFound();

            return producto.ConvertirDto();
        }

        // POST /productos
        [HttpPost("{slug}")]
        public async Task<ActionResult<string>> CrearProducto([FromBody] CrearProductoDto dto, CancellationToken cancelToken)
        {
            var vendedor = await _contexto.Usuarios.FirstOrDefaultAsync(x => x.Slug == dto.VendedorSlug, cancelToken);
            if (vendedor == null)
                return BadRequest("Vendedor no encontrado.");

            var categorias = await _contexto.Categorias
                .Where(c => dto.CategoriasSlugs.Contains(c.Slug))
                .ToListAsync(cancelToken);

            var nuevo = new Producto
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                FechaPublicacion = DateTime.UtcNow,
                Vendedor = vendedor,
                Categorias = categorias
            };

            await _contexto.Productos.AddAsync(nuevo, cancelToken);
            await _contexto.SaveChangesAsync(cancelToken);

            return nuevo.Slug;
        }

        // PUT /productos/{slug}
        [HttpPut("{slug}")]
        public async Task<ActionResult<BuscarProductoDto>> ModificarProducto(string slug, [FromBody] ModificarProductoDto dto, CancellationToken cancelToken)
        {
            var producto = await _contexto.Productos
                .Include(p => p.Categorias)
                .Include(p => p.Vendedor)
                .FirstOrDefaultAsync(p => p.Slug == slug, cancelToken);

            if (producto == null)
                return NotFound();

            producto.Nombre = dto.Nombre;
            producto.Descripcion = dto.Descripcion;
            producto.Precio = dto.Precio;

            if (dto.CategoriasSlugs != null)
            {
                var categorias = await _contexto.Categorias
                    .Where(c => dto.CategoriasSlugs.Contains(c.Slug))
                    .ToListAsync(cancelToken);

                producto.Categorias = categorias;
            }

            await _contexto.SaveChangesAsync(cancelToken);
            return producto.ConvertirDto();
        }
    }
}
