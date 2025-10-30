type PolicyCardProps = {
  icon: string;
  title: string;
  description: string;
  alt?: string;
};

const PolicyCard: React.FC<PolicyCardProps> = ({ icon, title, description, alt }) => {
  return (
    <div className="hover:scale-105 cursor-pointer transition-transform duration-300">
      <img className="w-12 m-auto mb-5" src={icon} alt={alt || title} />
      <p className="font-semibold">{title}</p>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default PolicyCard;
