import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { ProductList } from './pages/products-list/ProductList';
import { Routes as RoutesEnum } from './router/routes';
import { ProductDetail } from "./pages/product-detail/ProductDetail";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path={RoutesEnum.HOME_PAGE} element={<Home />}/>
    <Route path={RoutesEnum.PRODUCTS_PAGE} element={<ProductList />}/>
    <Route path={`${RoutesEnum.PRODUCT_DETAIL_PAGE}/:id`} element={<ProductDetail />}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
