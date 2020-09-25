using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Logic.Input
{
    public class LocationComparer : IEqualityComparer<Location>
    {
        public bool Equals([AllowNull] Location x, [AllowNull] Location y)
        {
            if (x == null || y == null)
                return false;
            return StringEquals(x.Name, y.Name) && StringEquals(x.Address, y.Address);
        }

        public int GetHashCode([DisallowNull] Location obj) => obj.GetHashCode();

        private bool StringEquals(string first, string second) => TransformString(first).Equals(TransformString(second));

        private string TransformString(string input) => input.ToLower().Trim().Replace(" ", "");
    }
}