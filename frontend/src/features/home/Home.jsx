
import ProductList from "../products/ProductList";
import SearchInput from "../search/SearchInput";

export default function Home() {


  return (
    <div className="p-5 ">

      <SearchInput isHome={true} />

      <ProductList />

    </div>
  )
}
