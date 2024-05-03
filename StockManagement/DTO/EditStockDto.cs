using System.ComponentModel.DataAnnotations;

namespace StockManagement.DTO
{
    public class EditStockDto
    {
        [Required]
        public string Stock_Name { get; set; }

        public string Stock_Image { get; set; }

        public int Quantity { get; set; } = 0;

        public string Category { get; set; } = string.Empty;

        public decimal Price { get; set; }
    }
}
