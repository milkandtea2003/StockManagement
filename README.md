## Stock Management
Welcome to the Stock Management project! This application is built to streamline stock management tasks, providing users with a convenient interface to view, add, edit, and delete stock items efficiently.

## Technologies Used

* __Frontend__: Built with __React.js__ and library __Ant Design__. Ant Design provides a sleek and responsive user interface, enhancing the overall user experience.

* __Backend__: Developed with __ASP.NET Core Web API__ with __Entity Framework Core (EF Core)__, EF Core utilized for database interaction, offering seamless data access and manipulation.

* __Database__: Utilizes __Microsoft SQL Server (MS SQL)__ as the backend database management system. MS SQL provides robust data storage and retrieval capabilities, ensuring the reliability and scalability of the application.
## Demo Screenshots

![Home Index](Demonstration/HomeIndex.png)
__Figure 1__: Home Index - Overview of stock items

![Filter By Name](Demonstration/FilterByName.png)
__Figure 2__: Filter By Name - Searching for specific stock items by name


![Filter By Category](Demonstration/FilterByCategory.png)
__Figure 3__: Filter By Category - Filtering stock items by category


![Filter By Price](Demonstration/FilterByPrice.png)
__Figure 4__: Filter By Price - Filtering stock items by price range


![Add Stock](Demonstration/AddStockForm.png)
__Figure 5__: Add Stock Form - Adding a new stock item


![Add Result](Demonstration/AddStockResult.png)
__Figure 6__: Add Stock Result - Confirmation of successful stock addition


![Edit Stock](Demonstration/EditStockForm.png)
__Figure 7__: Edit Stock Form - Modifying an existing stock item


![Edit Result](Demonstration/EditOutcome.png)
__Figure 8__: Edit Result - Confirmation of successful stock item modification


![Delete Stock](Demonstration/DeletePopConfirm.png)
__Figure 9__: Delete Stock - Prompt for confirmation before deleting a stock item


![Delete Result](Demonstration/DeleteSuccess.png)
__Figure 10__: Delete Result - Confirmation of successful stock item deletion

## Getting Started

To run the Stock Management application locally, follow these steps:

### Frontend Setup

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

git clone https://github.com/milkandtea2003/StockManagement.git

2. **Install Frontend Dependencies**: Navigate to the project directory and install frontend dependencies using npm or yarn:

cd stockmanagement.client
npm install

3. **Run the Frontend**: Start the frontend development server:

npm run start

4. **Access the Frontend**: Open your web browser and navigate to `http://localhost:3000` to access the Stock Management application frontend.

### Backend Setup

5. **Open Backend Solution**: Navigate to the `StockManagement` folder in the cloned repository and locate the backend solution file (e.g., `StockManagement.sln`).

6. **Configure and Run the Backend**: Open the backend solution file in Visual Studio. If you don't have Visual Studio installed, you can download and install it from [Visual Studio](https://visualstudio.microsoft.com/downloads/). Once opened, build and run the backend project to start the ASP.NET Core Web Api server.

7. **Verify Backend Server**: After running the backend project, verify that the backend server is running and accessible.

8. **Connect Frontend to Backend**: Once the backend server is running, the frontend should automatically connect to it for data access and manipulation.

9. **Access the Application**: With both frontend and backend servers running, navigate to `http://localhost:3000` in your web browser to access the Stock Management application.

If you encounter any issues during setup or have questions about running the application, feel free to reach out for assistance.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss the proposed changes.

## License
This project is licensed under the __MIT License__.
