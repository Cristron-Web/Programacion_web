namespace Api.Seguridad;

public class IniciarSesionVm
{
    public string UsuarioNombre { get; set; }
    public string Contrasena { get; set; }
    public bool MantenerSesion { get; set; }
}