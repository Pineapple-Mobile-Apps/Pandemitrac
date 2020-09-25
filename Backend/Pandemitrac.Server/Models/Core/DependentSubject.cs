using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Models.Core
{
    /// <summary>
    /// Weitere betroffene Personen
    /// z.B Person X ist betroffen und hatte Kontakt mit Person Y
    /// </summary>
    public class DependentSubject : ModelBase
    {
        /// <summary>
        /// Fall Id
        /// </summary>
        public int CaseId { get; set; }

        /// <summary>
        /// Besucher Id
        /// </summary>
        public int VisitorId { get; set; }

        /// <summary>
        /// Zugeordneter Fall
        /// </summary>
        [ForeignKey("CaseId")]
        public Case Case { get; set; }

        /// <summary>
        /// Zugeordneter Besucher
        /// </summary>
        [ForeignKey("VisitorId")]
        public Visitor Visitor { get; set; }

        /// <summary>
        /// Verlauf dieser Statusänderungen
        /// </summary>
        public List<ChangeDependentSubjectStateEntry> History { get; set; }

    }

}