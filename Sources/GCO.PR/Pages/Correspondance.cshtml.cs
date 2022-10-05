using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GCO.PR.Pages
{
    public class GCOCorrespondanceModel : PageModel
    {
        /// <summary>
        /// Code de correspondance
        /// </summary>
        public string? CodeCorrespondance { get; set; }
  
        /// <summary>
        /// Code de correspondance
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public IActionResult OnGet(string c)
        {
            CodeCorrespondance = c;
            return Page();
        }

    }
}
