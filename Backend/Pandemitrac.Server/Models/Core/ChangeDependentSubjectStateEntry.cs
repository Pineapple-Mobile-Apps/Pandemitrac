using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pandemitrac.Server.Models.Core
{
    /// <summary>
    /// Statusänderung zum Verlauf
    /// </summary>
    public class ChangeDependentSubjectStateEntry : ModelBase
    {
        /// <summary>
        /// Betroffene Person
        /// </summary>
        [Required]
        public int DependentSubjectId { get; set; }

        /// <summary>
        /// Betroffene Person
        /// </summary>
        /// <value></value>
        [ForeignKey("DependentSubjectId")]
        public DependentSubject DependentSubject {get;set;}

        /// <summary>
        /// Bearbeiter
        /// </summary>
        [Required]
        public int EditorId {get;set;}

        /// <summary>
        /// Bearbeiter
        /// </summary>
        [ForeignKey("EditorId")]
        public Editor Editor { get; set; }

        /// <summary>
        /// Status dieser Änderung
        /// </summary>
        /// <value></value>
        [Required]
        public DependentSubjectState CurrentState { get; set; }

        /// <summary>
        /// Kommentar 
        /// </summary>
        public string Comment { get; set; }
    }

}