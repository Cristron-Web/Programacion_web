using Api.Comun.Interfaces;

namespace Api.Entidades
{
    public class Categoria
    {
        public int CategoriaID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public virtual List<Producto> Productos { get; set; }

        public string Slug { get; set; }

        public string ObtenerDescripcionParaSlug()
        {
            return Nombre;
        }


    }
    
}
