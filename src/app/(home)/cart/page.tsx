"use client";

import CartTable from "@/components/layout/Home/Cart/CartTable/CartTable";
import { CartBreadcrumb } from "./CartBreadcrumb/CartBreadcrumb";
import CartCard from "@/components/layout/Home/Cart/CartCard/CartCard";
import { useEffect, useState } from "react";
import { baseApi } from "@/redux/api/baseApi";

export default function ShopCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartData = async () => {
      const storedCart = JSON.parse(
        localStorage.getItem("ponnoBariCart") || "[]"
      );

      const responses: any = await Promise.all(
        storedCart.map(async (item: { product: string; quantity: number }) => {
          const res = await fetch(`${baseApi}/product/${item.product}`);
          const data = await res.json();

          return { ...data, quantity: item.quantity };
        })
      );

      setCartProducts(responses);
      setLoading(false);
    };

    loadCartData();
  }, []);

  return (
    <div>
      <CartBreadcrumb />
      <div className="px-[5%] bg-white">
        <div className="flex flex-col lg:flex-row gap-5 pt-10 pb-20 max-w-screen-xl mx-auto">
          <CartTable
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            loading={loading}
          />
          <CartCard
            cartProducts={cartProducts}
            loading={loading}
            setCartProducts={setCartProducts}
          />
        </div>
      </div>
    </div>
  );
}
