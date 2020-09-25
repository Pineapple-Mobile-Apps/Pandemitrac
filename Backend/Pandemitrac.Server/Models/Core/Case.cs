using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Pandemitrac.Server.Models.Core;
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
    }

}