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
        /// Erzeugt einen Besucher
        /// </summary>
        /// <param name="visitor">Besucher</param>
        /// <returns></returns>
        public async Task CreateVisitorAsync(Visitor visitor)
        {
            var existingVisitor = CheckForDuplicate(visitor);

            if (existingVisitor != null)
            {
                visitor.Id = existingVisitor.Id;
            }
            else
            {
                _db.Visitors.Add(visitor);
                await _db.SaveChangesAsync();
            }
        }

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
    }

}