using System.Collections.Generic;

namespace GCO.PR.Models
{
    public class EntrantGenererDocument
    {
        public byte[] Gabarit { get; set; }
        public Dictionary<string, object> Donnees { get; set; }
        public Options Options { get; set; }
    }

    public class Options
    {
        public string NomFichier { get; set; }
        public bool IgnorerChampsAbsent { get; set; } = true;
    }
}
