
import React from "react";
import { assets } from "../../assets/assets";

type RatingProps = {
  count: number;      
  total?: number;      
  reviews?: number;   
};

const Rating: React.FC<RatingProps> = ({total = 5, reviews }) => {
  const stars = [];
  for (let i = 0; i < total; i++) {
    stars.push(
      <img
        key={i}
        className="w-3.5"
        src={assets.star_icon}
        alt="star icon"
      />
    );
  }

  return (
    <div className="flex items-center">
      {stars}
      {reviews !== undefined && <p className="pl-2">({reviews})</p>}
    </div>
  );
};

export default Rating;
