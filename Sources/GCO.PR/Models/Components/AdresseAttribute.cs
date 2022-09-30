using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace GCO.PR.Models.Components
{
    /// <summary>
    /// Initialise une nouvelle instance de AdresseAttribute
    /// </summary>
    public class AdresseAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            return !string.IsNullOrEmpty(value?.ToString());
        }
    }
}