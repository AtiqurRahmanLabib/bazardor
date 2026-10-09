import Logo from "../../../../public/Stack.png";

import Image from "next/image";
import CurrentDate from "../Time/Time";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-6xl h-17 m-auto flex items-center justify-between">
      {/* Logo + Name + Date */}
      <div className="flex gap-5 items-center">
        {/* logo */}
        <div className="w-10 h-10">
          <Image className="w-full h-full" src={Logo} width={700} quality={50} alt="logo"></Image>
        </div>

        {/* Name & Date */}
        <div>
          <p>বাজার দর</p>

          <p>
            <CurrentDate></CurrentDate>
          </p>
        </div>
      </div>

      {/* Sign In & Sign Up */}
      <div className="flex gap-5">
        <button className="w-[92.4px] h-10 text-[#1D271F] rounded-lg text-[14px] font-semibold">
          সাইন ইন
        </button>

        <Link href='/sign-up'>
        <button className="w-[92.4px] h-10 text-white bg-[#05893E] rounded-lg text-[14px] font-semibold">
          সাইন আপ
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
