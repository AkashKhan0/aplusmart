import Image from "next/image";
import Link from "next/link";
import {
  FaChevronUp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdMail } from "react-icons/md";
import ChatWidget from "./ChatWidget";
import { Reggae_One } from "next/font/google";

const reggaeOne = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

const scrollToTop = () => {
  const start = window.scrollY;
  const duration = 1000; //
  let startTime = null;

  // easing function
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  // animation loop
  const animateScroll = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // apply easing
    window.scrollTo(0, start * (1 - easeInOutQuad(progress)));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export default function Footer() {
  return (
    <>
      <div className="w-full h-fit universal_column bg-[#2B2A29] text-[#FFFFFF] pt-5 pb-16 sm:pb-5 md:pb-5">
        <div className="fixed_width h-full px-5">
          <div className="w-full flex flex-col sm:flex-col md:flex-row items-stretch gap-2.5">
            <div className="w-full smw-full md:w-[30%] flex flex-col items-center sm:items-center md:items-start">
              {/* <h1 className="ftr_h1">support</h1> */}
              <Link href="/">
                <h1
                  className={`${reggaeOne.className} text-[#971900] hover:text-[#590000] transition-colors duration-300 text-2xl mb-1.5`}
                >
                  A Plus Mart BD
                </h1>
              </Link>

              <div className="w-fit flex items-center text-sm gap-2.5 border border-[#4d4d4d7c] px-5 py-2 rounded-lg cursor-pointer hover:border-[#971900] transition-colors duration-300">
                <div className="w-[15px] h-[15px] mt-[3px]">
                  <IoMdCall />
                </div>
                <a href="tel:+8801850219432">+8801850219432</a>
              </div>
              <div className="w-fit flex items-center text-sm gap-2.5 border border-[#4d4d4d7c] px-5 py-2 rounded-lg cursor-pointer hover:border-[#971900] transition-colors duration-300 mt-2.5">
                <div className="w-[15px] h-[15px] mt-[3px]">
                  <MdMail />
                </div>
                <a href="mailto:support@aplusmartbd.com">
                  support@aplusmartbd.com
                </a>
              </div>
            </div>

            <div className="w-full smw-full md:w-[40%] flex flex-col items-center sm:items-center md:items-start">
              <h1 className="ftr_h1">About Us</h1>

              {/* desktop part */}
              <div className="w-full hidden sm:hidden md:flex gap-2.5">
                <div className="w-full flex flex-col text-sm gap-1.5 ftr_span">
                  <Link href="/online-delivery">
                    <p>Online Delivery</p>
                  </Link>
                  <Link href="/contact">
                    <p>Contact Us</p>
                  </Link>
                  <Link href="/star-point-policy">
                    <p>Star Point Policy</p>
                  </Link>
                </div>
                <div className="w-full flex flex-col text-sm gap-1.5 ftr_span">
                  <Link href="/terms-condition">
                    <p>Terms and Conditions</p>
                  </Link>
                  <Link href="/privacy-policy">
                    <p>Privacy Policy</p>
                  </Link>
                  <Link href="/return&refund-policy">
                    <p>Refund and Return Policy</p>
                  </Link>
                </div>
              </div>

              {/* mobile part */}
              <div className="w-full flex sm:flex md:hidden gap-2.5">
                <div className="w-full flex flex-wrap justify-center ftr_span text-sm gap-5 gap-y-1">
                  <Link href="/online-delivery">
                    <p>Online Delivery</p>
                  </Link>
                  <Link href="/contact">
                    <p>Contact Us</p>
                  </Link>
                  <Link href="/terms-condition">
                    <p>Terms and Conditions</p>
                  </Link>
                  <Link href="/star-point-policy">
                    <p>Star Point Policy</p>
                  </Link>
                  <Link href="/privacy-policy">
                    <p>Privacy Policy</p>
                  </Link>
                  <Link href="/return&refund-policy">
                    <p>Refund and Return Policy</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-full md:w-[30%] flex flex-col items-center sm:items-center md:items-start">
              <h1 className="ftr_h1">Stay Connected</h1>
              <div className="w-fit text-center sm:text-center md:text-start ftr_span text-sm">
                <p className="font-medium">A Plus Mart BD</p>

                <div className="w-fit flex items-center justify-center sm:justify-center md:justify-start text-sm gap-2.5 my-2">
                  <div className="w-[15px] h-[15px] mt-[3px]">
                    <MdMail />
                  </div>
                  <a href="mailto:info@aplusmartbd.com">info@aplusmartbd.com</a>
                </div>
                <div className="flex items-center justify-center sm:justify-center md:justify-start text-lg mt-5 gap-2.5">
                  <Link href="">
                    <FaFacebookF className="text-[#FFFFFF] hover:text-[#971900] transition-colors duration-300" />
                  </Link>
                  <Link href="">
                    <FaInstagram className="text-[#FFFFFF] hover:text-[#971900] transition-colors duration-300" />
                  </Link>
                  <Link href="">
                    <FaYoutube className="text-[#FFFFFF] hover:text-[#971900] transition-colors duration-300" />
                  </Link>
                  <Link href="">
                    <FaTiktok className="text-[#FFFFFF] hover:text-[#971900] transition-colors duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed_width h-full px-5 mt-10">
          <div className="w-full flex flex-col items-center justify-center">
            <p className="ftr_p">
              © 2025 A Plus Advertising Limited. All rights reserved.
            </p>
            <p className="ftr_p">Powered By: A Plus Advertising Limited</p>
          </div>
        </div>

        <div className="">
          <button
            onClick={scrollToTop}
            className="scroll-float fixed cursor-pointer bottom-15 sm:bottom-3 left-3 z-50 w-fit flex justify-center text-[#971900] hover:text-[#ffffff] transition-colors duration-300 p-2 bg-[#00000080] rounded-full shadow-lg"
            aria-label="Scroll to top"
          >
            <FaChevronUp size={22} />
          </button>
        </div>
        <div className="">
          <ChatWidget />
        </div>
      </div>
    </>
  );
}
