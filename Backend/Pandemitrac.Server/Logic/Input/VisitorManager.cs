using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        private readonly TextInfo _textInfo;

        public VisitorManager(DatabaseContext db)
        {
            _db = db;

            CultureInfo cultureInfo = Thread.CurrentThread.CurrentCulture;
            _textInfo = cultureInfo.TextInfo;
        }

        /// <summary>
        /// Norminalisiert einen String
        /// (Trimmen + Capitalize)
        /// </summary>
        /// <param name="text">Text</param>
        /// <returns>Der norminalisierte String</returns>
        private string NorminalizeString(string text)
        {
            return _textInfo.ToTitleCase(text.Trim());
        }

        /// <summary>
        /// Norminalisiert einen Visitor
        /// </summary>
        /// <param name="visitor">Visitor</param>
        private void NormializeVisitor(Visitor visitor)
        {
            visitor.Name = NorminalizeString(visitor.Name);
        }

        /// <summary>
        /// Prüft bei einem Visitor auf ein Duplikat
        /// </summary>
        /// <param name="visitor">Visitor</param>
        /// <returns>null, wenn neu, sonst referenz zu MA</returns>
        public async Task<Visitor> CheckForDuplicate(Visitor visitor)
        {
            NormializeVisitor(visitor);

            var result = await _db.Visitors
                .Where(a => a.Name == visitor.Name && a.PostCode == visitor.PostCode)
                .FirstOrDefaultAsync();

            return result;
        }

        /// <summary>
        /// Erzeugt einen Besucher (ohne Bindungen)
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <returns>Wurde erstellt</returns>
        public async Task<bool> CreateVisitorAsync(Visitor visitor)
        {
            var existingVisitor = await CheckForDuplicate(visitor);

            if (existingVisitor != null)
            {
                visitor.Id = existingVisitor.Id;
                return false;
            }
            else
            {
                _db.Visitors.Add(visitor);
                await _db.SaveChangesAsync();
                return true;
            }
        }

        /// <summary>
        /// Erzeugt einen Besucher abhängig zu einem Fall
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <param name="caseId">Fall Id</param>
        /// <returns>Async</returns>
        public async Task CreateDependingVisitorAsync(Visitor visitor, int caseId)
        {
            await CreateVisitorAsync(visitor);

            var dependentSubject = new DependentSubject
            {
                CaseId = caseId,
                VisitorId = visitor.Id
            };

            _db.DependentSubjects.Add(dependentSubject);

            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Bestimmt, in welcher Relation ein <see cref="Visitor"/> zu einem <see cref="Case"/> steht.
        /// </summary>
        /// <param name="visitorId"><see cref="Visitor"/>-ID.</param>
        /// <param name="caseId"><see cref="Case"/>-ID.</param>
        /// <returns><code>true</code>, wenn der Besucher direkt betroffen ist, <code>false</code>, wenn der Besucher indirekt betroffen ist,
        /// <code>null</code>, wenn der Besucher nicht betroffen ist.</returns>
        public async Task<bool?> IsVisitorDependentSubject(int visitorId, int caseId)
        {
            var @case = await _db.Cases.FindAsync(caseId);
            var visitor = await _db.Visitors.FindAsync(visitorId);
            if (@case == null || visitor == null)
                return null;
            var caseDependentSubjectIds =
                from subject in @case.DependentSubjects
                where subject.VisitorId == visitorId
                select subject.VisitorId;
            if (caseDependentSubjectIds.Count() > 0)
                return true;
            else if (@case.SubjectId == visitorId)
                return false;
            else
                return null;
        }
    }

}