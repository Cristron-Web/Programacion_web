namespace Api.Comun.Modelos.Productos
{
    public class CrearProductoDto
    {
        public int ProductoID {  get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public bool Disponible { get; set; }
        public string CategoriaSlug { get; set; }
        public string UsuarioSlug { get; set; }
        public DateTime FechaPublicacion { get; set; }
    }
}
