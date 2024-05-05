using Azure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StockManagement.Data;
using StockManagement.DTO;
using StockManagement.Entities;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly DataContext _context;

        public StockController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<Stock>> GetAllStock(
        [FromQuery] string stockName = "",
        [FromQuery] string category = "",
        [FromQuery] decimal? startPriceValue = null,
        [FromQuery] decimal? endPriceValue = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 5
        )
        {
            IQueryable<Stock> query = _context.Stocks;

            if (!string.IsNullOrEmpty(stockName))
            {
                query = query.Where(item => item.Stock_Name.Contains(stockName));
            }

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(item => item.Category.Contains(category));
            }

            if (startPriceValue != null && endPriceValue != null)
            {
                query = query.Where(s => s.Price >= startPriceValue && s.Price <= endPriceValue);
            }
            else if (startPriceValue != null)
            {
                query = query.Where(s => s.Price >= startPriceValue);
            }
            else if (endPriceValue != null)
            {
                query = query.Where(s => s.Price <= endPriceValue);
            }

            var totalItems = await query.CountAsync();
            var stocks = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var response = new StockResponse
            {
                Stocks = stocks,
                Total = totalItems
            };

            return Ok(response);
        }


        [HttpGet("[action]")]
        public async Task<ActionResult<Stock>> GetStockById([FromQuery] int id)
        {
            var Stock = await _context.Stocks.FindAsync(id);
            if (Stock == null)
            {
                return NotFound("Stock Not Found");
            }
            return Ok(Stock);
        }

        [HttpPost]
        public async Task<IActionResult> AddStock([FromForm] AddStockDto addStock)
        {
            try
            {
                Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
                addStock.Stock_Image = regex.Replace(addStock.Stock_Image, string.Empty);
                byte[] fileByte = Convert.FromBase64String(addStock.Stock_Image);
                Stock stock = new Stock
                {
                    Stock_Image = fileByte,
                    Category = addStock.Category,
                    Stock_Name = addStock.Stock_Name,
                    Price = addStock.Price,
                    Quantity = addStock.Quantity,
                };
                _context.Stocks.Add(stock);
                await _context.SaveChangesAsync();

                return Ok(
                    new ApiResponseMessage
                    {
                        Status = "Success",
                        Message = $"Successfully Added {stock.Stock_Name}"
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut]
        public async Task<IActionResult> UpdateStock([FromQuery] int id, [FromForm] EditStockDto updateStock)
        {
            var dbStock = await _context.Stocks.FindAsync(id);
            if (dbStock == null)
            {
                return NotFound("Stock Not Found");
            }

            if (!string.IsNullOrEmpty(updateStock.Stock_Image))
            {
                Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
                updateStock.Stock_Image = regex.Replace(updateStock.Stock_Image, string.Empty);
                byte[] fileByte = Convert.FromBase64String(updateStock.Stock_Image);
                dbStock.Stock_Image = fileByte;
            }
            dbStock.Stock_Image = dbStock.Stock_Image;
            dbStock.Stock_Name = updateStock.Stock_Name;
            dbStock.Quantity = updateStock.Quantity;
            dbStock.Category = updateStock.Category;
            dbStock.Price = updateStock.Price;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new ApiResponseMessage
                {
                    Status = "Success",
                    Message = $"Successfully Edited Stock Id {id}"
                });
            }
            catch (Exception)
            {
                return BadRequest();
                throw;
            }
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteStockById([FromQuery] int id)
        {
            var dbStock = await _context.Stocks.FindAsync(id);
            if (dbStock == null)
            {
                return NotFound("Stock Not Found");
            }

            try
            {
                _context.Stocks.Remove(dbStock);
                await _context.SaveChangesAsync();

                return Ok(
                    new ApiResponseMessage
                    {
                        Status = "Success",
                        Message = $"Deleted Stock Id {id}"
                    });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
