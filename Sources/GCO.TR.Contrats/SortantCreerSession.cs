using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace GCO.TR.Contrats
{
    [DataContract]
    public class SortantCreerSession
    {
        [DataMember]
        public Guid NoPublicSession { get; set; }

        [DataMember]
        public DateTime? DateExpiration { get; set; } = default!;
    }
}
