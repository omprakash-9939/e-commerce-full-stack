import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa6";
import { assets } from "../assets/assets";
import FooterColumn from "./footerColumn/FooterColumn";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-8 text-center">
          <img
            src={assets.logo3}
            className="w-20 object-contain mb-2"
            alt="logo"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              clipPath: "inset(10% 10% 10% 10%)",
            }}
          />
          <p className="text-gray-500 text-sm">
            Your trusted store for quality products
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <FooterColumn
            title="Shop"
            links={[
              { label: "All Products", to: "/collection" },
              { label: "New Arrivals", to: "" },
              { label: "Best Sellers", to: "" },
              { label: "Sale", to: "" },
            ]}
          />
          <FooterColumn
            title="Customer Service"
            links={[
              { label: "Help Center", to: "" },
              { label: "Track Order", to: "" },
              { label: "Returns & Refunds", to: "" },
              { label: "Shipping Info", to: "" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "About Us", to: "/about" },
              { label: "Blog", to: "" },
              { label: "Contact", to: "/contact" },
            ]}
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Subscribe
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-gray-600">
              Get updates on new products and upcoming sales
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex space-x-4 text-gray-400">
            {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex].map(
              (Icon, idx) => (
                <Icon key={idx} size={28} />
              )
            )}
          </div>
          <div className="flex space-x-6">
            {[FaFacebook, FaInstagram, FaXTwitter, FaGithub, FaYoutube].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
