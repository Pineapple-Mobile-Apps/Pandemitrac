namespace Pandemitrac.Server.Models.Core
{
    /// <summary>
    /// Repräsentiert einen Sachbearbeiter, der einen <see cref="Case"/> bearbeitet.
    /// </summary>
    public class Editor : ModelBase
    {
        /// <summary>
        /// Ruft den vollen Namen des Sachbearbeites ab oder legt diesen fest.
        /// </summary>
        /// <value>Automatisch gespeicherter Wert.</value>
        public string Name { get; set; }
    }
}