import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdMail } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <div className="w-full h-fit universal_column bg-[#2B2A29] text-[#FFFFFF] py-5">
        <div className="fixed_width h-full px-5">
          <div className="w-full flex flex-col sm:flex-col md:flex-row items-stretch gap-2.5">
            <div className="w-full smw-full md:w-[30%] flex flex-col items-center sm:items-center md:items-start">
              <h1 className="ftr_h1">support</h1>

              <div className="w-fit flex items-center text-sm gap-2.5">
                <div className="w-[15px] h-[15px] mt-[3px]">
                  <IoMdCall />
                </div>
                <a href="tel:+8801850219432">+8801850219432</a>
              </div>
              <div className="w-fit flex items-center text-sm gap-2.5 my-2">
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

            <div className="w-full smw-full md:w-[30%] flex flex-col items-center sm:items-center md:items-start">
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
                    <FaFacebookF />
                  </Link>
                  <Link href="">
                    <FaInstagram />
                  </Link>
                  <Link href="">
                    <FaYoutube />
                  </Link>
                  <Link href="">
                    <FaTiktok />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed_width h-full px-5 mt-10">
          <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between">
            <p className="ftr_p">
              © 2025 A Plus Advertising Limited. All rights reserved.
            </p>
            <p className="ftr_p">Powered By: A Plus Advertising Limited</p>
          </div>
        </div>
      </div>
    </>
  );
}
