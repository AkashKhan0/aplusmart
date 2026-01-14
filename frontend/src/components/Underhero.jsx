
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";

export default function Underhero() {
  return (
    <div className="w-full universal_column py-5 mt-10">
      <div className="fixed_width px-5">
        {/* empty space under hero for universal nav spacing */}
        <div className="w-full h-auto flex flex-col sm:flex-row md:flex-row items-center justify-center gap-5">
            <Link href="/online-delivery" className="w-full max-w-[250px] duration-300">
            <div className="points">
                <span className="point_icon"><TbTruckDelivery /></span>
                <div className="">
                    <h1 className="point_h1">Online Delivery</h1>
                    <p className="point_p">From store to you.</p>
                </div>
            </div>
            </Link>
            <Link href="/star-point-policy"  className="w-full max-w-[250px]">
            <div className="points">
                <span className="point_icon"><BsStars /></span>
                <div className="">
                    <h1 className="point_h1">Star Point Policy</h1>
                    <p className="point_p">Earn points easily.</p>
                </div>
            </div>
            </Link>
            <Link href="/return&refund-policy"  className="w-full max-w-[250px]">
            <div className="points">
                <span className="point_icon"><GiReturnArrow /></span>
                <div className="">
                    <h1 className="point_h1">Return & Refund Policy</h1>
                    <p className="point_p">Return with confidence.</p>
                </div>
            </div>
            </Link>
        </div>
      </div>
    </div>
  );
}