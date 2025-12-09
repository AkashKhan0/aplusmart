"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/src/lib/getUser";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  // ---------------- States ----------------
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColors, setSelectedColors] = useState([]);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  // USER ROLE
  const [role, setRole] = useState("customer");
  // CUSTOMER FIELDS
  const [fullName, setFullName] = useState("");
  // COMMON FIELDS
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // RESELLER FIELDS
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [resellerName, setResellerName] = useState("");
  // ERRORS
  const [errorName, setErrorName] = useState("");
  const [errorEmailPhone, setErrorEmailPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [errorShop, setErrorShop] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [errorResellerName, setErrorResellerName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // Show/Hide Password
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Email / Phone validation
  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhoneRegex = /^(01[3-9]\d{8})$/;

    if (value.includes("@")) {
      if (!emailRegex.test(value)) setErrorEmailPhone("Enter a valid email.");
      else setErrorEmailPhone("");
    } else {
      if (!bdPhoneRegex.test(value))
        setErrorEmailPhone("Enter valid Bangladeshi phone number.");
      else setErrorEmailPhone("");
    }

    setEmailOrPhone(value);
  };

  // RESET FORM
  const resetForm = () => {
    setFullName("");
    setEmailOrPhone("");
    setPassword("");
    setConfirm("");
    setShopName("");
    setLocation("");
    setResellerName("");
    setErrorName("");
    setErrorEmailPhone("");
    setErrorPassword("");
    setErrorConfirm("");
    setErrorShop("");
    setErrorLocation("");
    setErrorResellerName("");
    setMessage("");
    setIsSuccess(false);
  };

  // REGISTER FUNCTION
  const registerUser = async () => {
    setMessage("");

    // CUSTOMER VALIDATION
    if (role === "customer") {
      if (!fullName.trim()) return setErrorName("Full name is required.");
      if (!emailOrPhone.trim())
        return setErrorEmailPhone("Email or phone is required.");
      if (errorEmailPhone) return;
      if (password.length < 6)
        return setErrorPassword("Password must be at least 6 characters.");
      if (password !== confirm)
        return setErrorConfirm("Passwords do not match.");
    }

    // RESELLER VALIDATION
    if (role === "reseller") {
      if (!shopName.trim()) return setErrorShop("Shop name is required.");
      if (!location.trim()) return setErrorLocation("Location is required.");
      if (!resellerName.trim())
        return setErrorResellerName("Reseller full name is required.");
      if (!emailOrPhone.trim())
        return setErrorEmailPhone("Email or phone is required.");
      if (errorEmailPhone) return;
      if (password.length < 6)
        return setErrorPassword("Password must be at least 6 characters.");
      if (password !== confirm)
        return setErrorConfirm("Passwords do not match.");
    }

    // SEND TO BACKEND
    const payload =
      role === "customer"
        ? { role, fullName, emailOrPhone, password }
        : { role, shopName, location, resellerName, emailOrPhone, password };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setMessage("Registration successful!");
        resetForm();
        setTimeout(() => router.push("/login"), 1000);
      } else {
        setIsSuccess(false);
        setMessage(data.error);
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage("Something went wrong!");
    }
  };

  // ---------------- Load products ----------------
  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      setProducts(data.products || data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  // ---------------- Load user profile ----------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    async function loadProfile() {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserProfile();
        if (!data || data.error) throw new Error("Invalid session");

        setUser(data);
        if (data.role === "reseller") setQuantity(50);
      } catch (err) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  // ---------------- Handle search ----------------
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/search?q=${search}`);
    setSearch("");
  };

  // ---------------- Handle account click (FIX) ----------------
  const handleAccountClick = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token || loading) {
      // either not logged in or profile still loading
      router.push(`/login?redirect=${window.location.pathname}`);
      return;
    }

    // token exists & loading done
    router.push("/profile");
  };

  // ---------------- Logout ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  // Auto-login if token exists
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    const savedToken = localToken || sessionToken;

    if (savedToken) {
      setToken(savedToken);
      router.replace("/");
    }
  }, []);

  const login = async ({ emailOrPhone, password, rememberMe }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailOrPhone, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setUser(data.user || null);

        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }

        return { success: true };
      } else {
        return { success: false, error: data.error || "Login failed." };
      }
    } catch (err) {
      return { success: false, error: "Server error. Please try again." };
    }
  };

  // ---------------- Quantity auto-reset on user change ----------------
  useEffect(() => {
    if (!user) {
      setQuantity(1);
    } else {
      setQuantity(user.role === "reseller" ? 50 : 1);
    }
  }, [user]);

  // ---------------- Quantity functions ----------------
  const increment = () => {
    if (!user) {
      setMessage("Please login first!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    const step = user.role === "reseller" ? 50 : 1;
    setQuantity((prev) => prev + step);
    setMessage("");
  };

  const decrement = () => {
    if (!user) {
      setMessage("Please login first!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    const step = user.role === "reseller" ? 50 : 1;
    setQuantity((prev) => (prev - step >= step ? prev - step : step));
    setMessage("");
  };

  // ---------------- Color select ----------------
  const handleColorSelect = (color) => {
    if (!user) {
      setMessage("Please login first!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    setMessage("");
  };

  // ---------------- Buy Now ----------------
  const handleBuyNow = () => {
    if (!user) {
      setMessage("Please login first!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    if (!product) return;

    if (selectedColors.length === 0) {
      setMessage("Please select a color!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    const uniqueId = crypto.randomUUID();
    const cartItem = {
      id: uniqueId,
      productId: product._id,
      name: product.name,
      image: product.images?.[0] || "/placeholder.png",
      price: product.offerPrice,
      quantity,
      colors: selectedColors,
    };

    saveCart([...cart, cartItem]);
    setMessage("Added to cart!");
    setTimeout(() => setMessage(""), 2000);
    router.push("/checkout");
  };
  const cartCount = cart.length;

  // Update cart quantity
  const updateCartQuantity = (id, type) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        let step = user.role === "reseller" ? 50 : 1; // role-based step
        let newQty =
          type === "inc" ? item.quantity + step : item.quantity - step;

        // Minimum quantity
        if (user.role === "reseller") {
          if (newQty < 50) newQty = 50;
        } else {
          if (newQty < 1) newQty = 1;
        }

        return { ...item, quantity: newQty };
      }
      return item;
    });

    saveCart(newCart);
  };

  // Remove item from cart
  const removeCartItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  // ---------------- Cart ----------------
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Helper to get user-specific cart key
  const getCartKey = () => {
    if (!user) return "cart_guest";
    return `cart_${user.role}_${user._id}`;
  };

  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem(getCartKey(), JSON.stringify(newCart));
    } catch (err) {
      console.error("saveCart error:", err);
    }
  };

  const loadCart = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
      setCart(storedCart);
    } catch (err) {
      console.error("loadCart error:", err);
      setCart([]);
    }
  };

  useEffect(() => {
    if (user) loadCart();
  }, [user]);

const orderId = String(Math.floor(100000 + Math.random() * 900000));

  const placeOrder = ({
    billing,
    orderId,
    shippingMethod,
    shippingCharge,
    paymentMethod,
    items,
    points,
  }) => {
    // generate 6-digit order id

    // compute items total
    const itemsTotal = items.reduce(
      (acc, it) => acc + it.price * it.quantity,
      0
    );

    const order = {
      billing,
      shippingMethod,
      orderId,
      shippingCharge,
      paymentMethod,
      items,
      itemsTotal,
      points,
      grandTotal: itemsTotal + Number(shippingCharge || 0),
      createdAt: new Date().toISOString(),
    };

    // save to sessionStorage so order-confirmation page can read it
    try {
      sessionStorage.setItem("latest_order", JSON.stringify(order));
    } catch (err) {
      console.error("sessionStorage error:", err);
    }

    // clear cart
    try {
      localStorage.removeItem(getCartKey());
    } catch (err) {
      console.error("clear cart error:", err);
    }
    setCart([]);

    // redirect to confirmation page
    router.push("/order-confirmation");
  };



  // ---------------- Greeting ----------------
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting("Good Morning");
      else if (hour >= 12 && hour < 16) setGreeting("Good Afternoon");
      else if (hour >= 16 && hour < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        handleSearch,
        handleAccountClick,
        products,
        loading,
        loadProducts,
        greeting,
        activeTab,
        setActiveTab,
        handleLogout,
        user,
        setUser,
        product,
        setProduct,
        relatedProducts,
        setRelatedProducts,
        activeImage,
        setActiveImage,
        quantity,
        setQuantity,
        selectedColors,
        setSelectedColors,
        message,
        setMessage,
        cart,
        setCart,
        increment,
        decrement,
        handleColorSelect,
        handleBuyNow,
        token,
        login,
        role,
        setRole,
        fullName,
        setFullName,
        emailOrPhone,
        setEmailOrPhone,
        password,
        setPassword,
        confirm,
        setConfirm,
        shopName,
        setShopName,
        location,
        setLocation,
        resellerName,
        setResellerName,
        errorName,
        errorEmailPhone,
        errorPassword,
        errorConfirm,
        errorShop,
        errorLocation,
        errorResellerName,
        isSuccess,
        showPass,
        setShowPass,
        showConfirm,
        setShowConfirm,
        validateEmailOrPhone,
        registerUser,
        cartCount,
        updateCartQuantity,
        removeCartItem,
        placeOrder,orderId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
