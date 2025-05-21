using System.ComponentModel.DataAnnotations;

namespace Api.Comun.Modelos.Usuarios;

public class CrearUsuarioDto
{
    [Required] 
    public string Nombre { get; set; }
    [Required]
    public string ApellidoPaterno { get; set; }
    [Required]
    public string ApellidoMaterno { get; set; }
    [Required]
    public string NombreUsuario { get; set; }
    [Required]
    public string Contraseña { get; set; }
    [Required]
    public bool Habilitado { get; set; }
}