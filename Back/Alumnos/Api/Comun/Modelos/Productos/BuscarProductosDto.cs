namespace Api.Comun.Modelos.Productos
{
    public class BuscarProductosDto
    {
        public int ProductoID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public bool Disponible { get; set; }


    }
}
