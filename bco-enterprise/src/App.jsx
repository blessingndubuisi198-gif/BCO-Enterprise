import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Categories from "./components/Categories";
import Contact from "./components/Contact";

import ShopProducts from "./pages/ShopProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import ForgotPassword from "./pages/ForgotPassword";
import FAQs from "./pages/FAQs";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import PaymentMethods from "./pages/PaymentMethods";
import TrackOrder from "./pages/TrackOrder";

import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Category from "./admin/Category";
import Customers from "./admin/Customers";
import Orders from "./admin/Orders";
import Revenue from "./pages/Revenue";

import Footer from "./components/Footer";


function AppContent() {

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  const hideFooter =
    isAdminPage ||
    location.pathname === "/login" ||
    location.pathname === "/register";


  return (
    <>
      <Routes>

        {/* CUSTOMER ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={<ShopProducts />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/orders"
          element={<MyOrders />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/faqs"
          element={<FAQs />}
        />

        <Route
          path="/shipping"
          element={<Shipping />}
        />

        <Route
          path="/returns"
          element={<Returns />}
        />

        <Route
          path="/payment-methods"
          element={<PaymentMethods />}
        />

        <Route
          path="/track-order"
          element={<TrackOrder />}
        />


        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={<Dashboard />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

        <Route
          path="/admin/orders"
          element={<Orders />}
        />

        <Route
          path="/admin/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/admin/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/admin/category"
          element={<Category />}
        />

        <Route
          path="/admin/customers"
          element={<Customers />}
        />

        <Route
          path="/admin/revenue"
          element={<Revenue />}
        />

      </Routes>


      {/* CUSTOMER FOOTER */}

      {!hideFooter && <Footer />}

    </>
  );
}


function App() {
  return <AppContent />;
}


export default App;