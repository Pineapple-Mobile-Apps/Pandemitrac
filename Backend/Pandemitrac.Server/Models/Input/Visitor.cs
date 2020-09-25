using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pandemitrac.Server.Models.Input
{
    /// <summary>
    /// Eine getrackte Person
    /// </summary>
    public class Visitor : AddressEntity
    {
        /// <summary>
        /// Vorname
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }

        /// <summary>
        /// Telefonnummer 
        /// </summary>
        [Phone]
        public string Phone { get; set; }

        /// <summary>
        /// E-Mail Addresse
        /// </summary>
        [EmailAddress]
        public string Mail { get; set; }
    }

}