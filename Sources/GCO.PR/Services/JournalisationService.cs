using GCO.TR.Commun.Services;
using GCO.TR.Contrats;
using Microsoft.AspNetCore.Http;

namespace GCO.PR.Services
{
    public class JournalisationService : JournalisationServiceBase, IJournalisationService
    {
        public JournalisationService(IDorsale dorsale, IHttpContextAccessor httpAccessor) : base(dorsale, httpAccessor)
        { }

    }
}