import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white pt-12 pb-6 mt-10 text-sm font-sans">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b border-gray-600">
          
          {/* About */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-400 text-xs mb-4 uppercase font-medium">About</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/stories" className="hover:underline">Stories</Link></li>
              <li><Link to="/press" className="hover:underline">Press</Link></li>
              <li><Link to="/wholesale" className="hover:underline">Wholesale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-400 text-xs mb-4 uppercase font-medium">Help</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/payments" className="hover:underline">Payments</Link></li>
              <li><Link to="/shipping" className="hover:underline">Shipping</Link></li>
              <li><Link to="/cancellation" className="hover:underline">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/report" className="hover:underline">Report Infringement</Link></li>
            </ul>
          </div>

          {/* Consumer Policy */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-400 text-xs mb-4 uppercase font-medium">Consumer Policy</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/return-policy" className="hover:underline">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Use</Link></li>
              <li><Link to="/security" className="hover:underline">Security</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy</Link></li>
              <li><Link to="/sitemap" className="hover:underline">Sitemap</Link></li>
              <li><Link to="/grievance" className="hover:underline">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-1">
            <h3 className="text-gray-400 text-xs mb-4 uppercase font-medium">Social</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          {/* Mail Us */}
          <div className="lg:col-span-1 pl-0 lg:pl-8 border-l border-gray-600">
             <h3 className="text-gray-400 text-xs mb-4 uppercase font-medium">Mail Us:</h3>
             <p className="text-xs leading-relaxed">
               Siva Honey Farm,<br/>
               Organic Estate, Building 4,<br/>
               Nature Valley, Tech City,<br/>
               Bangalore, 560103,<br/>
               Karnataka, India
             </p>
          </div>

          {/* Registered Office */}
          <div className="lg:col-span-1">
             <h3 className="text-gray-400 text-xs mb-4 uppercase font-medium">Registered Office Address:</h3>
             <p className="text-xs leading-relaxed">
               Siva Honey Farm Private Limited,<br/>
               Organic Estate, Building 4,<br/>
               Nature Valley, Tech City,<br/>
               Bangalore, 560103,<br/>
               Karnataka, India<br/>
               CIN: U51109KA2012PTC066107<br/>
               Telephone: <span className="text-primary font-medium">044-45614700</span>
             </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs">
                 <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.5L18.5 19H5.5L12 5.5z"/></svg>
                 Become a Seller
              </span>
              <span className="flex items-center gap-2 text-xs">
                 <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15v-2h2v2h-2zm0-10v6h2V7h-2z"/></svg>
                 Advertise
              </span>
              <span className="flex items-center gap-2 text-xs">
                 <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                 Gift Cards
              </span>
              <span className="flex items-center gap-2 text-xs">
                 <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z"/></svg>
                 Help Center
              </span>
           </div>
           <div className="text-xs">
             © 2007-2024 SivaHoney.com
           </div>
           <div className="flex items-center gap-2">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payment Methods" className="h-4" />
           </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
