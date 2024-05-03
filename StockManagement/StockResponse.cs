using StockManagement.Entities;

namespace StockManagement
{
    public class StockResponse
    {
        public List<Stock> Stocks { get; set; } = new List<Stock>();
        public int Total { get; set; }
    }
}
