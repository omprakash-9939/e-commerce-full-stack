import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Select } from "antd";
import { fetchFilteredProducts } from "../redux/productSlice";
import type { SortType } from "../types/collection";
import Spinner from "../components/Spinner";
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
const { Option } = Select;

const Collection = () => {
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();
  const { search, showSearch } = useSelector(
    (state: RootState) => state.search
  );
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState<SortType>("relavent");
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const toggleCategory = (e: InputChangeEvent) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e: InputChangeEvent) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        category,
        subCategory,
        sort: sortType,
        search: showSearch ? search : "",
      })
    );
  }, [category, subCategory, sortType, search, showSearch, dispatch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xs sm:text-sm md:text-base text-gray-600  flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES </p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 hover:underline">
              <input
                className="w-3 accent-purple-500 cursor-pointer"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2 hover:underline">
              <input
                className="w-3 accent-purple-500 cursor-pointer"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>

            <p className="flex gap-2 hover:underline">
              <input
                className="w-3 accent-purple-500 cursor-pointer"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 hover:underline">
              <input
                className="w-3 accent-purple-500 cursor-pointer"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2 hover:underline">
              <input
                className="w-3 accent-purple-500 cursor-pointer"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>

            <p className="flex gap-2 hover:underline">
              <input
                className="w-3 accent-purple-500 cursor-pointer"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 sm:mt-0 mt-3">
          <Title text1={"ALL"} text2={"COLLECTIONS"}  showLine={false}/>
          <Select
            defaultValue="relavent"
            className="w-48 custom-select"
            dropdownStyle={{ backgroundColor: "white" }}
            popupClassName="custom-select-dropdown"
            onChange={(value: SortType) => setSortType(value)}
            options={[
              { value: "relavent", label: "Relevant" },
              { value: "low-high", label: "Price: Low → High" },
              { value: "high-low", label: "Price: High → Low" },
            ]}
          >
            <Option value="relavent">Sort by: Relevant</Option>
            <Option value="low-high">Sort by: Low to High</Option>
            <Option value="high-low">Sort by: High to Low</Option>
          </Select>
        </div>
        <div className="grid grid-cols-2  mb-4  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            products.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                showTag={false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
