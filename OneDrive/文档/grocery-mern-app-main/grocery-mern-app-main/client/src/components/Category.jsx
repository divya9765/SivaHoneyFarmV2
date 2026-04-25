import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
const Category = () => {
  const { navigate } = useAppContext();
  return (
    <div className="mt-16">
      <div className="px-1 sm:px-2 md:px-0">
        <p className="text-2xl md:text-3xl font-semibold tracking-tight">Categories</p>
        <p className="text-sm md:text-base text-gray-600 mt-1">Explore pure honey, soaps, and hair oils</p>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 items-stretch">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md`}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt=""
              className="max-w-24 sm:max-w-28 transition-transform duration-200 group-hover:scale-105"
            />
            <p className="text-xs sm:text-sm font-medium text-gray-800">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Category;
