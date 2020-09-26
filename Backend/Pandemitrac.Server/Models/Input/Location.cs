using System;
using System.ComponentModel.DataAnnotations;

namespace Pandemitrac.Server.Models.Input
{

    /// <summary>
    /// Ein Ort an dem ein Vorfall passiert sein kann
    /// </summary>
    public class Location : AddressEntity
    {
        /// <summary>
        /// Name des Orts
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Kontaktperson eines Ortes
        /// </summary>
        public string ContactPerson { get; set; }

        /// <summary>
        /// Telefonnummer der Kontaktperson
        /// </summary>
        [Phone]
        public string Phone {get;set;}
    }

}