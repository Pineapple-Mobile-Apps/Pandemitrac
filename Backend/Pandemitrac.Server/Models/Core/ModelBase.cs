using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pandemitrac.Server.Models.Core
{
    /// <summary>
    /// Basisklasse für Model-Entitäten.
    /// </summary>
    public abstract class ModelBase
    {
        /// <summary>
        /// Primärschlüssel der Entität.
        /// </summary>
        /// <value>Datenbank-generierter ganzahliger Wert.</value>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}