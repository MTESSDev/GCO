﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace FRW.PR.Extra.Pages
{
    public class SaveModel : PageModel
    {
        private readonly ILogger<SaveModel> _logger;

        public SaveModel(ILogger<SaveModel> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> OnPost(string id)
        {
            string jsonData;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                jsonData = await reader.ReadToEndAsync();
            }

            HttpContext.Response.Cookies.Append("FRW" + id, jsonData);

            return new OkResult();
        }
    }
}
