# SAI I LAMA - Installation Guide

[![License](https://img.shields.io/github/license/username/erp-os.svg?style=flat-square)](https://github.com/username/erp-os/blob/master/LICENSE)

This setup guide is for setting up the ERP OS application in a local development environment. You can also host this application on various cloud hosting providers such as AWS, GCP, AZURE, DigitalOcean, Heroku, Netlify, Vercel, Render, etc.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Database (PostgreSQL)](#database-postgresql)
- [Backend (Express/Node.js)](#backend-expressnodejs)
- [Frontend (React.js)](#frontend-reactjs)
- [Features and Functionalities](#Features-and-Functionalities)
- [Collaboration](#collaboration)
- [License](#license)

## Prerequisites

Before starting the installation process, you need to ensure that the following prerequisites are met:

- Download and Install the LTS version (Current LTS version is 16.18.0) of the Node.js runtime environment from the official website [here](https://nodejs.org/en/download/).
- Download and Install the PostgreSQL database from the official website [here](https://www.postgresql.org/download/).
- Type command: `npm install --global yarn`. It will install the Yarn package manager globally on your machine if it is not already installed.

Without installing Node.js, you cannot use the npm command. To check whether Node.js has been installed correctly, type the command `node --version` in your terminal. It will show the current Node.js version of your machine.

## Database (PostgreSQL)

1. At the time of installation, make a note of the database username, password, and port number.
2. After installing PostgreSQL, you need to create a database. To create a database, open the psql command shell and type: `CREATE DATABASE erp;`.
3. Remember your database username, password, port, and the name of the created database. You will need them later in the backend part to set up the environmental variable in the .env file.

## Backend (Express/Node.js)

1. Navigate into the backend folder `ERP_OS_Backend` from your command prompt/terminal.
2. Type command: `yarn`. It will install all the required libraries and packages required for the backend. If you see any warnings while running yarn, you have to activate the script to run the yarn command in your machine. Or you can use the npm install command instead of yarn.
3. You will find a `.env` file in the root directory of the backend `ERP_OS_Backend`, set appropriate values for all the variables. To do this, edit the `.env` file and change all the variables accordingly.
4. Type command: `yarn prisma migrate dev`. It will create the required database table and data in the PostgreSQL database that you have installed previously.
5. Type command: `yarn start`. It will start the backend server on `http://localhost:5000/`.

## Frontend (React.js)

1. Navigate to the frontend folder `ERP_OS_Frontend` from your command prompt/terminal.
2. Type command: `yarn`. It will install all the required libraries and packages required for the frontend.
3. You will find a `.env` file in the root directory of the front and set the variable `REACT_APP_API = http://localhost:5000/v1/`.
4. Type in your terminal command: `yarn start`. It will start the frontend server on `http://localhost:3000/`.

## Features and Functionalities

The Elegant Dashboard Design includes the following features and functionalities:

- Elegant and user-friendly dashboard
- Date-wise total sales, purchase, and invoice numbers
- Date-wise Sales vs Profit time-series graph
- Sale vs Purchase pie chart
- Product management module
- Manage product list and quantity
- Add new products
- Edit, delete, and view products
- Category-wise product management
- New category creation
- Purchase module
- Make invoices with auto-calculation
- View purchase invoice and history of payments
- Make payments to the due invoice
- View date-wise total purchase invoice, amount, due, and paid
- Inventory products updated on purchase
- Purchase Returns module
- Return products of any purchase invoice
- Auto-adjust payment and stock on return
- Sales module
- Generate sale invoices against any customer
- View sales invoice and history of payments
- Receive payment to the due invoice
- View date-wise total sale invoice, amount, due, paid, and profit
- Sales Returns module
- Return products of any sale invoice
- Auto-adjust payment and stock on return
- Supplier module
- Manage all suppliers
- Add, edit, delete, and view suppliers
- View all purchase invoices of a single supplier
- Manage supplier's due and other records
- Customer module
- Manage all customers
- Add, edit, delete, and view customers
- View all purchase invoices of a single customer
- Manage customer's due and other records
- HR Management module
- Add, edit, delete, and view users and assign roles
- Add, edit, delete, and view customers and suppliers
- Create new designations and assign them to your staff
- Fully dynamic permission and role management with a level of access control
- Accounting module
- Manage general ledger, individual ledger, trial balance, balance sheet, and income statement (profit and loss report)
- Reports module
- Access all transaction history with date-wise pagination
- View total date-wise sales and profit, total date-wise purchase, customers, suppliers, due, and top-buying-customers
- POS interface and thermal invoice printing
- PWA available on both Android and iOS
- Pagination in all table views and date-wise data view in a table
- Barcode generation, printing, and scanning
- Packing Slip printing
- Dynamic Invoice Header, Footer data edit
- Bulk CSV data upload
- Download data as CSV
- Product search


## Collaboration

Contributions to this project are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE).