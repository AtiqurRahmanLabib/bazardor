"use client";

import Logo from "../../../../public/Stack.png";
import Image from "next/image";
import CurrentDate from "../Time/Time";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="w-full max-w-6xl mx-auto h-auto min-h-17 px-4 sm:px-6 lg:px-0 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#05893E] rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
              <Image
                className="w-full h-full object-cover"
                src={Logo}
                width={700}
                quality={50}
                alt="বাজার দর logo"
              />
            </div>

            <div className="min-w-0">
              <p className="text-[#1D271F] font-bold text-[16px] sm:text-[18px] md:text-[20px] leading-tight">
                বাজার দর
              </p>

              <p className="text-[#1D271F] text-[9px] sm:text-[11px] md:text-[12px] mt-0.5 whitespace-nowrap">
                <CurrentDate />
              </p>
            </div>
          </div>
        </Link>

        {user ? (
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer rounded-lg px-1.5 sm:px-2 py-1.5 transition-all duration-200 hover:bg-gray-50 active:scale-95"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#05893E] text-white flex items-center justify-center font-semibold text-xs sm:text-sm shrink-0">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <span className="hidden sm:block text-[13px] md:text-[15px] text-[#303530] max-w-[120px] truncate">
                {user.name}
              </span>

              <span
                className={`text-gray-500 text-[9px] sm:text-xs transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="absolute right-0 top-12 sm:top-13 w-[230px] sm:w-[255px] bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden">
                <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4">
                  <p className="font-semibold text-[#8b918d] text-[14px] sm:text-[15px] truncate">
                    {user.name}
                  </p>

                  <p className="text-[12px] sm:text-[13px] text-gray-400 mt-1 truncate">
                    {user.email}
                  </p>
                </div>

                <div className="border-t border-gray-100"></div>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 sm:px-5 py-3 text-[14px] sm:text-[15px] text-[#303530] hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-blue-600 text-lg">👤</span>
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 sm:px-5 py-3 text-[14px] sm:text-[15px] text-[#e55353] hover:bg-red-50 transition-colors duration-200"
                >
                  <span>↪</span>
                  <span>সাইন আউট</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-5 shrink-0">
            <Link href="/sign-in">
              <button
                className="
                  w-[72px] sm:w-[82px] md:w-[92.4px]
                  h-9 sm:h-10
                  text-[#1D271F]
                  rounded-lg
                  text-[11px] sm:text-[13px] md:text-[14px]
                  font-semibold
                  border border-transparent
                  hover:border-[#05893E]
                  hover:text-[#05893E]
                  hover:bg-[#f0faf4]
                  active:scale-95
                  transition-all duration-200
                  cursor-pointer
                "
              >
                সাইন ইন
              </button>
            </Link>

            <Link href="/sign-up">
              <button
                className="
                  w-[72px] sm:w-[82px] md:w-[92.4px]
                  h-9 sm:h-10
                  text-white
                  bg-[#05893E]
                  rounded-lg
                  text-[11px] sm:text-[13px] md:text-[14px]
                  font-semibold
                  hover:bg-[#047536]
                  hover:shadow-md
                  hover:-translate-y-0.5
                  active:scale-95
                  transition-all duration-200
                  cursor-pointer
                "
              >
                সাইন আপ
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
