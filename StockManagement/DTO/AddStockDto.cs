using Microsoft.EntityFrameworkCore;

namespace StockManagement.DTO
{
    public class AddStockDto
    {
        public required string Stock_Name { get; set; }

        public required string Stock_Image { get; set; }
        public int Quantity { get; set; } = 0;

        public string Category { get; set; } = string.Empty;

        public Decimal Price { get; set; }
    }
}
