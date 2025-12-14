"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  // ---------------- Common States ----------------
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [greeting, setGreeting] = useState("");

  // ---------------- Auth States ----------------
  const [role, setRole] = useState("customer");
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
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
  const validateEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdPhoneRegex = /^(01[3-9]\d{8})$/;

    if (value.includes("@")) {
      if (!emailRegex.test(value)) {
        setMessage("Enter a valid email address");
        return false;
      }
    } else {
      if (!bdPhoneRegex.test(value)) {
        setMessage("Enter a valid Bangladeshi phone number");
        return false;
      }
    }

    setMessage("");
    return true;
  };

  // reset form input box
  const resetForm = () => {
    setFullName("");
    setEmailOrPhone("");
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
    setMessage("");

    // CUSTOMER
    if (role === "customer") {
      if (!fullName.trim()) return setMessage("Full name is required");
      if (!emailOrPhone.trim())
        return setMessage("Email or phone is required");
      if (!validateEmailOrPhone(emailOrPhone)) return;
      if (password.length < 6)
        return setMessage("Password must be at least 6 characters");
      if (password !== confirm)
        return setMessage("Passwords do not match");
    }

    // RESELLER
    if (role === "reseller") {
      if (!shopName.trim()) return setMessage("Shop name is required");
      if (!location.trim()) return setMessage("Location is required");
      if (!resellerName.trim())
        return setMessage("Reseller full name is required");
      if (!emailOrPhone.trim())
        return setMessage("Email or phone is required");
      if (!validateEmailOrPhone(emailOrPhone)) return;
      if (password.length < 6)
        return setMessage("Password must be at least 6 characters");
      if (password !== confirm)
        return setMessage("Passwords do not match");
    }

    const payload =
      role === "customer"
        ? { role, fullName, emailOrPhone, password }
        : { role, shopName, location, resellerName, emailOrPhone, password };

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
      resetForm();
      setTimeout(() => router.push("/login"), 1000);
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
        greeting,

        message,
        setMessage,
        isSuccess,

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

        showPass,
        setShowPass,
        showConfirm,
        setShowConfirm,

        registerUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
