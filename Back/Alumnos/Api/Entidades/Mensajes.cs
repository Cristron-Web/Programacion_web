using Api.Comun.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Api.Entidades
    {
        public class Mensajes
        {

            [Key]
            public int MensajeId { get; set; } // Esta será la clave primaria por convención
            public string Texto { get; set; }
            public DateTime Fecha { get; set; }
        }
    }

