const NewsLetter = () => {
  return (
    <div className="my-16">
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="md:text-4xl text-2xl font-semibold tracking-tight">Never Miss a Deal</h1>
        <p className="md:text-lg text-gray-600 mt-2 mb-8 max-w-2xl">
          Get exclusive offers, new arrivals, and seasonal bundles
        </p>
        <form className="w-full max-w-2xl">
          <div className="flex items-stretch w-full h-12 md:h-13 rounded-md overflow-hidden border border-gray-300">
            <input
              className="w-full px-4 outline-none placeholder:text-gray-400 text-gray-700"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="px-6 md:px-8 font-medium text-white btn-primary"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewsLetter;
