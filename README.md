# BCO Enterprise

A full-stack e-commerce and business marketplace platform designed to help vendors showcase their products online while giving customers an easy way to discover, compare, and purchase everyday products from different categories.

## 📌 About BCO Enterprise

**BCO Enterprise** is a web-based marketplace project developed to connect businesses and customers through a single online platform.

The idea behind BCO Enterprise came from combining different areas of everyday business, including:

* Solar energy products
* Electronics and home appliances
* Fashion
* Shoes
* School items
* Other everyday products

The platform allows businesses to showcase their products while customers can browse products, search and filter items, add products to their cart, place orders, and track their purchases.

BCO Enterprise also includes an **administration dashboard** where administrators can manage products, categories, customers, orders, and revenue.

---

## 🎯 Project Goals

BCO Enterprise was built with the following goals:

* Help businesses establish an online presence.
* Allow vendors to showcase their products digitally.
* Make it easier for customers to discover everyday products.
* Allow customers to browse different product categories.
* Provide an organized shopping experience.
* Give administrators tools to manage the marketplace.
* Create a foundation that can be expanded into a larger marketplace platform.

---

## ✨ Features

### 👤 Customer Features

* User registration
* User login
* Authentication
* Forgot password functionality
* Product browsing
* Product search
* Product filtering
* Product sorting
* Category-based browsing
* Product pagination
* Product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Checkout
* Order placement
* View previous orders
* Track orders
* WhatsApp contact option

### 🛒 Shopping Features

The shopping system supports:

* Product discovery
* Multiple product categories
* Search functionality
* Sorting
* Pagination
* Shopping cart
* Checkout
* Order creation
* Order tracking

Products can come from the BCO backend as well as external product/image sources used by the application.

### 🔐 Authentication

BCO Enterprise includes an authentication system for users.

The backend uses:

* JSON Web Tokens (JWT)
* Password hashing
* Protected API routes
* User authentication

Authentication information is stored on the frontend and used when accessing protected resources.

### 👨‍💼 Admin Dashboard

The platform includes an administration dashboard for managing the marketplace.

Administrators can work with:

* Dashboard overview
* Products
* Categories
* Customers
* Orders
* Revenue
* Product creation
* Product editing
* Product management
* Order management

The admin section is separated from the customer-facing shopping experience.

### 📊 Revenue Management

The admin dashboard includes a revenue section that processes order information to provide revenue-related information for the business.

This provides a foundation for monitoring business performance and can be expanded with more advanced analytics in the future.

---

## 🧰 Technologies Used

### Frontend

* React
* JavaScript
* HTML
* CSS
* Vite
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* CORS
* dotenv

### Database

* MongoDB
* MongoDB Atlas

### External Services

* DummyJSON — external product data
* Pexels — product images
* WhatsApp — customer communication

### Deployment

* Render — backend deployment
* MongoDB Atlas — cloud database

---

## 📁 Project Structure

The project is divided into frontend and backend applications.

### Frontend

The React frontend contains pages, components, services, styles, and administration functionality.

```text
frontend/
│
├── src/
│   ├── admin/
│   │   ├── AddProduct.jsx
│   │   ├── Category.jsx
│   │   ├── Customers.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditProduct.jsx
│   │   ├── Orders.jsx
│   │   ├── Products.jsx
│   │   └── Revenue.jsx
│   │
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Login.jsx
│   │   ├── MyOrders.jsx
│   │   ├── Register.jsx
│   │   ├── ShopProducts.jsx
│   │   ├── TrackOrder.jsx
│   │   └── ...
│   │
│   ├── services/
│   │   ├── externalProductService.js
│   │   └── productService.js
│   │
│   ├── config/
│   │   └── api.js
│   │
│   └── ...
│
├── package.json
└── ...
```

### Backend

The backend provides the API, authentication, database communication, product management, orders, and other server-side functionality.

```text
backend/
│
├── models/
├── routes/
├── controllers/
├── middleware/
├── config/
├── server.js
├── package.json
└── .env
```

> The exact backend folder structure may change as the project continues to develop.

---

## 🔌 API Configuration

The frontend communicates with the deployed BCO Enterprise backend through a centralized API configuration.

The frontend API configuration follows this structure:

```javascript
const API_URL = "https://bco-enterprise-2.onrender.com";

export default API_URL;
```

Keeping the API URL in one configuration file makes it easier to switch between a local backend and the deployed backend.

For local development, the API URL can be changed to the appropriate local backend address.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then move into the project directory:

```bash
cd BCO-Enterprise
```

---

## 💻 Frontend Setup

Navigate into the frontend project:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local development address, normally similar to:

```text
http://localhost:5173
```

Open the address in your browser.

---

## ⚙️ Backend Setup

Navigate into the backend directory:

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT=your_frontend_url
PEXELS_API_KEY=your_pexels_api_key
```

Start the backend:

```bash
npm start
```

The backend can then run locally on the configured port.

---

## 🔐 Environment Variables

BCO Enterprise uses environment variables to keep sensitive configuration information outside the source code.

The project uses variables such as:

| Variable         | Purpose                               |
| ---------------- | ------------------------------------- |
| `MONGO_URI`      | MongoDB database connection           |
| `PORT`           | Backend server port                   |
| `JWT_SECRET`     | Secret used for JWT authentication    |
| `EMAIL_USER`     | Email account used by the application |
| `EMAIL_PASS`     | Email account password/app password   |
| `CLIENT`         | Frontend URL                          |
| `PEXELS_API_KEY` | Pexels API authentication             |

### ⚠️ Important

**Never commit your `.env` file to GitHub.**

Do not expose:

* MongoDB passwords
* JWT secrets
* Email passwords
* API keys
* Other private credentials

Instead, create your own `.env` file locally and configure the required environment variables.

For deployment, these values should be added through the hosting platform's environment-variable settings.

---

## 🗄️ Database

BCO Enterprise uses **MongoDB** as its database.

MongoDB Atlas is used for the cloud-hosted database.

The backend communicates with MongoDB through **Mongoose**.

The database stores application information such as:

* Users
* Products
* Orders
* Other marketplace data

---

## 🌐 External Product Data

BCO Enterprise uses external services to supplement product information and images.

### DummyJSON

DummyJSON provides external product data used by the frontend.

The application maps relevant DummyJSON product categories to BCO Enterprise categories.

### Pexels

Pexels is used to provide product imagery for selected product categories.

These integrations allow the platform to display a wider range of products while the marketplace's own product database continues to grow.

---

## 📱 Customer Communication

BCO Enterprise includes a WhatsApp contact option that allows customers to communicate with the business directly.

This provides an additional communication channel for:

* Product questions
* General enquiries
* Customer support
* Product requests

---

## ☁️ Deployment

The BCO Enterprise backend is deployed using **Render**.

The production backend is currently hosted at:

`https://bco-enterprise-2.onrender.com`

The database is hosted using **MongoDB Atlas**.

The React frontend currently runs locally during development and can be deployed separately as the next stage of the project.

---

## 🔄 Application Flow

A simplified version of the application's flow is:

```text
                    BCO ENTERPRISE
                         │
              ┌──────────┴──────────┐
              │                     │
          CUSTOMER                ADMIN
              │                     │
       ┌──────┴──────┐       ┌──────┴──────┐
       │             │       │             │
    Register       Login   Dashboard    Management
       │                     │
       ▼              ┌──────┼──────┬──────┬──────┐
    Browse            │      │      │      │      │
    Products       Products Orders Customers Revenue
       │
       ▼
    Search
    Filter
    Sort
       │
       ▼
      Cart
       │
       ▼
    Checkout
       │
       ▼
     Order
       │
       ▼
   Track Order
```

---

## 🔒 Security

The application includes several security-related mechanisms, including:

* Password hashing with bcryptjs
* JWT-based authentication
* Protected backend routes
* Environment variables for sensitive configuration
* Database authentication through MongoDB

Security can be further improved as the project moves toward production use.

---

## 🛠️ Future Improvements

BCO Enterprise is designed to grow beyond the current MVP.

Possible future improvements include:

* Vendor accounts
* Vendor dashboards
* Vendor subscriptions
* Vendor product management
* Marketplace commission system
* Premium vendor features
* Online payment integration
* Improved order management
* Advanced business analytics
* Customer reviews and ratings
* Product favourites/wishlist
* Notifications
* Improved search
* More advanced filtering
* Inventory management
* Delivery integration
* Mobile application
* Public frontend deployment
* Improved marketplace moderation

---

## 💰 Potential Business Model

BCO Enterprise can be developed into a marketplace business with multiple revenue streams.

Potential revenue sources include:

### 1. Sales Commission

BCO Enterprise can charge a percentage of completed transactions made through the platform.

### 2. Vendor Subscription

Businesses could pay a recurring subscription to access additional marketplace features.

### 3. Premium Features

Vendors could pay for additional features such as enhanced visibility, analytics, promotions, or other advanced tools.

These business features are part of the platform's future direction and are not all implemented in the current version.

---

## 🎓 Project Purpose

BCO Enterprise was developed as a school defense project and also serves as a foundation for a potential real-world marketplace business.

The project combines practical knowledge of:

* Frontend development
* Backend development
* Database management
* REST APIs
* Authentication
* Cloud deployment
* E-commerce functionality
* Business modelling
* Product management

The long-term goal is to continue improving the platform beyond the initial school project.

---

## 📚 What This Project Demonstrates

BCO Enterprise demonstrates the ability to build and connect a full-stack web application using modern web technologies.

The project covers:

```text
React
   ↓
Frontend UI
   ↓
Axios / API Requests
   ↓
Express.js Backend
   ↓
Authentication & Business Logic
   ↓
Mongoose
   ↓
MongoDB Atlas
```

It also demonstrates integration with external APIs and deployment of backend services to the cloud.

---

## 👩‍💻 Author

**Ndubuisi Blessing**

BCO Enterprise was developed as a full-stack web development project with the goal of combining technical skills with a practical business idea.

---

## 📄 License

This project was developed as a school/business project.

License terms can be added when the project is prepared for public or commercial distribution.

---

## ⭐ Project Status

**Current status: MVP / Development**

The backend is deployed and connected to MongoDB Atlas, while the React frontend is currently functional in the local development environment.

The project is actively being improved and prepared for future deployment and expansion.
