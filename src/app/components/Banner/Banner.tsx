import Image from "next/image";
import CurrentDate from "../Time/Time";
import BannerLogo from "../../../../public/bazar-hero.png";

const Banner = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-0">
      <div
        className="
          max-w-6xl mx-auto
          mt-6 sm:mt-8 lg:mt-10
          bg-white
          w-full
          min-h-[283px]
          p-5 sm:p-7 lg:p-9
          rounded-2xl sm:rounded-3xl lg:rounded-4xl
          flex flex-col lg:flex-row
          items-center
          justify-between
          gap-8 lg:gap-10
          overflow-hidden
        "
      >
        {/* Left Content */}
        <div className="w-full lg:w-[58%]">
          {/* Date */}
          <p
            className="
              text-[#05893E]
              font-medium
              text-[12px] sm:text-[13px] lg:text-[14px]
              w-fit
              min-w-[170px] sm:min-w-[190px] lg:min-w-[200px]
              px-4
              h-[30px]
              rounded-2xl
              bg-[#05893E]/10
              flex items-center justify-center
            "
          >
            <CurrentDate />
          </p>

          {/* Heading */}
          <h1
            className="
              text-[#1D271F]
              font-bold
              text-[26px]
              sm:text-[30px]
              lg:text-[36px]
              leading-tight
              mt-3
              max-w-[600px]
            "
          >
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p
            className="
              text-[#1D271F]/70
              text-[13px]
              sm:text-[14px]
              lg:text-[16px]
              leading-6
              mt-3
              max-w-[650px]
            "
          >
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <button
            className="
              mt-5
              bg-[#05893E]
              hover:bg-[#047536]
              hover:shadow-md
              hover:-translate-y-0.5
              active:scale-95
              transition-all
              duration-200
              rounded-lg
              w-[130px]
              sm:w-[140px]
              h-10
              text-white
              text-sm
              font-medium
              cursor-pointer
            "
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div
          className="
            w-full
            lg:w-[42%]
            flex
            justify-center
            lg:justify-end
            items-center
          "
        >
          <Image
            className="
              w-[220px]
              sm:w-[260px]
              md:w-[300px]
              lg:w-[315px]
              h-auto
              object-contain
            "
            src={BannerLogo}
            width={315}
            height={263}
            priority
            alt="বাজার দর"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
