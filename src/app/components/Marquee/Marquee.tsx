"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

interface Product {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

export default function ProductMarquee() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products",
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    }

    fetchProducts();
  }, []);

  if (!products.length) return null;

  return (
    <div className="border-y border-gray-200 bg-white py-2">
      {" "}
      <Marquee speed={9050} pauseOnHover>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 text-xs"
          >
            {" "}
            <span>{product.categoryIcon}</span>
            <span className="font-medium text-gray-700">{product.nameBn}</span>
            <span className="font-semibold text-gray-900">
              ৳ {product.today} টাকা/
              {product.unit === "kg" ? "কেজি" : product.unit}
            </span>
            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-red-600"
                  : "font-semibold text-green-600"
              }
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {Math.abs(product.change.pct).toFixed(1)}%
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
