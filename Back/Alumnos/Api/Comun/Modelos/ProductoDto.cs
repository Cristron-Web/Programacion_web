namespace Api.Comun.Modelos.Producto
{
    public class ProductoDto
    {
        public int ProductoID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public float Precio { get; set; }
        public int Stock { get; set; }
        public int CategoriaID { get; set; }
        public int VendedorID { get; set; }
        public virtual List<Categoria> Categoria { get; set; }

    }
}
