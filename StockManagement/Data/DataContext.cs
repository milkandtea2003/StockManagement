using Microsoft.EntityFrameworkCore;
using StockManagement.Entities;

namespace StockManagement.Data

{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<Stock> Stocks { get; set; }
    }
}
