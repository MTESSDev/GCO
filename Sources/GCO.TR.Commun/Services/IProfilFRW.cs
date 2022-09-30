using CAC.AccesProfil.Client;

namespace GCO.TR.Commun.Services
{
    public interface IProfilGCO : IAccesProfil
    {
        public void ForcerChargementProfil(string codeUtilisateurComplet);
        public string ObtenirValeurCacherErreur(string nomVariable, string valeurRemplacement);
    }
}
