"use client";

import { useState } from "react";
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
  const router = useRouter();

  const handleNavigate = (path) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-3 right-3 z-50 bg-[#971900] hover:bg-[#590000] transition-colors duration-300 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg text-xl cursor-pointer"
      >
        <BiSupport size={28} />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-14 right-3 w-full max-w-[300px] bg-white rounded-xl shadow-2xl z-50">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#2b2a29] text-white px-4 py-2 rounded-t-xl">
            <h1
              className={`${reggaeOne.className} text-[#ffffff] transition-colors duration-300 text-lg`}
            >
              A Plus Mart BD
            </h1>
            <button
              className="text-[#ffffff] hover:text-[#971900] cursor-pointer transition-colors duration-300"
              onClick={() => setOpen(false)}
            >
              <GiCrossMark />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-2 text-sm">
            {/* Auto Message */}
            <div className="w-full flex items-center justify-start gap-2.5">
              <span className="text-[#000000]">
                <FaUser size={22} />
              </span>

              {/* Chat arrow */}
              <div className="relative bg-gray-600 text-white py-1 px-3 rounded-r-lg rounded-t-lg w-fit max-w-[80%]">
                How can I assist you?
                {/* Arrow / Tail */}
                <span className="absolute -left-1.5 bottom-1 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-gray-600"></span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => handleNavigate("/online-delivery")}
              className="w-full border cursor-pointer border-[#9719006f] text-[#2b2a29] py-1 rounded-lg hover:bg-green-50"
            >
              Online Delivery
            </button>

            <button
              onClick={() => handleNavigate("/star-point-policy")}
              className="w-full border cursor-pointer border-[#9719006f] text-[#2b2a29] py-1 rounded-lg hover:bg-green-50"
            >
              Star Point Policy
            </button>

            <button
              onClick={() => handleNavigate("/return&refund-policy")}
              className="w-full border cursor-pointer border-[#9719006f] text-[#2b2a29] py-1 rounded-lg hover:bg-green-50"
            >
              Refund & Return Policy
            </button>

            <div className="w-full flex items-center justify-center gap-2.5">
              <button
  onClick={() => window.open("https://wa.me/8801853838891", "_blank")}
  className="w-full flex items-center gap-3 px-4 py-2 rounded-xl
             bg-gradient-to-r from-[#25D366] to-[#1ebe5d]
             text-white font-medium shadow-md
             hover:scale-[1.02] hover:shadow-lg transition"
>
  <span className="bg-white/20 p-2 rounded-full">
    <FaWhatsapp size={18} />
  </span>
  <span className="text-sm">WhatsApp</span>
</button>

<button
  onClick={openMessenger}
  className="w-full flex items-center gap-3 px-4 py-2 rounded-xl
             bg-gradient-to-r from-[#0084FF] to-[#006eff]
             text-white font-medium shadow-md
             hover:scale-[1.02] hover:shadow-lg transition"
>
  <span className="bg-white/20 p-2 rounded-full">
    <RiMessengerLine size={18} />
  </span>
  <span className="text-sm">Messenger</span>
</button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
