import React, { useEffect, useState } from "react";
import uploadimg from "../assets_admin/cloud-computing.png";
import axios from "axios";
import { toast } from "react-toastify";
import * as nsfwjs from "nsfwjs";
import { Filter } from "bad-words";
import { backendUrl } from "../config";

type AddProductProps = {
  token: string;
};

const AddProduct: React.FC<AddProductProps> = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState<File | false>(false);
  const [image2, setImage2] = useState<File | false>(false);
  const [image3, setImage3] = useState<File | false>(false);
  const [image4, setImage4] = useState<File | false>(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);

  const [model, setModel] = useState<nsfwjs.NSFWJS | null>(null);

  useEffect(() => {
    nsfwjs.load().then(setModel);
  }, []);

  const isImageSafe = async (file: File): Promise<boolean> => {
    if (!model) return true;
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await new Promise((res) => (img.onload = res));

    const predictions = await model.classify(img);
    const unsafe = predictions.some(
      (p) =>
        (p.className === "Porn" ||
          p.className === "Sexy" ||
          p.className === "Hentai") &&
        p.probability > 0.9
    );
    return !unsafe;
  };
  const filter = new Filter();
  const isTextValid = (text: string): boolean => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    if (urlPattern.test(text)) return false;

    if (filter.isProfane(text)) return false;

    if (text.trim().length < 3) return false;

    return true;
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!isTextValid(name)) {
      toast.error(
        "Product name is invalid. Avoid links, bad words, or too short text."
      );
      setLoading(false);
      return;
    }

    if (!isTextValid(description)) {
      toast.error(
        "Product description is invalid. Avoid links, bad words, or too short text."
      );
      setLoading(false);
      return;
    }

    try {
      const images: (File | false)[] = [image1, image2, image3, image4];

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img && img instanceof File) {
          //type guard
          const safe = await isImageSafe(img);
          if (!safe) {
            toast.error(`Image ${i + 1} is NSFW. Please use a safe image.`);
            setLoading(false);
            return;
          }
        }
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("line number 80", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      }
      console.log("Line number 48 formdata response", response);
    } catch (error: unknown) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  // h-[calc(100vh-161px)]

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<File | false>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!validImageTypes.includes(file.type)) {
    toast.error("Only image files (JPG, PNG, WEBP) are allowed.");
    e.target.value = ""; 
    return;
  }

  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    toast.error(`Image must be smaller than ${maxSizeMB} MB.`);
    e.target.value = "";
    return;
  }

  setImage(file);
};


  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col h-[calc(100vh-161px)] overflow-y-auto w-full items-start gap-3"
      >
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label className="cursor-pointer" htmlFor="image1">
              <img
                className="w-18"
                src={!image1 ? uploadimg : URL.createObjectURL(image1)}
                alt="img"
              />
              <input
                // onChange={(e) => setImage1(e.target.files?.[0] || false)}
                onChange={(e) => handleImageChange(e, setImage1)}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label className="cursor-pointer" htmlFor="image2">
              <img
                className="w-18"
                src={!image2 ? uploadimg : URL.createObjectURL(image2)}
                alt="img"
              />
              <input
                type="file"
                // onChange={(e) => setImage2(e.target.files?.[0] || false)}
                onChange={(e) => handleImageChange(e, setImage2)}
                id="image2"
                hidden
              />
            </label>

            <label className="cursor-pointer" htmlFor="image3">
              <img
                className="w-18"
                src={!image3 ? uploadimg : URL.createObjectURL(image3)}
                alt="img"
              />
              <input
                type="file"
                // onChange={(e) => setImage3(e.target.files?.[0] || false)}
                onChange={(e) => handleImageChange(e, setImage3)}
                id="image3"
                hidden
              />
            </label>

            <label className="cursor-pointer" htmlFor="image4">
              <img
                className="w-18"
                src={!image4 ? uploadimg : URL.createObjectURL(image4)}
                alt="img"
              />
              <input
                type="file"
                // onChange={(e) => setImage4(e.target.files?.[0] || false)}
                onChange={(e) => handleImageChange(e, setImage4)}
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
        {/* fields */}
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          {/* another section */}
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          {/* price section */}
          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              className="w-full px-3 py-2 sm:w-[120px]"
              placeholder="120"
            />
          </div>
        </div>
        {/* product sizes */}
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            <div onClick={() => toggleSize("S")}>
              <p
                className={` ${
                  sizes.includes("S")
                    ? " bg-[#8B008B] text-white"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                S
              </p>
            </div>
            <div onClick={() => toggleSize("M")}>
              <p
                className={` ${
                  sizes.includes("M")
                    ? " bg-[#8B008B] text-white"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                M
              </p>
            </div>
            <div onClick={() => toggleSize("L")}>
              <p
                className={` ${
                  sizes.includes("L")
                    ? " bg-[#8B008B] text-white"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                L
              </p>
            </div>
            <div onClick={() => toggleSize("XL")}>
              <p
                className={` ${
                  sizes.includes("XL")
                    ? " bg-[#8B008B] text-white"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                XL
              </p>
            </div>
            <div onClick={() => toggleSize("XXL")}>
              <p
                className={` ${
                  sizes.includes("XXL")
                    ? " bg-[#8B008B] text-white"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>
        {/* add checkbox */}
        <div className="flex gap-2 mt-2">
          <input
            className="accent-[#8B008B]"
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>
        <button
          disabled={loading}
          className="w-28 py-3 mt-4 cursor-pointer bg-[#8B008B] rounded text-white font-bold flex items-center justify-center"
        >
          {loading ? (
            <div
              className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default AddProduct;
