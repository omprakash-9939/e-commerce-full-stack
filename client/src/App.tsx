import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import ProductS from './pages/ProductS';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from './redux/cartSlice';
import type { AppDispatch } from './redux/store';
import Verify from './pages/Verify';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch]);

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/collection" element={ <Collection />} />
          <Route path="/product/:productId" element={ <ProductS />} />
          <Route path="/cart" element={ <Cart />} />
          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
