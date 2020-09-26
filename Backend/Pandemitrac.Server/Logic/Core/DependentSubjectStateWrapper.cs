using System.Threading.Tasks;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Logic.Core
{
    public class DependentSubjectStateWrapper
    {
        private SubjectState currentState;

        private DependentSubject DependentSubject { get; }
        private DependentSubjectManager DependentSubjectManager { get; }

        public DependentSubjectStateWrapper(DependentSubject dependentSubject, DependentSubjectState initialState, DependentSubjectManager dependentSubjectManager)
        {
            DependentSubjectManager = dependentSubjectManager;
            currentState = CreateInitialState(initialState);
        }

        /// <summary>
        /// Erzeugt ein entsprechendes <see cref="SubjectState"/>-Objekt.
        /// </summary>
        /// <param name="initialState">Status, für den das <see cref="SubjectState"/>-Objekt erzeugt wird.</param>
        /// <returns>Erzeugtes <see cref="SubjectState"/>-Objekt.</returns>
        private SubjectState CreateInitialState(DependentSubjectState initialState)
        {
            switch (initialState)
            {
                case DependentSubjectState.Pending:
                    return new PendingState()
                    {
                        DependentSubject = DependentSubject,
                        DependentSubjectManager = DependentSubjectManager
                    };
                case DependentSubjectState.NotAvailable:
                    return new NotAvailableState()
                    {
                        DependentSubject = DependentSubject,
                        DependentSubjectManager = DependentSubjectManager
                    };
                case DependentSubjectState.TestPending:
                    return new TestPendingState()
                    {
                        DependentSubject = DependentSubject,
                        DependentSubjectManager = DependentSubjectManager
                    };
                case DependentSubjectState.Testing:
                    return new TestingState()
                    {
                        DependentSubject = DependentSubject,
                        DependentSubjectManager = DependentSubjectManager
                    };
                case DependentSubjectState.Positiv:
                    return new PositiveState()
                    {
                        DependentSubject = DependentSubject,
                        DependentSubjectManager = DependentSubjectManager
                    };
                case DependentSubjectState.Negativ:
                    return new NegativeState()
                    {
                        DependentSubject = DependentSubject,
                        DependentSubjectManager = DependentSubjectManager
                    };
            }
            return null;
        }

        public async Task Set(DependentSubjectState newState)
        {
            switch (newState)
            {
                case DependentSubjectState.NotAvailable:
                    await SetNotAvailable();
                    break;
                case DependentSubjectState.TestPending:
                    await SetTestPending();
                    break;
                case DependentSubjectState.Testing:
                    await SetTesting();
                    break;
                case DependentSubjectState.Positiv:
                    await SetPositive();
                    break;
                case DependentSubjectState.Negativ:
                    await SetNegative();
                    break;
            }
        }

        /// <summary>
        /// Löst den Übergang auf den <see cref="DependentSubjectState.NotAvailable"/>-Zustand aus.
        /// </summary>
        /// <returns>Nächster Zustand.</returns>
        public async Task SetNotAvailable() => currentState = await currentState.SetNotAvailable();

        /// <summary>
        /// Löst den Übergang auf den <see cref="DependentSubjectState.TestPending"/>-Zustand aus.
        /// </summary>
        /// <returns>Nächster Zustand.</returns>
        public async Task SetTestPending() => currentState = await currentState.SetTestPending();

        /// <summary>
        /// Löst den Übergang auf den <see cref="DependentSubjectState.Testing"/>-Zustand aus.
        /// </summary>
        /// <returns>Nächster Zustand.</returns>
        public async Task SetTesting() => currentState = await currentState.SetTesting();

        /// <summary>
        /// Löst den Übergang auf den <see cref="DependentSubjectState.Positiv"/>-Zustand aus.
        /// </summary>
        /// <returns>Nächster Zustand.</returns>
        public async Task SetPositive() => currentState = await currentState.SetPositive();

        /// <summary>
        /// Löst den Übergang auf den <see cref="DependentSubjectState.Negativ"/>-Zustand aus.
        /// </summary>
        /// <returns>Nächster Zustand.</returns>
        public async Task SetNegative() => currentState = await currentState.SetNegative();

        private abstract class SubjectState
        {
            public DependentSubject DependentSubject { get; set; }
            public DependentSubjectManager DependentSubjectManager { get; set; }
            public virtual async Task<SubjectState> SetNotAvailable() => await Task.Run(() => this);
            public virtual async Task<SubjectState> SetTestPending() => await Task.Run(() => this);
            public virtual async Task<SubjectState> SetTesting() => await Task.Run(() => this);
            public virtual async Task<SubjectState> SetPositive() => await Task.Run(() => this);
            public virtual async Task<SubjectState> SetNegative() => await Task.Run(() => this);
        }

        private class PendingState : NotAvailableState
        {
            public override async Task<SubjectState> SetNotAvailable()
            {
                await DependentSubjectManager.UpdateDependentSubjectStateAsync(DependentSubject.Id, DependentSubjectState.NotAvailable);
                return new NotAvailableState()
                {
                    DependentSubject = DependentSubject,
                    DependentSubjectManager = DependentSubjectManager
                };
            }
        }

        private class NotAvailableState : SubjectState
        {
            public override async Task<SubjectState> SetTestPending()
            {
                await DependentSubjectManager.UpdateDependentSubjectStateAsync(DependentSubject.Id, DependentSubjectState.TestPending);
                return new TestPendingState()
                {
                    DependentSubject = DependentSubject,
                    DependentSubjectManager = DependentSubjectManager
                };
            }
        }

        private class TestPendingState : SubjectState
        {
            public override async Task<SubjectState> SetTesting()
            {
                await DependentSubjectManager.UpdateDependentSubjectStateAsync(DependentSubject.Id, DependentSubjectState.Testing);
                return new TestingState()
                {
                    DependentSubject = DependentSubject,
                    DependentSubjectManager = DependentSubjectManager
                };
            }
        }

        private class TestingState : SubjectState
        {
            public override async Task<SubjectState> SetPositive()
            {
                await DependentSubjectManager.UpdateDependentSubjectStateAsync(DependentSubject.Id, DependentSubjectState.Positiv);
                // TODO: Fall anlegen
                return new PositiveState()
                {
                    DependentSubject = DependentSubject,
                    DependentSubjectManager = DependentSubjectManager
                };
            }

            public override async Task<SubjectState> SetNegative()
            {
                await DependentSubjectManager.UpdateDependentSubjectStateAsync(DependentSubject.Id, DependentSubjectState.Negativ);
                return new NegativeState()
                {
                    DependentSubject = DependentSubject,
                    DependentSubjectManager = DependentSubjectManager
                };
            }
        }

        private class PositiveState : SubjectState { }

        private class NegativeState : SubjectState { }
    }
}