import AllProductsPage from "./all-products/page";
import Banner from "./components/Banner/Banner";


export default function Home() {
  return (
    <main className="bg-[#E1E8E1]/40 min-h-screen border">
      <div>
        <Banner></Banner>
        <AllProductsPage></AllProductsPage>
      </div>
    </main>
  );
}
