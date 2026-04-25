import { Link } from "react-router-dom";

const More = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">More</h1>
      <p className="text-gray-600 mt-2">
        Explore helpful links, policies, and information about our store and services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-3">About</h2>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/stories" className="hover:text-primary">Stories</Link></li>
            <li><Link to="/press" className="hover:text-primary">Press</Link></li>
            <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
            <li><Link to="/wholesale" className="hover:text-primary">Wholesale</Link></li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-3">Help</h2>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/payments" className="hover:text-primary">Payments</Link></li>
            <li><Link to="/shipping" className="hover:text-primary">Shipping</Link></li>
            <li><Link to="/cancellation" className="hover:text-primary">Cancellation & Returns</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-3">Policy</h2>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/returns" className="hover:text-primary">Return Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms of Use</Link></li>
            <li><Link to="/security" className="hover:text-primary">Security</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
            <li><Link to="/sitemap" className="hover:text-primary">Sitemap</Link></li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-3">Customer Services</h2>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/my-orders" className="hover:text-primary">Track Orders</Link></li>
            <li><Link to="/add-address" className="hover:text-primary">Manage Addresses</Link></li>
            <li><Link to="/cart" className="hover:text-primary">Cart & Checkout</Link></li>
            <li><Link to="/products" className="hover:text-primary">Browse Products</Link></li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-3">Follow Us</h2>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#" className="hover:text-primary">Instagram</a></li>
            <li><a href="#" className="hover:text-primary">Twitter</a></li>
            <li><a href="#" className="hover:text-primary">Facebook</a></li>
            <li><a href="#" className="hover:text-primary">YouTube</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default More;
