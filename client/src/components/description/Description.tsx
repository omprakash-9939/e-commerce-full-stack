import React from "react";

type DescriptionProps = {
  text: string;
};

const Description: React.FC<DescriptionProps> = ({ text }) => {
  return (
    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
      {text}
    </p>
  );
};

export default Description;
