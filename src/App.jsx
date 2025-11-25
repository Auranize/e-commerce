import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { Toaster } from 'react-hot-toast';
import Verify from './pages/Verify';
import RefundPolicy from './pages/RefundPolicy';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQs from './pages/FAQs';
import ShippingPolicy from './pages/ShippingPolicy';
import PaymentPolicy from './pages/PaymentPolicy';
import WarrantyPolicy from './pages/WarrantyPolicy';
import FAQ from './pages/FAQs';
import ReturnPolicy from './pages/ReturnPolicy';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Full width components */}
      <div className="w-full">
        <Navbar />
        <SearchBar />
      </div>
      
      {/* Main content */}
      <main className="flex-grow p-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />

          {/* Razorpay Pages */}
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/terms-and-conditions' element={<Terms />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/faqs' element={<FAQ />} />
          <Route path='/shipping-policy' element={<ShippingPolicy />} />
          <Route path='/payment-policy' element={<PaymentPolicy />} />
          <Route path='/warranty-policy' element={<WarrantyPolicy />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />
        </Routes>
      </main>
      
      {/* Full width footer */}
      <div className="p-4">
        <Footer />
      </div>
    </div>
  );
};

export default App;