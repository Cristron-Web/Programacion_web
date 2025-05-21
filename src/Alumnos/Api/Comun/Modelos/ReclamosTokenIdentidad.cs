namespace Api.Comun.Modelos;

public class ReclamosTokenIdentidad
{
    public long FechaTicks { get; set; }
    public bool EsPersistente { get; set; }
    public string EstampaSeguridad { get; set; }

    public DateTime Fecha
    {
        get
        {
            return new DateTime(FechaTicks);
        }
    }

}