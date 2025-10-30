import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import type { Product } from "../types/product";

interface RelatedProductProps {
  category: string;
  subCategory: string;
}

const RelatedProduct: React.FC<RelatedProductProps> = ({
  category,
  subCategory,
}) => {
  const { products } = useSelector((state: RootState) => state.products);
  const [related, setRelated] = useState<Product[]>([]);
  console.log(related);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Product"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            showTag={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
