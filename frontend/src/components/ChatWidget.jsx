"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Reggae_One } from "next/font/google";
import { GiCrossMark } from "react-icons/gi";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";


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

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  useEffect(() => {
    if (open) {
      setShowHint(false);
      return;
    }

    const interval = setInterval(() => {
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
      }, 5000); // visible time
    }, 6000);
    return () => clearInterval(interval);
  }, [open]);

  return (
    <>

    <div className="fixed bottom-3 right-3 z-50">
      {showHint && !open && (
          <div
            className="absolute right-12 top-1/2 -translate-y-1/2
            bg-[#2b2a29] text-white text-base px-3 pb-0.5
            rounded-sm shadow-lg whitespace-nowrap
            origin-right animate-supportHint capitalize"
          >
            Message us!
            {/* bubble arrow */}
            <span
              className="absolute -right-2 top-1/2 -translate-y-1/2
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
        <div className="flex justify-between items-center bg-[#2b2a29]
        text-white px-4 py-2 rounded-t-xl">
          <h1 className={`${reggaeOne.className} text-lg`}>
            A Plus Mart BD
          </h1>
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
          <div className="flex gap-2.5">
            <span className="text-[#971900] border border-[#971900] rounded-full p-1">
              <FaUser size={22} />
            </span>

            <div className="relative bg-gray-600 text-white py-1 px-3
            rounded-r-lg rounded-t-lg w-fit max-w-[80%] text-base">
              {typedText}
              <span className="absolute -left-1.5 bottom-1 w-0 h-0
              border-t-6 border-t-transparent border-b-6 border-b-transparent
              border-r-6 border-r-gray-600"></span>
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
