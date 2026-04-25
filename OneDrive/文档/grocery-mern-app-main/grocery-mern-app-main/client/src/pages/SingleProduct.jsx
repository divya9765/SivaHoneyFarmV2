import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories } from "../assets/assets";

const SingleProduct = () => {
  const { products, navigate, addToCart, cartItems, removeFromCart, isFavorite, toggleFavorite } = useAppContext();
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const product = products.find((product) => product._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      const productsCopy = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    const catImg =
      categories.find((c) => c.path.toLowerCase() === product?.category?.toLowerCase())?.image || null;
    setThumbnail(catImg);
  }, [product]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>›</span>
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary">
            {product.category}
          </Link>
          <span>›</span>
          <span className="text-gray-700 truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Column - Images */}
          <div className="lg:w-2/5 xl:w-1/3 flex flex-col-reverse lg:flex-row gap-4 sticky top-20 h-fit">
             {/* Thumbnails List */}
             <div className="flex lg:flex-col gap-2 overflow-auto lg:overflow-visible py-2 lg:py-0 px-1 lg:px-0 scrollbar-hide">
              {(product.image.length > 0 ? product.image : [thumbnail]).map((image, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setThumbnail(
                      categories.find((c) => c.path.toLowerCase() === product.category.toLowerCase())?.image ||
                      (image?.startsWith("http")
                        ? image
                        : `http://localhost:5000/images/${image}`)
                    )
                  }
                  className={`w-16 h-16 min-w-16 border rounded-sm p-1 cursor-pointer transition-all ${
                    thumbnail === image ? "border-primary ring-1 ring-primary" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={
                      categories.find((c) => c.path.toLowerCase() === product.category.toLowerCase())?.image ||
                      (image?.startsWith("http")
                        ? image
                        : `http://localhost:5000/images/${image}`)
                    }
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 border border-gray-100 relative bg-white p-4 flex items-center justify-center min-h-[300px] lg:min-h-[450px]">
              <img
                src={
                  thumbnail?.startsWith("http")
                    ? thumbnail
                    : thumbnail || ""
                }
                alt="Selected product"
                className="max-w-full max-h-[400px] object-contain"
              />
              <div 
                onClick={() => toggleFavorite(product._id)}
                className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md cursor-pointer transition-colors ${isFavorite(product._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-3/5 xl:w-2/3">
            <h1 className="text-xl md:text-2xl font-medium text-gray-800">{product.name}</h1>
            
            <div className="flex items-center gap-3 mt-2">
               <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-[3px]">
                4.4 <span className="text-[10px]">★</span>
              </div>
              <span className="text-gray-500 text-sm font-medium">1,234 Ratings & 456 Reviews</span>
            </div>

            <p className="text-green-600 font-medium text-sm mt-3">Special Price</p>
            <div className="flex items-end gap-3 mt-1">
              <span className="text-3xl font-medium text-gray-900">₹{product.offerPrice}</span>
              <span className="text-gray-500 line-through">₹{product.price}</span>
              <span className="text-green-600 font-bold text-lg">
                 {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% off
              </span>
            </div>

            {/* Offers Section */}
            <div className="mt-4 space-y-2">
              <p className="font-medium text-sm text-gray-900">Available offers</p>
              <div className="text-sm text-gray-800 space-y-1.5">
                <p className="flex items-start gap-2">
                  <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-4 h-4 mt-0.5" alt="" />
                  <span><span className="font-medium">Bank Offer</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</span>
                </p>
                <p className="flex items-start gap-2">
                  <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-4 h-4 mt-0.5" alt="" />
                  <span><span className="font-medium">Bank Offer</span> 10% off on SBI Credit Card, up to ₹1500</span>
                </p>
                <p className="flex items-start gap-2">
                  <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="w-4 h-4 mt-0.5" alt="" />
                  <span><span className="font-medium">Special Price</span> Get extra 20% off (price inclusive of cashback/coupon)</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
               {!cartItems?.[product?._id] ? (
                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex-1 bg-[#ff9f00] text-white font-medium py-3.5 rounded-sm shadow-sm uppercase text-sm md:text-base hover:shadow-md transition-shadow"
                  >
                    Add to Cart
                  </button>
               ) : (
                  <div className="flex-1 flex items-center justify-between border border-gray-300 rounded-sm">
                    <button onClick={() => removeFromCart(product._id)} className="px-6 py-3.5 text-lg font-medium hover:bg-gray-50">-</button>
                    <span className="font-medium">{cartItems[product._id]}</span>
                    <button onClick={() => addToCart(product._id)} className="px-6 py-3.5 text-lg font-medium hover:bg-gray-50">+</button>
                  </div>
               )}
               
               <button
                  onClick={() => navigate('/cart')}
                  className="flex-1 bg-[#fb641b] text-white font-medium py-3.5 rounded-sm shadow-sm uppercase text-sm md:text-base hover:shadow-md transition-shadow"
               >
                 Buy Now
               </button>
            </div>

            {/* Product Description */}
            <div className="mt-8 border rounded-sm border-gray-200">
               <div className="p-4 border-b border-gray-200">
                 <h2 className="text-lg font-medium text-gray-800">Product Description</h2>
               </div>
               <div className="p-4 text-sm text-gray-700 leading-relaxed">
                 <p className="mb-4">
                   Experience the quality of {product.name}. Carefully sourced and packed to ensure freshness and purity.
                   Perfect for your daily needs and crafted with care to deliver the best experience.
                 </p>
                 <ul className="list-disc ml-5 space-y-1 text-gray-600">
                    {product.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                 </ul>
               </div>
            </div>
            
             {/* Delivery Info */}
            <div className="mt-6 border rounded-sm border-gray-200 p-4">
               <div className="flex items-center gap-4">
                  <div className="text-gray-500 text-sm font-medium">Delivery</div>
                  <div className="relative flex-1 max-w-xs">
                     <input 
                        type="text" 
                        placeholder="Enter Delivery Pincode"
                        className="w-full border-b-2 border-primary py-1 outline-none text-sm font-medium text-gray-800 placeholder:font-normal"
                     />
                     <span className="absolute right-0 top-1 text-primary text-sm font-medium cursor-pointer">Check</span>
                  </div>
               </div>
               <div className="mt-2 pl-[70px] text-xs text-gray-500">
                  Delivery by <span className="font-bold text-black">Tomorrow, 11 PM</span> | <span className="text-green-600">Free</span> <span className="line-through">₹40</span>
               </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
           <div className="mt-12 bg-white border border-gray-200 rounded-sm p-4">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Similar Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {relatedProducts.map((prod, idx) => (
                    <ProductCard key={idx} product={prod} />
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
export default SingleProduct;
