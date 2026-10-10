import ProductCard from "../components/ProductCard/ProductCard";
interface Change {
  dir: "up" | "down";
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
}

const AllProductsPage = async () => {
  "use cache";

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();


  return (
    <div className="">
      <div className="max-w-6xl mx-auto mt-5">
        <h1 className="text-[#1D271F] text-[20px] font-bold">সব পণ্য</h1>

        <p className="text-[#1D271F]/70 text-[14px]">
          মোট {data.length}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-3 gap-5 max-w-6xl mx-auto mt-10">
          {data.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
