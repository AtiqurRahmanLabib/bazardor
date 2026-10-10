import ProductCard, { Product } from "../ProductCard/ProductCard";

const TopIncreasedPage = async () => {
  "use cache";

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  const increasedProducts = data
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="pb-10 mt-10">
      <div className="max-w-6xl mx-auto pt-5">
        <h1 className="text-[#1D271F] text-[20px] font-bold">আজ দাম বেড়েছে</h1>

        <div className="grid grid-cols-3 gap-5 max-w-6xl mx-auto mt-10">
          {increasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopIncreasedPage;
