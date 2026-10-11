
import { Suspense } from "react";
import { connection } from "next/server";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
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
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: Market[];
}

const bnNumber = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const bnPrice = (value: number) => `${bnNumber(value)} টাকা`;

const unitNames: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  g: "গ্রাম",
  gram: "গ্রাম",
  liter: "লিটার",
  litre: "লিটার",
  piece: "টি",
  pcs: "টি",
  dozen: "ডজন",
  maund: "মণ",
};

function getUnit(unit: string) {
  return unitNames[unit.toLowerCase()] ?? unit;
}

async function ProductContent({
  params,
}: {
  params: Promise<{ productDetailsId: string }>;
}) {
  // Render this route at request time instead of prerendering it.
  await connection();

  const { productDetailsId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productDetailsId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  const product: Product = await res.json();

  const markets = product.markets ?? [];
  const unit = getUnit(product.unit);

  const lowestPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const highestPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0,
      ) / markets.length
    : product.today;

  const changeColor =
    product.change.dir === "up"
      ? "text-red-500"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "●";

  const changeText =
    product.change.dir === "up"
      ? "দাম বেড়েছে"
      : product.change.dir === "down"
        ? "দাম কমেছে"
        : "দাম অপরিবর্তিত";

  return (
    <div className="min-h-screen bg-[#F0F5F0] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#647067]">
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="font-medium text-[#1D271F]">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#E1E9E1] bg-white p-5 md:flex-row md:items-center md:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-[#1D271F] md:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-[#647067]">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className={`mt-2 text-xs font-medium ${changeColor}`}>
                {changeText} · {bnNumber(product.change.pct)}%
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-[#647067] bg-[#F0F5F0] px-5 py-3 text-center">
            <p className="text-[11px] text-[#647067]">
              আজকের দাম
            </p>

            <p className="text-2xl font-bold text-[#1D271F]">
              {bnNumber(product.today)}
            </p>

            <p className="text-[11px] text-[#647067]">
              টাকা / {unit}
            </p>

            <p className={`mt-1 text-[10px] font-semibold ${changeColor}`}>
              {changeIcon} {bnNumber(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-xl border border-[#E1E9E1] bg-white p-4 md:p-5">
          <h2 className="mb-3 text-sm font-bold text-[#1D271F]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E1E9E1] p-4">
              <p className="text-xs text-[#647067]">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-lg font-bold text-green-600">
                {bnPrice(lowestPrice)}
              </p>

              <p className="mt-1 text-[10px] text-[#647067]">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-xl border border-[#E1E9E1] p-4">
              <p className="text-xs text-[#647067]">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-lg font-bold text-red-500">
                {bnPrice(highestPrice)}
              </p>

              <p className="mt-1 text-[10px] text-[#647067]">
                বাজারগুলোর মধ্যে সর্বাধিক
              </p>
            </div>

            <div className="rounded-xl border border-[#E1E9E1] p-4">
              <p className="text-xs text-[#647067]">
                গড় দাম
              </p>

              <p className="mt-1 text-lg font-bold text-green-600">
                {bnPrice(averagePrice)}
              </p>

              <p className="mt-1 text-[10px] text-[#647067]">
                বাজারগুলোর গড় দামের ভিত্তিতে
              </p>
            </div>
          </div>

          {/* Market Prices */}
          <div className="mt-5">
            <h2 className="mb-3 text-sm font-bold text-[#1D271F]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-[#E1E9E1]">
              <table className="w-full min-w-[620px] border-collapse text-left text-xs">
                <thead className="bg-[#F7F9F7] text-[#647067]">
                  <tr>
                    <th className="px-3 py-3 font-medium">বাজার</th>
                    <th className="px-3 py-3 font-medium">বিভাগ</th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="px-3 py-3 text-right font-medium">
                      সর্বাধিক
                    </th>
                    <th className="px-3 py-3 text-right font-medium">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody className="text-[#364139]">
                  {markets.map((market, index) => {
                    const marketAverage =
                      (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${market.division}`}
                        className={`border-t border-[#DDE5DD] ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-[#F0F5F0]"
                        }`}
                      >
                        <td className="px-3 py-3 font-medium">
                          {market.market}
                        </td>

                        <td className="px-3 py-3">
                          {market.division}
                        </td>

                        <td className="px-3 py-3 text-right">
                          {bnPrice(market.min)}
                        </td>

                        <td className="px-3 py-3 text-right">
                          {bnPrice(market.max)}
                        </td>

                        <td className="px-3 py-3 text-right font-semibold">
                          {bnPrice(marketAverage)}
                        </td>
                      </tr>
                    );
                  })}

                  {markets.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-3 py-8 text-center text-[#647067]"
                      >
                        বাজারের কোনো তথ্য পাওয়া যায়নি
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ productDetailsId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <p className="py-10 text-center text-sm text-[#647067]">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
