using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Pandemitrac.Server.Model.Input;

namespace Pandemitrac.Server.Model.Core
{

    /// <summary>
    /// Ein zu überwachender Fall
    /// </summary>
    public class Case
    {
        /// <summary>
        /// Id des Falles
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public DateTime Created { get; set; }

        public List<Visitor> ConcernedVisitors { get; set; }
    }

}