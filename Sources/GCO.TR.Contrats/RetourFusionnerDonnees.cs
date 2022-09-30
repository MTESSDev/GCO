using System.Runtime.Serialization;

namespace GCO.TR.Contrats
{
    [DataContract]
    public class RetourFusionnerDonnees
    {
        [DataMember(Name = "fichier")]
        public byte[] Fichier { get; set; } = default!;

        [DataMember(Name = "nom")]
        public string Nom { get; set; } = default!;
    }
}