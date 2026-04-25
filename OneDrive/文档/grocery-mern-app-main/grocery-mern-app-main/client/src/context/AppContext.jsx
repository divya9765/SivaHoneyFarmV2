import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [addresses, setAddresses] = useState([]);

  // fetch addresses
  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
      } else {
        setAddresses(dummyAddress);
      }
    } catch {
      setAddresses(dummyAddress);
    }
  };

  // add address
  const addAddress = async (newAddress) => {
    try {
      const { data } = await axios.post("/api/address/add", {
        address: newAddress,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchAddresses();
      } else {
        toast.error(data.message);
        // Fallback for demo
        setAddresses([...addresses, { ...newAddress, _id: Date.now().toString() }]);
        toast.success("Address added (Demo Mode)");
      }
    } catch {
      // Fallback for demo
      setAddresses([...addresses, { ...newAddress, _id: Date.now().toString() }]);
      toast.success("Address added (Demo Mode)");
    }
  };

  // check seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch {
      setIsSeller(false);
    }
  };

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-auth");
      if (data.success) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    }
  };

  // fetch user auth status ,user Data and cart items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart);
    } else {
      setUser(null);
      setCartItems({});
    }
  } catch {
    setUser(null);
    setCartItems({});
  }
  };

  // fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
        setProducts(dummyProducts);
      }
    } catch (error) {
      toast.error(error.message);
      setProducts(dummyProducts);
    }
  };
  // add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {}); // safeguard for undefined

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success(`cart updated`);
  };

  // total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };
  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo && cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success(`remove from cart`);
      setCartItems(cartData);
    }
  };
  useEffect(() => {
    fetchSeller();
    fetchAdmin();
    fetchProducts();
    fetchUser();
  }, []);

  // update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  // Favorites logic
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      return storedFavorites ? new Set(JSON.parse(storedFavorites)) : new Set();
    } catch (e) {
      console.error("Failed to parse favorites", e);
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify([...favorites]));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  }, [favorites]);

  const toggleFavorite = (productId) => {
    if (favorites.has(productId)) {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.delete(productId);
        return newFavorites;
      });
      toast.success("Removed from favorites");
    } else {
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        newFavorites.add(productId);
        return newFavorites;
      });
      toast.success("Added to favorites");
    }
  };

  const isFavorite = (productId) => {
    return favorites.has(productId);
  };

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    isAdmin,
    setIsAdmin,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
    addresses,
    fetchAddresses,
    addAddress,
    favorites,
    toggleFavorite,
    isFavorite,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
