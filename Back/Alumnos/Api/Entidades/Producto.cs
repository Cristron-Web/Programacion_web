using Api.Comun.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Api.Entidades
{
    public class Producto : ISlug
    {
        [Key]
        public int ProductoID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public bool Disponible { get; set; }
        public int Stock { get; set; }
        public int CategoriaID { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public virtual List<Categoria> Categorias { get; set; }

        // Relación con Vendedor (uno a muchos)
        public int UsuarioId { get; set; }            // FK
        public virtual Usuario Vendedor { get; set; }  // Navegación

        public string Slug { get; set; }

        public string ObtenerDescripcionParaSlug()
        {
            return Nombre;
        }

    }
        
}
