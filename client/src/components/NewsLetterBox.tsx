type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

const NewsLetterBox = () => {
  const onSubmitHandler = (e: FormSubmitEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="text-center">
        <p className="sm:text-2xl text-[20px] font-medium text-gray-800">
          Subscribe now & get <span className="text-purple-600">20% off</span>
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 rounded-full pl-4 pr-2 bg-white shadow-sm"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full flex-1 outline-none bg-transparent text-gray-700"
            required
          />
          <button
            type="submit"
            className="bg-black text-white text-xs px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;
