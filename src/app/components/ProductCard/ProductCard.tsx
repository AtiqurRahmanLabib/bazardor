import Link from "next/link";

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

  change: {
    dir: "up" | "down";
    pct: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
      <Link href={`/productDetails/${product.id}`}>
        <div className="w-[362.66px] h-[138px] rounded-[16px] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[12px] bg-[#F4F7F4] flex items-center justify-center text-2xl">
              {product.image}
            </div>

            <div>
              <h2 className="text-[16px] text-[#1D271F]">{product.nameBn}</h2>

              <p className="text-[13px] text-[#1D271F]/70">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <p className="text-[12px] text-[#1D271F]">আজকের দাম</p>

              <p className="text-[18px] font-semibold text-[#1D271F]">
                {product.today} টাকা
              </p>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                product.change.dir === "up"
                  ? "bg-[#F0F7F1] text-[#D93636]"
                  : "bg-[#F0F7F1] text-green-600"
              }`}
            >
              {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
