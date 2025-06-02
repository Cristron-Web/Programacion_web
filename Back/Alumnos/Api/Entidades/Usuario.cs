using Api.Comun.Interfaces;

namespace Api.Entidades;

public class Usuario : ISlug
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string ApellidoPaterno { get; set; }
    public string ApellidoMaterno { get; set; }
    public string NombreUsuario { get; set; }
    public string Contraseña { get; set; }
    public bool Habilitado { get; set; }
    public string Slug { get; set; }
    
    public virtual List<SesionUsuario> Sesiones  { get; set; }

    public string ObtenerDescripcionParaSlug()
    {
        return $"{NombreUsuario}";
    }
}
