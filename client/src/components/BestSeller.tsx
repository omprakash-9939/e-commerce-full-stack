import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../redux/productSlice";
import Description from "./description/Description";
import type { Product } from "../types/product";

const BestSeller = () => {
  const { products} = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();
  const [bestSeller, setBestSeller] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 
  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(6, 16));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="Best" text2="Sellers" />
        <Description
          text="Discover our hand-picked bestsellers, loved by customers for their
          unbeatable style and quality. These top-rated favorites are the
          perfect blend of design, comfort, and value — ready to be yours today."
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            showTag={false}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
