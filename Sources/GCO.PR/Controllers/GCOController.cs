using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.ServiceModel.Syndication;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml;
using GCO.PR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Serilog;
using Serilog.Context;

namespace GCO.PR.Controllers
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class GCOController : Controller
    {
        private readonly HttpMessageHandler _httpMessageHandler;
        private readonly IConfiguration _configuration;

        public GCOController(IConfiguration configuration)
        {
            if (configuration is null) { throw new ArgumentNullException(nameof(configuration)); }


            /* _httpMessageHandler = EcsHttpMessageHandler.CreerMessageHandler(configuration.GetValue<string>("ECS:NomCertificatClientProxy"));
             _httpClient = new HttpClient(_httpMessageHandler)
             {
                 BaseAddress = new Uri(configuration["ECS:UrlDorsale"])
             };*/
            //_httpClient.DefaultRequestHeaders.Add("Accept", "text/xml");
        }

        //public List<string> ListeProp => new List<string>() { "ActionName", "TraceId", "Serveur", "RequestPath" };

        [HttpPost]
        public async Task<IActionResult> RemplirGabaritWord([FromBody] JsonElement json, [FromQuery] string type)
        {
            var scenario = json.GetProperty("scenario").GetString() ?? "";
            Dictionary<string, object> dict = new Dictionary<string, object>();
            switch (scenario)
            {
                case "1":
                    dict = new Dictionary<string, object>() {
                                        { "prenom", "Réjeanne" },
                                        { "nom", "Nadeau" },
                                        { "noCivique", "249" },
                                        { "rue", "rue De l'union" },
                                        { "ville", "Québec" },
                                        { "province", "QC" },
                                        { "codePostal", "G01 9K6" },
                                        { "date_emission", new DateTime(2022,09,02) },
                                        { "montant", 2154.54m },
                                        { "dateProd", DateTime.Now } };
                    break;
                case "2":
                    dict = new Dictionary<string, object>() {
                                        { "prenom", "Réjeanne" },
                                        { "nom", "Nadeau" },
                                        { "noCivique", "249" },
                                        { "rue", "rue De l'union" },
                                        { "ville", "Québec" },
                                        { "province", "QC" },
                                        { "enfants", new object[] { new Dictionary<string, object>() {
                                                    {"nom", "Noémie"}, {"datenaissance", "2006-08-11"}, {"nam", "NADN06082312"}
                                                }, new Dictionary<string, object>() {
                                                    {"nom", "Charles"}, {"datenaissance", "2001-04-04"}, {"nam", "NADC04042312"}
                                                }
                                            }
                                        },
                                        { "codePostal", "G01 9K6" },
                                        { "date_emission", new DateTime(2022,09,02) },
                                        { "montant", 2154.54m },
                                        { "dateProd", DateTime.Now } };
                    break;
            }

            var retour = await RemplirGabaritWord(new EntrantGenererDocument()
            {
                Gabarit = Convert.FromBase64String(json.GetProperty("fichier").GetString()),
                Donnees = dict,
                Options = new Options() { NomFichier = "test." + type, IgnorerChampsAbsent = true  }
            });

            return Ok(new { Fichier = retour });
        }


        private async Task<byte[]> RemplirGabaritWord(EntrantGenererDocument donnees)
        {
            var urlApi = "http://localhost:12444/";

            var donneesJson = JsonConvert.SerializeObject(donnees);

            var msg = new HttpRequestMessage(HttpMethod.Post, urlApi.TrimEnd('/') + "/api/GenererDocument/Generer")
            {
                Content = new StringContent(donneesJson, Encoding.UTF8, "application/json")
            };

            var retourGco = await new HttpClient().SendAsync(msg);

            if (!retourGco.IsSuccessStatusCode)
            {
                var msgErreur = await retourGco.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Appel GCO en erreur - {retourGco.StatusCode} - {msgErreur}");
            }

            return await retourGco.Content.ReadAsByteArrayAsync();
        }
    }
}
