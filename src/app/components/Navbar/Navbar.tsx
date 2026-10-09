const Navbar = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { cache: "force-cache" },
  );

  const data = await res.json();

  return (
    <nav className=" border-[#F0F5F0] border-t border-b p-2 items-center">
      <div className="max-w-6xl mx-auto mt-2 flex items-center gap-6">
        {data.map(
          (category: {
            id: string;
            slug: string;
            nameBn: string;
            icon: string;
          }) => (
            <div key={category.id}>
              <span>{category.icon}</span> <span>{category.nameBn}</span>
            </div>
          ),
        )}
      </div>
    </nav>
  );
};

export default Navbar;
