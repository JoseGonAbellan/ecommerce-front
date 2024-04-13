import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { ProductList } from './pages/products-list/ProductList';
import { Routes as RoutesEnum } from './router/routes';
import { ProductDetail } from "./pages/product-detail/ProductDetail";
import { Contact } from "./pages/contact/Contact";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path={RoutesEnum.HOME_PAGE} element={<Home />}/>
    <Route path={`${RoutesEnum.PRODUCTS_PAGE}/:productType?`} element={<ProductList />}/>
    <Route path={`${RoutesEnum.PRODUCT_DETAIL_PAGE}/:id`} element={<ProductDetail />}/>
    <Route path={RoutesEnum.CONTACT_PAGE} element={<Contact />}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
