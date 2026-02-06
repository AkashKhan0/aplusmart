"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Reggae_One } from "next/font/google";
import { GiCrossMark } from "react-icons/gi";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

const supportPeople = [
  { name: "Preety", image: "/images/girl.png" },
  { name: "Naznin", image: "/images/girl1.png" },
  { name: "Mitu", image: "/images/girl2.jpg" },
];

const reggaeOne = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

const openMessenger = () => {
  const appWindow = window.open("https://m.me/aaplusmartbd", "_blank");
  setTimeout(() => {
    if (!appWindow || appWindow.closed) {
      window.open("https://www.messenger.com/t/aaplusmartbd", "_blank");
    }
  }, 800);
};

const startDate = new Date("2026-01-01T00:00:00");

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentUser, setCurrentUser] = useState(supportPeople[0]);

  const router = useRouter();
  const fullText = "How can I assist you?";

  const handleNavigate = (path) => {
    setOpen(false);
    router.push(path);
  };

  /* Typing effect */
  useEffect(() => {
    if (!open) return;
    setShowButtons(false);

    let i = 0;
    const typingInterval = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));

      if (i === fullText.length) {
        clearInterval(typingInterval);
        setTimeout(() => setShowButtons(true), 400);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, [open]);

  // Support Hint Effect
  useEffect(() => {
    if (open) {
      setShowHint(false);
      return;
    }

    const interval = setInterval(() => {
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
      }, 10000); // visible time
    }, 6000);
    return () => clearInterval(interval);
  }, [open]);

  // Change Support Person every 7 hours
  useEffect(() => {
    const calculateUser = () => {
      const now = new Date();
      const hour = now.getHours(); // 0-23
      const daysSinceStart = Math.floor(
        (now - startDate) / (1000 * 60 * 60 * 24)
      ); // total days
      const block = Math.floor(daysSinceStart / 10); // current 10-day block
      const shiftIndex = Math.floor(hour / 8); // 0-2
      const userIndex = (shiftIndex + block) % supportPeople.length;
      setCurrentUser(supportPeople[userIndex]);
    };

    calculateUser();

    // Optional: check every hour to update automatically if someone keeps the page open
    const timer = setInterval(calculateUser, 1000 * 60 * 60); // every hour
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="fixed bottom-15 sm:bottom-3 right-3 z-50">
        {showHint && !open && (
          <div
            className="absolute right-17 top-1/2 -translate-y-1/2
            origin-right animate-supportHint capitalize"
          >
            <div className="w-full max-w-fit flex items-center justify-center gap-1.5 shadow-lg whitespace-nowrap">
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col gap-0 bg-[#2b2a29] text-white text-xs px-3 py-1 rounded-sm">
                <span>Hi! I'm {currentUser.name}</span>
                <span>How can I assist you?</span>
              </div>
            </div>
            {/* bubble arrow */}
            <span
              className="absolute -right-7 top-1/2 -translate-y-1/2
              w-0 h-0 border-t-6 border-t-transparent
              border-b-6 border-b-transparent
              border-l-8 border-l-[#2b2a29]"
            />
          </div>
        )}

        <button
          onClick={() => setOpen(true)}
          className="bg-[#971900] hover:bg-[#590000]
          transition-all duration-300 text-white
          w-10 h-10 flex items-center justify-center
          rounded-full shadow-lg cursor-pointer relative"
        >
          <BiSupport size={26} />
        </button>
      </div>

      {/* Chat Box */}
      <div
        className={`fixed bottom-14 right-3 w-full max-w-[280px] bg-white
        rounded-xl shadow-2xl z-50 transform transition-all duration-300
        ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center bg-[#2b2a29]
        text-white px-4 py-2 rounded-t-xl"
        >
          <h1 className={`${reggaeOne.className} text-lg`}>A Plus Mart BD</h1>
          <button
            onClick={() => setOpen(false)}
            className="hover:text-[#971900] transition cursor-pointer"
          >
            <GiCrossMark />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-2 text-sm">
          {/* Auto Message */}
          <div className="flex items-center gap-2">
            <img
              src={currentUser.image}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full"
            />

            <div
              className="relative bg-gray-600 text-white px-3 h-7
            rounded-r-lg rounded-t-lg w-fit max-w-[80%] text-base universal"
            >
              {typedText}
              <span
                className="absolute -left-1.5 bottom-1 w-0 h-0
              border-t-6 border-t-transparent border-b-6 border-b-transparent
              border-r-6 border-r-gray-600"
              ></span>
            </div>
          </div>

          {/* Buttons */}
          {showButtons && (
            <div className="space-y-2 animate-fadeIn">
              <button
                onClick={() => handleNavigate("/online-delivery")}
                className="w-full border border-[#9719006f] py-1 rounded-lg
                hover:bg-green-50 transition text-[#000000] cursor-pointer"
              >
                Online Delivery
              </button>

              <button
                onClick={() => handleNavigate("/star-point-policy")}
                className="w-full border border-[#9719006f] py-1 rounded-lg
                hover:bg-green-50 transition text-[#000000] cursor-pointer"
              >
                Star Point Policy
              </button>

              <button
                onClick={() => handleNavigate("/return&refund-policy")}
                className="w-full border border-[#9719006f] py-1 rounded-lg
                hover:bg-green-50 transition text-[#000000] cursor-pointer"
              >
                Refund & Return Policy
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() =>
                    window.open("https://wa.me/8801853838891", "_blank")
                  }
                  className="w-full max-w-fit flex items-center gap-1.5 px-3 py-1 rounded-xl
                  bg-gradient-to-r from-[#25D366] to-[#1ebe5d]
                  text-white shadow hover:scale-[1.02] transition cursor-pointer"
                >
                  <FaWhatsapp size={17} />
                  WhatsApp
                </button>

                <button
                  onClick={openMessenger}
                  className="w-full max-w-fit flex items-center gap-1.5 px-3 py-1 rounded-xl
                  bg-gradient-to-r from-[#0084FF] to-[#006eff]
                  text-white shadow hover:scale-[1.02] transition cursor-pointer"
                >
                  <RiMessengerLine size={18} />
                  Messenger
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
