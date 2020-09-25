using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pandemitrac.Server.Models.Input
{
    /// <summary>
    /// Eine getrackte Person
    /// </summary>
    public class Visitor
    {
        /// <summary>
        /// ID der Person
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Vorname
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string FirstName { get; set; }

        /// <summary>
        /// Nachname
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string LastName { get; set; }

        /// <summary>
        /// Addresse
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// PLZ
        /// </summary>
        [Range(00000, 99999)]
        public int PostCode { get; set; }

        /// <summary>
        /// Stadt
        /// </summary>
        public string City { get; set; }

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