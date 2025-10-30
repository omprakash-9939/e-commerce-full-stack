import { assets } from "../assets/assets";
import PolicyCard from "./ourPolicy/PolicyCard";

const OurPolicy = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50">
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <PolicyCard
          icon={assets.exchange_icon}
          title="Easy Exchange Policy"
          description="Enjoy a hassle-free exchange experience."
        />
        <PolicyCard
          icon={assets.quality_icon}
          title="7-Day Return Guarantee"
          description="We offer free returns within 7 days."
        />
        <PolicyCard
          icon={assets.support_img}
          title="24/7 Customer Support"
          description="We’re here for you around the clock."
        />
      </div>
    </div>
  );
};

export default OurPolicy;
