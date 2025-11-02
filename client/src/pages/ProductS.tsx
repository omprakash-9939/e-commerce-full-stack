import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../redux/store';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import RelatedProduct from '../components/RelatedProduct';
import Rating from '../components/rating/Rating';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import {
  addToCart,
  addToCartServer,
  updateCartServer,
  updateQuantity,
} from '../redux/cartSlice';
import type { Product } from '../types/product';
import { fetchProducts } from '../redux/productSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const ProductS = () => {
  const { productId } = useParams();
  console.log(productId);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useSelector((state: RootState) => state.products);
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(ShopContext);
  const cart = useSelector((state: RootState) => state.cart);
  console.log('line number 22 Product size', cart);
  const dispatch = useDispatch<AppDispatch>();
  const token = Cookies.get('token');
  console.log('line number 25', token);
  const [image, setImage] = useState('');
  const sizeFromUrl = searchParams.get('size') || '';
  const [size, setSize] = useState(sizeFromUrl);
  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a product size');
      return;
    }
    if (token) {
      dispatch(addToCartServer({ token, itemId: productData!._id, size }));
    } else {
      dispatch(addToCart({ itemId: productData!._id, size }));
      toast.success('Item added to cart');
    }
  };
  const handleIncrement = () => {
    const currentQty = cart[productData!._id]?.[size] || 0;
    if (token) {
      dispatch(
        updateCartServer({
          token,
          itemId: productData!._id,
          size,
          quantity: currentQty + 1,
        })
      );
    } else {
      dispatch(
        updateQuantity({
          itemId: productData!._id,
          size,
          quantity: currentQty + 1,
        })
      );
    }
  };
  const handleDecrement = () => {
    const currentQty = cart[productData!._id]?.[size] || 0;
    if (currentQty <= 1) {
      // remove from cart
      if (token) {
        dispatch(
          updateCartServer({
            token,
            itemId: productData!._id,
            size,
            quantity: 0,
          })
        );
      } else {
        dispatch(
          updateQuantity({
            itemId: productData!._id,
            size,
            quantity: 0,
          })
        );
      }
    } else {
      if (token) {
        dispatch(
          updateCartServer({
            token,
            itemId: productData!._id,
            size,
            quantity: currentQty - 1,
          })
        );
      } else {
        dispatch(
          updateQuantity({
            itemId: productData!._id,
            size,
            quantity: currentQty - 1,
          })
        );
      }
    }
  };

  // const fetchProductData = async () => {
  //   products.map((item) => {
  //     if (item._id == productId) {
  //       setProductData(item);
  //       // console.log(item);
  //       return null;
  //     }
  //   });
  // };

  // useEffect(() => {
  //   fetchProductData();
  // }, [productId, products]);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (!products || products.length === 0) {
        await dispatch(fetchProducts()).unwrap();
      }
      const product = products.find((p) => p._id === productId);
      if (product) {
        setProductData(product);
      }
      setLoading(false);
    };
    loadData();
  }, [dispatch, productId, products]);

  useEffect(() => {
    setSize(sizeFromUrl);
  }, [sizeFromUrl]);

  useEffect(() => {
    if (productData?.image?.length) {
      setImage(productData.image[0]);
    }
  }, [productData]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [productId]);


  const handleSelectSize = (selectedSize: string) => {
    setSize(selectedSize);
    setSearchParams({ size: selectedSize });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spinner />
      </div>
    );
  }

  return productData ? (
    <div className="border-t-1 border-gray-200 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col flex-row overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                src={item}
                alt="image"
              />
            ))}
          </div>
          <Zoom>
            <div className="w-full sm:w-[80%]">
              {image && <img src={image} alt="img" />}
            </div>
          </Zoom>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <Rating count={5} reviews={189} />
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            {/* <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border rounded py-2 px-4 cursor-pointer bg-gray-100 ${
                    item === size ? "bg-purple-500 text-white" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div> */}
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => handleSelectSize(item)}
                  key={index}
                  className={`border rounded py-2 px-4 cursor-pointer transition-all duration-200 ${
                    item === size
                      ? 'bg-purple-500 text-white border-purple-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* button */}
          {/* <button
            onClick={() =>
              dispatch(
                addToCartServer({
                  token: token || "",
                  itemId: productData._id,
                  size,
                })
              )
            }
            className="bg-linear-65 cursor-pointer bg-purple-500 hover:bg-pink-500 transition-colors shadow-lg rounded px-8 sm:px-6 py-3 text-sm sm:text-base lg:text-lg font-semibold text-white"
          >
            Add To Cart
          </button> */}
          {/* ------------------------- Add To Cart Section ------------------------- */}
          <div className="mt-4">
            {cart[productData._id]?.[size] > 0 ? (
              <div className="flex gap-2 items-center">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden w-max">
                  <button
                    onClick={handleDecrement}
                    className={`px-4 py-2 cursor-pointer bg-gray-100 text-lg font-semibold ${
                      cart[productData._id][size] === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-300'
                    }`}
                    disabled={cart[productData._id][size] === 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 bg-white text-center text-lg">
                    {cart[productData._id][size]}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-300 text-lg font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => navigate('/cart')}
                  className="bg-purple-600 hover:bg-pink-500 text-white font-semibold px-2 py-2.5 cursor-pointer rounded"
                >
                  Go To Cart
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-purple-500 cursor-pointer hover:bg-pink-500 transition-colors shadow-lg rounded px-8 sm:px-6 py-3 text-sm sm:text-base lg:text-lg font-semibold text-white"
              >
                Add To Cart
              </button>
            )}
          </div>
          <hr className="mt-8 border border-gray-300 sm:w-4/5" />
          <div className="text-sm pb-1 text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* description section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-300 px-4 py-3 tex-sm">Description</b>
          <p className="border border-gray-300 px-4 py-3 text-sm">
            Reviews (244)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500">
          <p>
            Discover fashion that speaks your style. Our collection blends
            timeless designs with modern trends, giving you the perfect balance
            of comfort, elegance, and confidence for every occasion.
          </p>
          <p>
            From everyday essentials to statement pieces, we craft each garment
            with care and quality. Dress the way you feel and let your wardrobe
            tell your story—because you deserve to look and feel your best.
          </p>
        </div>
      </div>
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default ProductS;
