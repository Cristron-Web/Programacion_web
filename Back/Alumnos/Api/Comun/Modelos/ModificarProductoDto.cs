namespace Api.Comun.Modelos
{
    public class ModificarProductoDto
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public List<string> CategoriasSlugs { get; set; }
    }
}