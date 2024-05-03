using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace StockManagement.Entities
{
    public class Stock
    {
        [Key]
        public int  Stock_ID { get; set; }
        public required string Stock_Name { get; set; }
        public required byte[] Stock_Image { get; set; }

        public int Quantity { get; set; } = 0;

        public string Category { get; set; } = string.Empty;

        [Precision(10,2)]
        public Decimal Price { get; set; }

        [NotMapped] 
        public decimal Total_Value => Quantity * Price;

    }
}
