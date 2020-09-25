using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Models.Core
{
    /// <summary>
    /// Ein zu überwachender Fall
    /// </summary>
    public class Case : ModelBase
    {
        /// <summary>
        /// Zeitpunkt der Erstellung
        /// </summary>
        [Required]
        public DateTime Created { get; set; }

        /// <summary>
        /// Besucher Id 
        /// </summary>
        public int SubjectId { get; set; }

        /// <summary>
        /// Betroffene Person
        /// </summary>
        [ForeignKey("SubjectId")]
        public Visitor Subject { get; set; }

        /// <summary>
        /// Betroffende Personen
        /// </summary>
        public List<DependentSubject> DependentSubjects { get; set; }

        /// <summary>
        /// Datum des Tests
        /// </summary>
        public DateTime? TestDate { get; set; }

        /// <summary>
        /// Datum an dem positiv getestet wurde
        /// </summary>
        public DateTime? PositivTestDate { get; set; }

        /// <summary>
        /// Beginn der Quarantäne
        /// </summary>
        public DateTime? QuarantineBegin { get; set; }

        /// <summary>
        /// Enddatum der Quarantäne
        /// </summary>
        /// <value></value>
        public DateTime? QuarantineEnd { get; set; }

        /// <summary>
        /// Liste der Besuche
        /// </summary>
        public List<Visit> Visits { get; set; }
    }

}