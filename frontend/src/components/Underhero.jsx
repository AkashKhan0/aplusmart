import Link from "next/link";
import {
  BsEarbuds,
  BsFillHandbagFill,
  BsFillLampFill,
  BsStars,
  BsUsbDriveFill,
} from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { FaMobileAlt, FaUsb } from "react-icons/fa";
import {
  GiBatteryPack,
  GiDeliveryDrone,
  GiDeskLamp,
  GiFlowerPot,
  GiLaptop,
  GiMouse,
  GiReturnArrow,
  GiRobotGolem,
  GiUmbrella,
} from "react-icons/gi";
import { IoCamera, IoGameController } from "react-icons/io5";
import { LuProjector } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { FaComputer } from "react-icons/fa6";
import { MdKeyboard, MdSpeaker } from "react-icons/md";
import { ImPrinter } from "react-icons/im";

export default function Underhero() {
  // 🔥 feature categories data
  const categories = [
    { value: "Camera", label: "Camera", icon: <IoCamera /> },
    {
      value: "Mobile Accessories",
      label: "Mobile Accessories",
      icon: <FaMobileAlt />,
    },
    { value: "Women’s Bag", label: "Women’s Bag", icon: <BsFillHandbagFill /> },
    { value: "Power Bank", label: "Power Bank", icon: <GiBatteryPack /> },
    { value: "Gaming", label: "Gaming", icon: <IoGameController /> },
    { value: "Mini Projector", label: "Mini Projector", icon: <LuProjector /> },
    {
      value: "Computer Accessories",
      label: "Computer Accessories",
      icon: <FaComputer />,
    },
    {
      value: "Robotics Accessories",
      label: "Robotics Accessories",
      icon: <GiRobotGolem />,
    },
    { value: "Table Lamp", label: "Table Lamp", icon: <BsFillLampFill /> },
    { value: "Umbrella", label: "Umbrella", icon: <GiUmbrella /> },
    { value: "Humidifier", label: "Humidifier", icon: <WiHumidity /> },
    {
      value: "beauty products",
      label: "beauty products",
      icon: <GiFlowerPot />,
    },
    { value: "Flash Drive", label: "Flash Drive", icon: <BsUsbDriveFill /> },
    { value: "Mini Sound Box", label: "Mini Sound Box", icon: <MdSpeaker /> },
    { value: "Mini printer", label: "Mini printer", icon: <ImPrinter /> },
    {
      value: "Interior Lights",
      label: "Interior Lights",
      icon: <GiDeskLamp />,
    },
    {
      value: "Keyboard & Mouse",
      label: "Keyboard & Mouse",
      custom: (
        <span className="relative h-8">
          <MdKeyboard className="absolute -top-0.5 -left-1.5" />
          <GiMouse className="absolute top-1 -right-1.5" />
        </span>
      ),
    },
    { value: "Laptop Stand", label: "Laptop Stand", icon: <GiLaptop /> },
    { value: "USB Hub", label: "USB Hub", icon: <FaUsb /> },
    {
      value: "Earphones & Earbuds",
      label: "Earphones & Earbuds",
      icon: <BsEarbuds />,
    },
    { value: "Gimbal", label: "Gimbal", image: "/images/gimbal.png" },
    { value: "Drone", label: "Drone", icon: <GiDeliveryDrone /> },
    {
      value: "Kitchen Accessories",
      label: "Kitchen Accessories",
      image: "/images/kitchen.png",
    },
    {
      value: "Cloth Cleaner",
      label: "Cloth Cleaner",
      image: "/images/clean.png",
    },
    { value: "Jewellery", label: "Jewellery", image: "/images/jewelry.png" },
    {
      value: "Travel Bags",
      label: "Travel Bags",
      image: "/images/suitcase.png",
    },
    { value: "Kids Toys", label: "Kids Toys", image: "/images/toys.png" },
    {
      value: "Musical Instruments",
      label: "Musical Instruments",
      image: "/images/music.png",
    },
    { value: "Enclosure", label: "Enclosure", image: "/images/drive.png" },
    {
      value: "Cable Organizer",
      label: "Cable Organizer",
      image: "/images/cable.png",
    },
  ];

  return (
    <>
      <div className="w-full universal_column">
        <div className="fixed_width px-3">
          {/* policys */}
          <div className="w-full universal_column py-5 mt-5 sm:mt-10">
            <div className="fixed_width">
              <div className="w-full h-auto flex flex-wrap items-stretch justify-center gap-2.5">
                <div className="drop active:translate-y-1 active:shadow-[0_2px_0_#d1a900]">
                  <Link href="/online-delivery">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <span className="point_icon">
                        <TbTruckDelivery />
                      </span>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="point_h1">Online Delivery</h1>
                        <p className="point_p">From store to you.</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="drop active:translate-y-1 active:shadow-[0_2px_0_#d1a900]">
                  <Link href="/star-point-policy">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <span className="point_icon">
                        <BsStars />
                      </span>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="point_h1">Star Point Policy</h1>
                        <p className="point_p">Earn points easily.</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="drop active:translate-y-1 active:shadow-[0_2px_0_#d1a900]">
                  <Link href="/return&refund-policy">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <span className="point_icon">
                        <GiReturnArrow />
                      </span>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="point_h1">Return & Refund</h1>
                        <p className="point_p">Return with confidence.</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* featured */}
          <div className="w-full py-5 sm:py-10 universal_column">
            <div className="w-full flex flex-col items-center justify-center mb-5 px-2">
              <h1 className="text-lg sm:text-xl md:text-xl uppercase text-center font-medium tracking-[3px]">
                Featured Category
              </h1>
              <p className="text-base text-center">
                Get Your Desired Product from Featured Category!
              </p>
            </div>

            <div className="w-fit grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-2 items-stretch">
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/search?subCategory=${encodeURIComponent(cat.value)}`}
                >
                  <div className="features_category universal_column cursor-pointer active:translate-y-1 active:shadow-[0_2px_0_#d1a900]">
                    <span className="features_icon w-[30px]">
                      {cat.custom ? (
                        cat.custom
                      ) : cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.label}
                          className="w-[26px] h-[26px] object-contain"
                        />
                      ) : (
                        cat.icon
                      )}
                    </span>
                    <p className="features_p">{cat.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
