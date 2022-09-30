using System;
using System.Runtime.Serialization;

namespace GCO.TR.Contrats
{
    [DataContract]
    public class EntrantSupprimerSession
    {
        [DataMember]
        public Guid NumeroSession { get; set; }

        [DataMember]
        public string? CodeNatureSession { get; set; }
    }
}
