namespace Pandemitrac.Server.Models.Core {

    /// <summary>
    /// Status einer anhängenden Person
    /// </summary>
    public enum DependentSubjectState {

        /// Ausstehender Status
        Pending,
        /// Person wurde versucht zu kontaktiert. Kein Erfolg
        NotAvailable,
        /// Person wurde kontaktiert, ein Test ist ausstehend
        TestPending,
        /// Person wird momentan getestet, Ergebniss ausstehend
        Testing,
        /// Person ist positiv getestet
        Positiv,
        /// Person ist negativ getestet
        Negativ
    }

}