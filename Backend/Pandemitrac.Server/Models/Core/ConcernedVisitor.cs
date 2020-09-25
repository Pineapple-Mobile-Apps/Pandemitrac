using System.ComponentModel.DataAnnotations.Schema;
using Pandemitrac.Server.Model.Input;

namespace Pandemitrac.Server.Model.Core {

    /// <summary>
    /// Relation eines Falls zu einem Besucher
    /// </summary>
    public class ConcernedVisitor {

        /// <summary>
        /// Fall Id
        /// </summary>
        public int CaseId {get;set;}

        /// <summary>
        /// Besucher Id
        /// </summary>
        public int VisitorId {get;set;}

        /// <summary>
        /// Zugeordneter Fall
        /// </summary>
        [ForeignKey("CaseId")]
        public Case Case {get;set;}

        /// <summary>
        /// Zugeordneter Besucher
        /// </summary>
        [ForeignKey("VisitorId")]
        public Visitor Visitor {get;set;}

    }

}