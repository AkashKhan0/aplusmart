import Link from "next/link";
import { BsFillLampFill, BsStars, BsUsbDriveFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaMagic, FaMobileAlt } from "react-icons/fa";
import { GiBatteryPack, GiBearFace, GiCurvyKnife, GiFlowerPot, GiReturnArrow, GiRobotGolem, GiSchoolBag, GiUmbrella } from "react-icons/gi";
import { IoCamera, IoGameController } from "react-icons/io5";
import { LuProjector } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { FaComputer } from "react-icons/fa6";
import { MdSpeaker } from "react-icons/md";
import { ImPrinter } from "react-icons/im";

export default function Underhero() {
  return (
    <>
      <div className="w-full universal_column">
        {/* all products */}
        <div className="fixed_width px-5">
          <div className="w-full universal_column py-5 mt-10">
            <div className="fixed_width px-5">
              {/* empty space under hero for universal nav spacing */}
              <div className="w-full h-auto flex flex-col sm:flex-row md:flex-row items-center justify-center gap-5">
                <Link
                  href="/online-delivery"
                  className="w-full max-w-[250px] duration-300"
                >
                  <div className="points">
                    <span className="point_icon">
                      <TbTruckDelivery />
                    </span>
                    <div className="">
                      <h1 className="point_h1">Online Delivery</h1>
                      <p className="point_p">From store to you.</p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/star-point-policy"
                  className="w-full max-w-[250px]"
                >
                  <div className="points">
                    <span className="point_icon">
                      <BsStars />
                    </span>
                    <div className="">
                      <h1 className="point_h1">Star Point Policy</h1>
                      <p className="point_p">Earn points easily.</p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/return&refund-policy"
                  className="w-full max-w-[250px]"
                >
                  <div className="points">
                    <span className="point_icon">
                      <GiReturnArrow />
                    </span>
                    <div className="">
                      <h1 className="point_h1">Return & Refund Policy</h1>
                      <p className="point_p">Return with confidence.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full py-10 universal_column">
            <div className="w-full flex flex-col items-center justify-center mb-5">
              <h1 className="text-lg sm:text-xl md:text-xl uppercase text-center font-medium tracking-[3px]">
                Featured Category
              </h1>
              <p className="text-base text-center">
                Get Your Desired Product from Featured Category!
              </p>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 items-stretch">
                <div className="features_category universal_column">
                    <span className="features_icon"><IoCamera /></span>
                    <p className="features_p">Camera</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><FaMobileAlt /></span>
                    <p className="features_p">Mobile Accessories</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><GiSchoolBag /></span>
                    <p className="features_p">Bag</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><GiBatteryPack /></span>
                    <p className="features_p">Power Bank</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><IoGameController /></span>
                    <p className="features_p">Gaming</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><LuProjector /></span>
                    <p className="features_p">Mini Projector</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><FaComputer /></span>
                    <p className="features_p">Computer Accessories</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><GiRobotGolem /></span>
                    <p className="features_p">Robotics Accessories</p>
                </div>
                {/* second row */}
                <div className="features_category universal_column">
                    <span className="features_icon"><BsFillLampFill /></span>
                    <p className="features_p">Table Lamp</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><GiUmbrella /></span>
                    <p className="features_p">Umbrella</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><GiCurvyKnife /></span>
                    <p className="features_p">Knife</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><GiFlowerPot /></span>
                    <p className="features_p">beauty products</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><BsUsbDriveFill /></span>
                    <p className="features_p">Flash Drive</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><GiBearFace /></span>
                    <p className="features_p">Car Toy</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><MdSpeaker /></span>
                    <p className="features_p">Mini Sound Box</p>
                </div>
                <div className="features_category universal_column">
                    <span className="features_icon"><ImPrinter /></span>
                    <p className="features_p">Mini printer</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
