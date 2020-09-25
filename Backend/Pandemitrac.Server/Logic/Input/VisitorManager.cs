using System.Collections.Generic;
using System.Threading.Tasks;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Logic.Input
{

    /// <summary>
    /// Verwaltet Besucher
    /// </summary>
    public class VisitorManager
    {

        private readonly DatabaseContext _db;

        public VisitorManager(DatabaseContext db)
        {
            _db = db;
        }

        public async Task CreateVisitorAsync(Visitor visitor, int caseId)
        {
            // TODO: Duplikat prüfen

            _db.Visitors.Add(visitor);

            var dependentSubject = new DependentSubject
            {
                CaseId = caseId,
                Visitor = visitor
            };

            _db.DependentSubjects.Add(dependentSubject);

            await _db.SaveChangesAsync();
        }
    }

}