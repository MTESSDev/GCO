using GCO.TR.Contrats.Journalisation;
using System;

namespace GCO.TR.Commun.Services
{
    public interface IJournalisationServiceBase
    {
        void JournaliserSIG(CodeOptionTransaction codeOptionTransaction, string codeTransaction, string codePartieVariable, object valeurPartieVariable, int? idFormulaire = null, Guid? idSession = null);
    }
}
