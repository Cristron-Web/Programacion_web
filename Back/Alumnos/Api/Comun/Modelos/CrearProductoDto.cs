namespace Api.Comun.Modelos.Productos;

public class CrearProductoDto
{
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public decimal Precio { get; set; }
    public int VendedorID { get; set; }
    public List<int> CategoriasId { get; set; }

    public string VendedorSlug { get; set; }
    public List<string> CategoriasSlugs { get; set; }
    
}
