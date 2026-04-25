import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets, categories } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
    setCartItems,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (!data.success) {
        toast.error(data.message || "Failed to logout");
      }
      setUser(null);
      setCartItems({});
      navigate("/");
      toast.success((data && data.message) || "Logged out successfully");
  } catch {
      setUser(null);
      setCartItems({});
      navigate("/");
      toast.success("Logged out");
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <div className="w-full font-sans">
      {/* Top Navbar */}
      <nav className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-10 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center leading-none group">
            <h2 className="text-xl md:text-2xl font-bold italic tracking-wider">
              Siva Honey <span className="text-yellow-400 not-italic text-lg">Plus</span>
            </h2>
            <p className="text-[10px] italic text-gray-200 hover:underline">
              Explore <span className="text-yellow-400 font-bold">Plus</span>
              <img src={assets.star_icon} className="w-2.5 h-2.5 inline ml-0.5 mb-0.5" alt="" />
            </p>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6 relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 rounded-[2px] text-gray-800 outline-none shadow-sm text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-3 text-primary">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 md:gap-8 font-medium text-[15px]">
            {user ? (
              <div className="relative group cursor-pointer flex items-center gap-1">
                <span className="truncate max-w-[100px]">{user.name}</span>
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1 transition-transform group-hover:rotate-180">
                  <path d="M1 1L5 5L9 1" />
                </svg>
                <div className="absolute top-full right-0 pt-2 hidden group-hover:block w-48 z-50">
                  <div className="bg-white text-gray-800 rounded shadow-lg overflow-hidden border border-gray-100">
                    <Link to="/my-orders" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      My Orders
                    </Link>
                    <div onClick={logout} className="block px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowUserLogin(true)}
                className="bg-white text-primary px-8 py-1 font-semibold rounded-[2px] hover:bg-white/90 transition shadow-sm"
              >
                Login
              </button>
            )}

            <div
              className="hidden md:flex items-center gap-1 cursor-pointer whitespace-nowrap"
              onClick={() => navigate("/more")}
            >
              <span>More</span>
               <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                  <path d="M1 1L5 5L9 1" />
                </svg>
            </div>

            <div
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 cursor-pointer relative"
            >
              <div className="relative">
                <svg
                  className="w-5 h-5"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-primary">
                    {cartCount()}
                  </span>
                )}
              </div>
              <span className="hidden md:block">Cart</span>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 px-4 rounded-[2px] text-gray-800 outline-none shadow-sm text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-3 text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Category Menu */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-10">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-3 gap-6 md:gap-8">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate(`/products/${cat.path}`)}
                className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group hover:text-primary transition-colors"
              >
                <div className="w-16 h-16 relative mb-1 overflow-hidden rounded-full border border-gray-200 shadow-sm">
                  <img
                    src={cat.image}
                    alt={cat.text}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <p className="text-sm font-medium text-gray-800 group-hover:text-primary whitespace-nowrap">
                  {cat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
