import AllProductsPage from "./all-products/page";
import Banner from "./components/Banner/Banner";
import TopDecreasedPage from "./components/TopDecreasedPage/TopDecreasedPage";
import TopIncreasedPage from "./components/TopIncreasedPage/TopIncreasedPage";


export default function Home() {
  return (
    <main className=" min-h-screen">
      <div>
        <Banner></Banner>
        <TopIncreasedPage></TopIncreasedPage>
        <TopDecreasedPage></TopDecreasedPage>
        <AllProductsPage></AllProductsPage>
      </div>
    </main>
  );
}
