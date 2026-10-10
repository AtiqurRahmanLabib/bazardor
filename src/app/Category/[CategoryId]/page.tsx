import ProductCard from "@/app/components/ProductCard/ProductCard";
import { Suspense } from "react";

type Product = {
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

  change: {
    dir: "up" | "down";
    pct: number;
  };
};

async function CategoryContent({
  params,
}: {
  params: Promise<{ CategoryId: string }>;
}) {
  const { CategoryId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${CategoryId}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();
  const categoryName = data[0]?.categoryNameBn ?? "পণ্য";
  const categoryIcon = data[0]?.categoryIcon;

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white max-w-6xl h-[94px] rounded-[16px] mx-auto p-5 mt-5">
        <div className=" flex items-center gap-5">
          <div className="w-[36px] h-[40px] items-center">
            <h1 className="text-[26px] text-center">{categoryIcon}</h1>
          </div>

          <div>
            <h1 className="text-[24px] font-bold text-[#1D271F]">
              {categoryName}
            </h1>
            <p className="text-[#1D271F]/70 text-[14px]">
              {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 mx-auto gap-5 max-w-6xl mt-10">
        {data.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}

const CategoryPage = ({
  params,
}: {
  params: Promise<{ CategoryId: string }>;
}) => {
  return (
    <Suspense fallback={<p className="p-4">Loading...</p>}>
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default CategoryPage;
