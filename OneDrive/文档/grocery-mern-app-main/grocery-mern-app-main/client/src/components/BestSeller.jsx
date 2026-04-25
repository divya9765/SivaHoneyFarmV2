import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useAppContext();
  
  return (
    <div className="bg-white p-4 shadow-sm rounded-sm">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-gray-800">Best Deals on Organic Products & More</h2>
          <p className="text-sm text-gray-500 mt-1">Top quality products at unbeatable prices</p>
        </div>
        <Link to="/products" className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-[2px] shadow-sm hover:shadow-md transition-all">
          VIEW ALL
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products
          .filter((product) => product.inStock)
          .slice(0, 10)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};
export default BestSeller;
