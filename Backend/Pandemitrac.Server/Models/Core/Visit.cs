using System;
using System.ComponentModel.DataAnnotations.Schema;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Models.Core
{
    /// <summary>
    /// Ein Besuch einer infizierten Person
    /// </summary>
    public class Visit : ModelBase
    {
        /// <summary>
        /// ID des Falls
        /// </summary>
        public int CaseId { get; set; }

        /// <summary>
        /// Der Fall
        /// </summary>
        public virtual Case Case { get; set; }

        /// <summary>
        /// Beginn des Besuchs
        /// </summary>
        public DateTime Begin { get; set; }

        /// <summary>
        /// Ende des Besuchs
        /// </summary>
        public DateTime End { get; set; }

        /// <summary>
        /// Id des Ortes
        /// </summary>
        public int LocationId { get; set; }

        /// <summary>
        /// Der Ort
        /// </summary>
        [ForeignKey("LocationId")]
        public virtual Location Location { get; set; }

        /// <summary>
        /// Wann versucht wurde diesen Besucher zu kontaktieren
        /// </summary>
        public DateTime Contacted { get; set; }

    }

}