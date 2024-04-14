import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { ProductList } from './pages/products-list/ProductList';
import { Routes as RoutesEnum } from './router/routes';
import { ProductDetail } from "./pages/product-detail/ProductDetail";
import { Contact } from "./pages/contact/Contact";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/sign-up/SignUp";
import { UserDetail } from "./pages/user-detail/UserDetail";
import { useUser } from "./context/user-context";

function App() {
  const {user} = useUser();
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path={RoutesEnum.HOME_PAGE} element={<Home />}/>
    <Route path={`${RoutesEnum.PRODUCTS_PAGE}/:productType?`} element={<ProductList />}/>
    <Route path={`${RoutesEnum.PRODUCT_DETAIL_PAGE}/:id`} element={<ProductDetail />}/>
    <Route path={RoutesEnum.CONTACT_PAGE} element={<Contact />}/>
    <Route path={ RoutesEnum.LOGIN_PAGE} element={user ? <Navigate to={RoutesEnum.USER_DETAIL_PAGE} />:<Login />}/>
    <Route path={RoutesEnum.SIGN_UP_PAGE} element={<SignUp />}/>
    <Route path={RoutesEnum.USER_DETAIL_PAGE} element={<UserDetail />}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
