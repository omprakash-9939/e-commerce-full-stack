import { Link } from "react-router-dom";

type FooterColumnProps = {
  title: string;
  links: { label: string; to: string }[];
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">{title}</h3>
      <ul className="mt-4 space-y-4 text-xs sm:text-sm text-gray-600">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link to={link.to} className="text-gray-500 hover:text-gray-900 hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
