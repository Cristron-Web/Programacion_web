namespace Api.Comun.Modelos.Productos;

public class BuscarProductoDto
{
    public string Slug { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public decimal Precio { get; set; }
    public DateTime FechaPublicacion { get; set; }
    public string VendedorNombre { get; set; }
    public List<string> Categorias { get; set; }

}
