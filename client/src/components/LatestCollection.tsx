import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../redux/productSlice";
import Description from "./description/Description";

const LatestCollection: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="my-10">
      <div className="text-center">
        <Title text1="Latest" text2="Collection" />
        <Description text=" Step into style with our Latest Collection. Fresh designs and timeless
          classics, crafted to make every look unforgettable."/>
      </div>
      <div className="grid mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products?.slice(7, 12).map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
