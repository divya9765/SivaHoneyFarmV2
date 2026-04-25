import { useAppContext } from "../context/AppContext";
import { categories } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate, isFavorite, toggleFavorite } = useAppContext();
  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/product/${product.category.toLowerCase()}/${product?._id}`
          );
          scrollTo(0, 0);
        }}
        className="group relative w-full bg-white hover:shadow-xl transition-shadow duration-300 rounded-sm border border-gray-100 overflow-hidden cursor-pointer"
      >
        <div className="relative h-48 md:h-52 flex items-center justify-center p-4">
          <img
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            src={
              (categories.find((c) => c.path.toLowerCase() === product.category.toLowerCase())?.image) ||
              (product.image[0]?.startsWith("http") ? product.image[0] : `http://localhost:5000/images/${product.image[0]}`)
            }
            alt={product.name}
          />
          <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
             <div 
               onClick={() => toggleFavorite(product._id)}
               className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors cursor-pointer ${isFavorite(product._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
               </svg>
             </div>
          </div>
        </div>

        <div className="p-4 pt-0">
          <h3 className="text-[15px] text-gray-700 truncate font-normal group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-1.5 py-[2px] rounded-[3px]">
              4.4 <span className="text-[10px]">★</span>
            </div>
            <span className="text-gray-500 text-sm font-medium">(1,234)</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹{product.offerPrice}</span>
            <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
            <span className="text-[13px] font-bold text-green-600">
              {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% off
            </span>
          </div>
          
          {/* Add to Cart - Visible on hover or always visible based on preference, keeping it simple */}
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
             {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="w-full py-2 rounded-[2px] bg-primary text-white font-medium text-sm hover:bg-blue-600 transition-colors shadow-sm"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-between w-full h-[36px] bg-gray-50 rounded-[2px] border border-gray-200">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium text-gray-800">
                    {cartItems[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    )
  );
};
export default ProductCard;
