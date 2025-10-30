import Title from "../components/Title";
import avideo from "../assets/about-vid.mp4";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-gray-300">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <video
          className="w-full md:max-w-[50%]"
          autoPlay
          loop
          muted
          playsInline
          src={avideo}
        ></video>
        <div className="flex flex-col justify-center gap-6 md:w-1/2">
          <p>
            We’re here to make shopping simple, reliable, and enjoyable. Every
            product is chosen with care to bring you the best in quality and
            value.
          </p>

          <p>
            With fast delivery, secure checkout, and friendly support, we aim to
            be your trusted destination for everything you need.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our journey started with a simple idea — to make great products
            accessible to everyone. We’re driven by a passion for quality and a
            promise to deliver only what we’d love to use ourselves.
          </p>

          <p>
            Every order matters to us, and so does every customer. That’s why we
            focus on building trust through transparency, reliability, and a
            shopping experience you’ll want to return to.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-pink-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We carefully inspect every product to ensure it meets our high
            standards. Our goal is to provide items that are durable, reliable,
            and deliver exactly what you expect.
          </p>
        </div>
        <div className="border border-pink-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shopping with us is fast, easy, and hassle-free. From browsing to
            checkout, we make sure your experience is smooth and enjoyable every
            step of the way.
          </p>
        </div>
        <div className="border border-pink-500 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional:</b>
          <p className="text-gray-600">
            We go above and beyond to provide outstanding products and service.
            Every purchase is backed by our commitment to exceed your
            expectations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
