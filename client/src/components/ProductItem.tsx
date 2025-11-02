import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface ProductItemProps {
  id: string | number;
  image: string[];
  name: string;
  price: number;
  showTag?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  name,
  price,
  showTag = true,
}) => {
  const { currency } = useContext(ShopContext);
  const rating = Math.floor(Math.random() * 3) + 3;
  const ratingCount = Math.floor(Math.random() * (500 - 20 + 1)) + 20;

  return (
    <div className="group mt-3 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-400">
      <Link to={`/product/${id}`} className="block">
        <div className="overflow-hidden relative">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {showTag && (
            <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              New
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-gray-900 font-medium text-sm  tracking-wide truncate">
            {name}
          </p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({ratingCount})</span>
          </div>
          <p className="font-semibold text-sm mt-2 text-purple-600">
            {currency} {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
