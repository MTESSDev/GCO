using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace GCO.TR.Contrats
{
    [DataContract]
    public class RetourCreerReprendreFormulaireIndividu
    {
        [DataMember]
        public string NoPublicSession { get; set; } = default!;

        [DataMember]
        public string NoPublicForm { get; set; } = default!;

    }
}
