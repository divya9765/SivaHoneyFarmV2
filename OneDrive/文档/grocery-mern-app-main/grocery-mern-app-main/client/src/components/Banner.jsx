import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      img: assets.main_banner_bg,
      imgSm: assets.main_banner_bg_sm,
      title: "Pure Honey, Organic Soaps, and Natural Hair Oils",
      desc: "Small-batch, ethically sourced, and crafted with care. Nourish your body and hair with nature’s best.",
      link: "/products",
      btnText: "Shop Now",
      theme: "amber"
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=2070&auto=format&fit=crop",
      imgSm: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=800&auto=format&fit=crop",
      title: "Premium Organic Beauty Collection",
      desc: "Enhance your natural beauty with our chemical-free products. Pure, safe, and effective.",
      link: "/products/Beauty",
      btnText: "Explore Beauty",
      theme: "rose"
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2070&auto=format&fit=crop",
      imgSm: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800&auto=format&fit=crop",
      title: "Handcrafted Organic Soaps",
      desc: "Gentle on skin, tough on impurities. Made with natural ingredients for a refreshing bath.",
      link: "/products/Soaps",
      btnText: "Shop Soaps",
      theme: "green"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full bg-gray-100 mt-2">
      <div className="relative w-full overflow-hidden h-[200px] md:h-[320px] lg:h-[380px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Link to={banner.link} className="block w-full h-full relative">
               <picture>
                <source srcSet={banner.img} media="(min-width: 768px)" />
                <img
                  className="w-full h-full object-cover object-center"
                  src={banner.imgSm}
                  alt={banner.title}
                />
              </picture>
              {/* Optional Overlay/Text - styled to match Flipkart's clean look or overlay text */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                 <div className="pl-6 md:pl-16 max-w-lg text-white">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 shadow-sm">{banner.title}</h2>
                    <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90 hidden md:block">{banner.desc}</p>
                    <span className="inline-block bg-white text-gray-900 font-semibold px-4 py-2 rounded-sm text-sm md:text-base hover:bg-gray-100 transition-colors">
                      {banner.btnText}
                    </span>
                 </div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white h-20 w-8 md:w-10 flex items-center justify-center rounded-r-md transition-colors group"
        >
           <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white h-20 w-8 md:w-10 flex items-center justify-center rounded-l-md transition-colors group"
        >
           <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Banner;
