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
  GiBearFace,
  GiDeliveryDrone,
  GiDeskLamp,
  GiFlowerPot,
  GiLaptop,
  GiMouse,
  GiReturnArrow,
  GiRobotGolem,
  GiSchoolBag,
  GiUmbrella,
} from "react-icons/gi";
import { IoCamera, IoGameController } from "react-icons/io5";
import { LuProjector } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { FaComputer, FaHeadphonesSimple } from "react-icons/fa6";
import { MdKeyboard, MdSpeaker } from "react-icons/md";
import { ImPrinter } from "react-icons/im";

export default function Underhero() {
  return (
    <>
      <div className="w-full universal_column">
        <div className="fixed_width px-5">

          {/* policys */}
          <div className="w-full universal_column py-5 mt-5 sm:mt-10">
            <div className="fixed_width">
              {/* empty space under hero for universal nav spacing */}
              <div className="w-full h-auto flex flex-wrap items-stretch justify-center gap-2.5">
                <div className="drop">
                  <Link
                    href="/online-delivery"
                    className=""
                  >
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

                <div className="drop">
                  <Link
                    href="/star-point-policy"
                    className=""
                  >
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

                <div className="drop">
                  <Link
                    href="/return&refund-policy"
                    className=""
                  >
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

          <div className="w-full py-5 sm:py-10 universal_column">
            <div className="w-full flex flex-col items-center justify-center mb-5">
              <h1 className="text-lg sm:text-xl md:text-xl uppercase text-center font-medium tracking-[3px]">
                Featured Category
              </h1>
              <p className="text-base text-center">
                Get Your Desired Product from Featured Category!
              </p>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2 items-stretch">
              <div className="features_category universal_column">
                <span className="features_icon">
                  <IoCamera />
                </span>
                <p className="features_p">Camera</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <FaMobileAlt />
                </span>
                <p className="features_p">Mobile Accessories</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <BsFillHandbagFill />
                </span>
                <p className="features_p">Women’s Bag</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <GiBatteryPack />
                </span>
                <p className="features_p">Power Bank</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <IoGameController />
                </span>
                <p className="features_p">Gaming</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <LuProjector />
                </span>
                <p className="features_p">Mini Projector</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <FaComputer />
                </span>
                <p className="features_p">Computer Accessories</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <GiRobotGolem />
                </span>
                <p className="features_p">Robotics Accessories</p>
              </div>
              {/* second row */}
              <div className="features_category universal_column">
                <span className="features_icon">
                  <BsFillLampFill />
                </span>
                <p className="features_p">Table Lamp</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <GiUmbrella />
                </span>
                <p className="features_p">Umbrella</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <WiHumidity />
                </span>
                <p className="features_p">Humidifier</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <GiFlowerPot />
                </span>
                <p className="features_p">beauty products</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <BsUsbDriveFill />
                </span>
                <p className="features_p">Flash Drive</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <MdSpeaker />
                </span>
                <p className="features_p">Mini Sound Box</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <ImPrinter />
                </span>
                <p className="features_p">Mini printer</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <GiDeskLamp />
                </span>
                <p className="features_p">Interior Lights</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon relative h-8">
                  <MdKeyboard className="absolute -top-0.5 -left-1.5" />
                  <GiMouse className="absolute top-1 -right-1.5" />
                </span>
                <p className="features_p">Keyboard & Mouse</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <GiLaptop />
                </span>
                <p className="features_p">Laptop Stand</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <FaUsb />
                </span>
                <p className="features_p">USB Hub</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <BsEarbuds />
                </span>
                <p className="features_p">Earphones & Earbuds</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/gimbal.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Gimbal</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon">
                  <GiDeliveryDrone />
                </span>
                <p className="features_p">Drone</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/kitchen.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Kitchen Accessories</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/clean.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Cloth Cleaner</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/jewelry.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Jewellery</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/suitcase.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Travel Bags</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/toys.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Kids Toys</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/music.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Musical Instruments</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/drive.png"
                    alt="Gimbal"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Enclosure</p>
              </div>
              <div className="features_category universal_column">
                <span className="features_icon w-[30px]">
                  <img
                    src="/images/cable.png"
                    alt="Cable Organizer"
                    className="w-[26px] h-[26px] object-contain"
                  />
                </span>
                <p className="features_p">Cable Organizer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
