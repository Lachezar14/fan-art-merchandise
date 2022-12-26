
import './App.css';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';
import Layout from '../src/layouts/Layout';
import Profile from "./pages/Profile";
import HomePage from './pages/HomePage';
import ProductBuyPage from './pages/ProductBuyPage';
import Checkout from "./pages/Checkout/Checkout";
import {AuthProvider} from './contexts/AuthContext';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div>
            <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route index element={<HomePage />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/products/buy" element={<ProductBuyPage />} />
                        <Route path="/products/buy/checkout" element={<Checkout />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </AuthProvider>
        </div>
  );
}

export default App;
