import contactVid from '../assets/contact-vid.mp4';
import Title from '../components/Title';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="px-4">
      <div className="text-center text-3xl pt-8 border-t border-gray-300">
        <Title text1={'Contact'} text2={'Us'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-10">
        <video
          className="w-full md:max-w-[50%]"
          autoPlay
          loop
          muted
          playsInline
          src={contactVid}
        ></video>
        <div className="flex flex-col justify-center gap-6 md:w-1/2 bg-white p-8">
          <p className="font-semibold text-2xl text-gray-700">Our Store</p>
          <p className="flex items-start gap-3 text-gray-600">
            <MdLocationOn className="text-purple-600 mt-1" />
            123, Mumbai CST East, <br /> 234A, Maharashtra, India
          </p>
          <p className="flex items-start gap-3 text-gray-600">
            <MdPhone className="text-purple-600 mt-1" />
            +91 - 8787876655
          </p>
          <p className="flex items-start gap-3 text-gray-600">
            <MdEmail className="text-purple-600 mt-1" />
            support@gmail.com
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border-2 border-purple-600 px-8 py-3 text-sm rounded-md font-medium text-purple-600 hover:bg-purple-600 hover:text-white transition duration-300 w-fit">
            Explore Jobs
          </button>
          <div className="flex items-center gap-4 mt-6">
            <FaFacebookF className="text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
            <FaTwitter className="text-blue-400 cursor-pointer hover:scale-110 transition-transform" />
            <FaInstagram className="text-pink-500 cursor-pointer hover:scale-110 transition-transform" />
            <FaLinkedinIn className="text-blue-700 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
      <section className="bg-white dark:bg-gray-700">
        <div className="container grid grid-cols-1 gap-10 px-6 py-12 mx-auto lg:grid-cols-3">
          <div>
            <p className="font-medium text-purple-500">
              Our locations Worldwide
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl dark:text-white">
              Visit our stores
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Find us at these locations.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:col-span-2 sm:grid-cols-2">
            <div>
              <h2 className="font-medium text-gray-800 dark:text-white">
                New York
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                350 5th Ave <br /> New York, NY 10118, USA
              </p>
            </div>
            <div>
              <h2 className="font-medium text-gray-700 dark:text-white">
                London
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                221B Baker Street <br /> London NW1 6XE, UK
              </p>
            </div>
            <div>
              <h2 className="font-medium text-gray-700 dark:text-white">
                Sydney
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                1 Macquarie Street <br /> Sydney NSW 2000, Australia
              </p>
            </div>
            <div>
              <h2 className="font-medium text-gray-700 dark:text-white">
                San Francisco
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                1355 Market Street <br /> San Francisco, CA 94103, USA
              </p>
            </div>
            <div>
              <h2 className="font-medium text-gray-700 dark:text-white">
                Tokyo
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                4 Chome-2-8 Shibakoen <br /> Minato City, Tokyo 105-0011, Japan
              </p>
            </div>
            <div>
              <h2 className="font-medium text-gray-700 dark:text-gray-200">
                Paris
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                10 Rue de Rivoli <br /> 75001 Paris, France
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
