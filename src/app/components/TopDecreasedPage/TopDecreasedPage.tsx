import ProductCard, { Product } from "../ProductCard/ProductCard";

const TopDecreasedPage = async () => {
  "use cache";

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  const decreasedProducts = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="pb-10 mt-10">
      <div className="max-w-6xl mx-auto pt-5">
        <h1 className="text-[#1D271F] text-[20px] font-bold">
          আজ দাম কমেছে
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mt-10">
          {decreasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDecreasedPage;