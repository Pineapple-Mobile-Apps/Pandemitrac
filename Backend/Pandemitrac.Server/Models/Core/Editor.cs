namespace Pandemitrac.Server.Models.Core
{
    /// <summary>
    /// Repräsentiert einen Sachbearbeiter, der einen <see cref="Case"/> bearbeitet.
    /// </summary>
    public class Editor : ModelBase
    {
        /// <summary>
        /// Ruft den Vornamen des Sachbearbeites ab oder legt diesen fest.
        /// </summary>
        /// <value>Automatisch gespeicherter Wert.</value>
        public string FirstName { get; set; }

        /// <summary>
        /// Ruft den Nachnamen des Sachbearbeites ab oder legt diesen fest.
        /// </summary>
        /// <value>Automatisch gespeicherter Wert.</value>
        public string LastName { get; set; }
    }
}