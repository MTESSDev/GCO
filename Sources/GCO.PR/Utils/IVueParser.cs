using System;
using System.Collections.Generic;

namespace GCO.PR.Utils
{
    public interface IVueParser
    {
        Dictionary<string, object?> ParseData<TModel>(TModel model);
    }
}