"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  // cart update trigger
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // ---------------- Common States ----------------
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [greeting, setGreeting] = useState("");

  // ---------------- Auth States ----------------
  const [role, setRole] = useState("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Reseller
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [resellerName, setResellerName] = useState("");

  // UI
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Helpers, email and phone number validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePhone = (phone) => {
    const re = /^(01[3-9]\d{8})$/;
    return re.test(phone);
  };

  // reset form input box
  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirm("");
    setShopName("");
    setLocation("");
    setResellerName("");
    setMessage("");
    setIsSuccess(false);
  };

  // ---------------- Register ----------------
  const registerUser = async () => {
    // CUSTOMER
    if (role === "customer" && !fullName.trim()) return setMessage("Full name is required");

    // RESELLER
    if (role === "reseller") {
      if (!shopName.trim()) return setMessage("Shop name is required");
      if (!location.trim()) return setMessage("Location is required");
      if (!resellerName.trim())
        return setMessage("Reseller full name is required");
    }

    // COMMON
    if (!email.trim()) return setMessage("Email is required");
    if (!validateEmail(email)) return setMessage("Invalid email");

    if (!phone.trim()) return setMessage("Phone is required");
    if (!validatePhone(phone)) return setMessage("Phone must be 11 digits");

    if (password.length < 6)
      return setMessage("Password must be at least 6 characters");
    if (password !== confirm) return setMessage("Passwords do not match");

    const payload =
      role === "customer"
        ? { role, fullName, email, phone, password }
        : { role, shopName, location, resellerName, email, phone, password };

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setIsSuccess(false);
        return setMessage(data.error || "Registration failed");
      }

      setIsSuccess(true);
      setMessage("Registration successful");
      setTimeout(() => {
        resetForm();
        router.push("/login");
      }, 2000);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Something went wrong");
    }
  };

  // ---------------- Search ----------------
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${search}`);
    setSearch("");
  };

  // 🔹 Fetch user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (data.user) setUser(data.user);
        else setUser(null);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  // 🔹 Fetch cart from COOKIE (🔥 FIX)
  useEffect(() => {

    if (!user) {
    setCart([]);
    return;
  }

    async function fetchCart() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
          credentials: "include",
        });
        const data = await res.json();
        setCart(Array.isArray(data.cart) ? data.cart : []);
      } catch {
        setCart([]);
      }
    }

    fetchCart();
  }, [user]);

  // 🔹 Save cart to COOKIE
  const syncCart = async (updatedCart) => {
    setCart(updatedCart);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: updatedCart }),
    });
  };

  const addToCart = (newItem) => {
    const existingIndex = cart.findIndex((item) => item._id === newItem._id && item.role === newItem.role);

    let updatedCart = [...cart];

    if (existingIndex !== -1) {
      // product already exists
      const existing = updatedCart[existingIndex];
      // merge colors (no duplicate)
      const mergedColors = Array.from(
        new Set([...(existing.colors || []), ...(newItem.colors || [])])
      );
      updatedCart[existingIndex] = {
        ...existing,
        quantity: existing.quantity + newItem.quantity,
        colors: mergedColors,
      };
    } else {
      // first time add
      updatedCart.push(newItem);
    }
    syncCart(updatedCart);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity } : item
    );

    syncCart(updated);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    syncCart(updated);
  };

  const clearCart = async () => {
    setCart([]);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
      method: "DELETE",
      credentials: "include",
    });
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

  /* ================= PLACE ORDER ================= */
  const placeOrder = async (orderData) => {
    const res = await fetch(`${API}/api/orders`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error("Order failed");

    const data = await res.json();
    await clearCart();
    router.push(`/order-confirmation?orderId=${data._id}`);
  };

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        handleSearch,
        greeting,
        message,
        setMessage,
        isSuccess,
        role,
        setRole,
        fullName,
        setFullName,
        shopName,
        setShopName,
        location,
        setLocation,
        email,
        setEmail,
        phone,
        setPhone,
        password,
        setPassword,
        confirm,
        setConfirm,
        validateEmail,
        validatePhone,
        resellerName,
        setResellerName,
        showPass,
        setShowPass,
        showConfirm,
        setShowConfirm,
        registerUser,
        cart,
        setCart,
        addToCart,
        clearCart,
        updateQuantity,
        removeFromCart,
        user,
        setUser,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
