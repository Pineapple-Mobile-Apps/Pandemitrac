using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Logic.Core
{
    public class DependentSubjectManager
    {
        private DatabaseContext DatabaseContext { get; }

        public DependentSubjectManager(DatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
        }
        
        /// <summary>
        /// Ruft den aktuellen Status eines <see cref="DependentSubject"/>s ab.
        /// </summary>
        /// <param name="dependentSubject">Verweis auf den <see cref="DependentSubject"/></param>
        /// <returns>Ein <see cref="ChangeDependentSubjectStateEntry"/>, welcher den neusten Status repräsentiert."</returns>
        public async Task<ChangeDependentSubjectStateEntry> GetDependentSubjectStateAsync(DependentSubject dependentSubject)
        {
            var stateEntries = DatabaseContext.ChangeDependentSubjectStateEntries;
            var subjectStateHistory =
                from stateEntry in stateEntries
                where stateEntry.DependentSubjectId == dependentSubject.Id
                orderby stateEntry.DateTime descending
                select stateEntry;
            if ((await subjectStateHistory.CountAsync()) == 0)
            return subjectStateHistory.First();
        }

        /// <summary>
        /// Ändert den aktuellen Status eines <see cref="DependentSubject"/>s.
        /// </summary>
        /// <param name="dependentSubject">Verweis auf den <see cref="DependentSubject"/>.</param>
        /// <param name="newState">Neuer Status.</param>
        /// <returns>Informationen zum asynchronen Vorgang.</returns>
        public async Task UpdateDependentSubjectStateAsync(DependentSubject dependentSubject, DependentSubjectState newState)
            {
            var stateEntries = DatabaseContext.ChangeDependentSubjectStateEntries;
            var entry = CreateState(dependentSubject.Id, newState);
            await stateEntries.AddAsync(entry);
                await DatabaseContext.SaveChangesAsync();
            }

        }

        /// <summary>
        /// Fabrikmethode zum Erzeugen einer <see cref="ChangeDependentSubjectStateEntry"/>-Instanz.
        /// </summary>
        /// <param name="dependentSubjectId">ID des <see cref="DependentSubject"/>s, dem der Eintrag zugeordnet werden soll.</param>
        /// <returns>Erzeugte <see cref="ChangeDependentSubjectStateEntry"/>-Instanz.</returns>
        protected virtual ChangeDependentSubjectStateEntry CreateState(int dependentSubjectId) => new ChangeDependentSubjectStateEntry()
        {
            DependentSubjectId = dependentSubjectId,
            CurrentState = DependentSubjectState.Pending,
            DateTime = DateTime.Now
        };
    }
}