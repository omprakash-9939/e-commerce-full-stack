import 'flowbite';
import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Slider = () => {
  const images = [assets.img1, assets.img2, assets.img3];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length, current]);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              className="block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={prev}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 6 10"
          >
            <path d="M5 1 1 5l4 4" />
          </svg>
        </span>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 6 10"
          >
            <path d="m1 9 4-4-4-4" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Slider;
