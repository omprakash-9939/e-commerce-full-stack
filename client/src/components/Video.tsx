import video from "../assets/video.webm";
import Title from "./Title";

const Video = () => {
  return (
    <div>
      <div className="w-full text-center py-8">
        <Title text1="Step Into the Future" text2="of Summer Fashion" />
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={video}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center gap-4 px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-200 drop-shadow-md animate-fade-in">
            Show
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg animate-slide-up">
            Summer 2026
          </h1>
          <p className="text-lg text-gray-100 italic drop-shadow-md animate-fade-in-delayed">
            Discover the collection
          </p>
          <button className="mt-4 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white font-semibold hover:bg-white/30 transition duration-300 shadow-lg">
            Shop Now
          </button>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    </div>
  );
};

export default Video;
