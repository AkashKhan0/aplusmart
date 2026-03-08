import Link from "next/link";
import { BsFillHandbagFill, BsFillLampFill } from "react-icons/bs";
import { GiDeskLamp, GiFlowerPot, GiReturnArrow } from "react-icons/gi";
import { SiFoodpanda } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";
import { MdOutlineElectricalServices } from "react-icons/md";
import { MdOutlineAddHomeWork } from "react-icons/md";

export default function Underhero() {
  // 🔥 feature categories data
  const categories = [
    {
      value: "Accessories",
      label: "Accessories",
      icon: <LuPackagePlus />,
    },
    { value: "Bags", label: "Women’s Bag", icon: <BsFillHandbagFill /> },
    { value: "Table Lamp", label: "Table Lamp", icon: <BsFillLampFill /> },
    {
      value: "Gadgets",
      label: "Gadgets",
      icon: <MdOutlineElectricalServices />,
    },
    {
      value: "Smart home",
      label: "Smart home",
      icon: <MdOutlineAddHomeWork />,
    },
    {
      value: "Beauty & Care",
      label: "beauty products",
      icon: <GiFlowerPot />,
    },
    {
      value: "Interior Lights",
      label: "Interior Lights",
      icon: <GiDeskLamp />,
    },
    { value: "Jewelry", label: "Jewelry", image: "/images/jewelry.png" },
    {
      value: "Sports",
      label: "Kids Toys",
      icon: <SiFoodpanda />,
    },
    {
      value: "Music",
      label: "Music",
      image: "/images/music.png",
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
                  <Link href="/privacy-policy">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <span className="point_icon">
                        <MdOutlinePrivacyTip />
                      </span>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="point_h1">Privacy Policy</h1>
                        <p className="point_p">Your privacy matters.</p>
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

            <div className="w-fit grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3 items-stretch">
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
