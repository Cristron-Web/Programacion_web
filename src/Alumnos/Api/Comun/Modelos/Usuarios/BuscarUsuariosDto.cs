namespace Api.Comun.Modelos.Usuarios;

public class BuscarUsuariosDto
{
    public string Slug { get; set; }
    public string Nombre { get; set; }
    public string ApellidoPaterno { get; set; }
    public string ApellidoMaterno { get; set; }
    public string NombreUsuario { get; set; }
    public bool Habilitado { get; set; }
}