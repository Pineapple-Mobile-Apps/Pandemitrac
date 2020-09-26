using System.ComponentModel.DataAnnotations;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Models.Input
{

    /// <summary>
    /// Generalisierung für Models, welche eine Adresse enthalten
    /// </summary>
    public class AddressEntity : ModelBase
    {
        /// <summary>
        /// Addresse
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// PLZ
        /// </summary>
        [Range(00000, 99999)]
        public int? PostCode { get; set; }

        /// <summary>
        /// Stadt
        /// /// </summary>
        public string City { get; set; }
    }

}