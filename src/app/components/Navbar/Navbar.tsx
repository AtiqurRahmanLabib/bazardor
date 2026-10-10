import Link from "next/link";

const Navbar = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "force-cache",
    },
  );

  const data = await res.json();

  return (
    <nav className="w-full border-t border-b border-[#F0F5F0] bg-white">
      <div
        className="
          max-w-6xl mx-auto
          px-3 sm:px-4 lg:px-0
          overflow-x-auto
          scrollbar-hide
        "
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5 py-2 min-w-max">
          {data.map(
            (category: {
              id: string;
              slug: string;
              nameBn: string;
              icon: string;
            }) => (
             <Link href={`/Category/${category.slug}`} key={category.id}>
                <button
                  className="
                  flex items-center gap-1.5
                  px-3 sm:px-4
                  py-2
                  rounded-lg
                  whitespace-nowrap
                  text-[#1D271F]
                  font-semibold
                  text-[11px] sm:text-[12px] md:text-[13px]

                  hover:bg-[#F0FAF4]
                  hover:text-[#05893E]

                  active:scale-95

                  transition-all
                  duration-200
                  cursor-pointer
                "
                >
                  <span className="text-sm sm:text-base">{category.icon}</span>

                  <span>{category.nameBn}</span>
                </button>
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
