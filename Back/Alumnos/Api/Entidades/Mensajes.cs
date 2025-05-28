namespace Api.Entidades
{
    public class Mensajes
    {
        public int MensajeID { get; set; }
        public int RemitenteID { get; set; }
        public int ReceptorID { get; set; }
        public string Contenido { get; set; }
        public DateTime FechaEnvio { get; set; }
        public bool Leido { get; set; } = false;

        // Relaciones
        public Usuario Remitente { get; set; }
        public Usuario Receptor { get; set; }

    }
}
