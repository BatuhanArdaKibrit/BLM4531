using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Data
{
    public class Response
    {
        public string Message { get; set; } = string.Empty;
        public string? Token { get; set; } = null;
    }
}