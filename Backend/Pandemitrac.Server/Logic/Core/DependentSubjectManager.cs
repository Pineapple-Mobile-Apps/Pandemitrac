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
        /// <param name="dependentSubjectId">ID des <see cref="DependentSubject"/></param>
        /// <returns>Ein <see cref="ChangeDependentSubjectStateEntry"/>, welcher den neusten Status repräsentiert."</returns>
        public async Task<ChangeDependentSubjectStateEntry> GetDependentSubjectStateAsync(int dependentSubjectId)
        {
            var stateEntries = DatabaseContext.ChangeDependentSubjectStateEntries;
            var subjectStateHistory =
                from stateEntry in stateEntries
                where stateEntry.DependentSubjectId == dependentSubjectId
                orderby stateEntry.DateTime descending
                select stateEntry;
            if ((await subjectStateHistory.CountAsync()) == 0)
                await UpdateDependentSubjectStateAsync(dependentSubjectId, DependentSubjectState.Pending);
            return subjectStateHistory.First();
        }

        /// <summary>
        /// Ändert den aktuellen Status eines <see cref="DependentSubject"/>s.
        /// </summary>
        /// <param name="dependentSubjectId">ID des <see cref="DependentSubject"/>.</param>
        /// <param name="newState">Neuer Status.</param>
        /// <returns>Informationen zum asynchronen Vorgang.</returns>
        public async Task UpdateDependentSubjectStateAsync(int dependentSubjectId, DependentSubjectState newState)
        {
            var stateEntries = DatabaseContext.ChangeDependentSubjectStateEntries;
            var entry = CreateState(dependentSubjectId, newState);
            await stateEntries.AddAsync(entry);
            await DatabaseContext.SaveChangesAsync();
        }

        /// <summary>
        /// Erzeugt eine <see cref="DependentSubjectStateWrapper"/>-Instanz für einen <see cref="DependentSubject"/>.
        /// </summary>
        /// <param name="dependentSubject"><see cref="DependentSubject"/>-Instanz, für der Wrapper erzeugt wird.</param>
        /// <returns>Erzeugter Wrapper.</returns>
        public async Task<DependentSubjectStateWrapper> CreateStateWrapper(DependentSubject dependentSubject)
        {
            var initialState = (await GetDependentSubjectStateAsync(dependentSubject.Id)).CurrentState;
            return new DependentSubjectStateWrapper(dependentSubject, initialState, this);
        }

        /// <summary>
        /// Fabrikmethode zum Erzeugen einer <see cref="ChangeDependentSubjectStateEntry"/>-Instanz.
        /// </summary>
        /// <param name="dependentSubjectId">ID des <see cref="DependentSubject"/>s, dem der Eintrag zugeordnet werden soll.</param>
        /// <param name="state">Initialer Status des Änderungseintrags (optional).</param>
        /// <returns>Erzeugte <see cref="ChangeDependentSubjectStateEntry"/>-Instanz.</returns>
        protected virtual ChangeDependentSubjectStateEntry CreateState(int dependentSubjectId, DependentSubjectState state) => new ChangeDependentSubjectStateEntry()
        {
            DependentSubjectId = dependentSubjectId,
            CurrentState = state,
            DateTime = DateTime.Now
        };
    }
}