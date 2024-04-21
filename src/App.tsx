import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from './components/header/Header';
import { useUser } from "./context/user-context";
import { AdminPage } from "./pages/admin-page/AdminPage";
import { Contact } from "./pages/contact/Contact";
import { CreateProductPage } from "./pages/create-product/CreateProduct";
import { Home } from './pages/home/Home';
import { Login } from "./pages/login/Login";
import { ProcessOrder } from "./pages/process-order/ProcessOrder";
import { ProductDetail } from "./pages/product-detail/ProductDetail";
import { ProductList } from './pages/products-list/ProductList';
import { SignUp } from "./pages/sign-up/SignUp";
import { UserDetail } from "./pages/user-detail/UserDetail";

import { RolEnum } from "./common/types/user";
import ContentContainer from "./components/container-body/ContainerBody";
import { DeleteProduct } from "./pages/delete-product/DeleteProduct";
import { ForgotPassword } from "./pages/forgot-password/ForgotPassword";
import { OrderDetail } from "./pages/order-detail/OrderDetail";
import { OrderList } from "./pages/order-list/OrderList";
import { Routes as RoutesEnum } from './router/routes';

function App() {
  const { user } = useUser();

  return (
    <>
      <BrowserRouter>
        <Header />
        <ContentContainer>
          <Routes>
            <Route path={RoutesEnum.HOME_PAGE} element={<Home />} />
            <Route path={`${RoutesEnum.PRODUCTS_PAGE}/:productType?`} element={<ProductList />} />
            <Route path={`${RoutesEnum.PRODUCT_DETAIL_PAGE}/:id`} element={<ProductDetail />} />
            <Route path={RoutesEnum.CONTACT_PAGE} element={<Contact />} />
            <Route path={RoutesEnum.LOGIN_PAGE} element={user !== null ? <Navigate to={RoutesEnum.USER_DETAIL_PAGE} /> : <Login />} />
            <Route path={RoutesEnum.SIGN_UP_PAGE} element={<SignUp />} />
            <Route path={RoutesEnum.USER_DETAIL_PAGE} element={<UserDetail />} />
            <Route path={RoutesEnum.ADMIN_PAGE} element={<AdminPage />} />
            <Route path={`${RoutesEnum.CREATE_PRODUCT}/:id?`} element={<CreateProductPage />} />
            <Route path={RoutesEnum.PROCESS_ORDER_PAGE} element={user === null ? <Navigate to={RoutesEnum.LOGIN_PAGE} /> : <ProcessOrder />} />
            <Route path={RoutesEnum.ORDERS_LIST} element={<OrderList />} />
            <Route path={`${RoutesEnum.ORDER_DETAIL_PAGE}/:id?`} element={<OrderDetail />} />
            <Route path={RoutesEnum.FORGOT_PASSWORD} element={user !== null ? <Navigate to={RoutesEnum.USER_DETAIL_PAGE} /> : <ForgotPassword />} />
            <Route path={RoutesEnum.DELETE_PRODUCTS} element={user?.rol !== RolEnum.ADMIN ? <Navigate to={RoutesEnum.HOME_PAGE} /> : <DeleteProduct />} />
          </Routes>
        </ContentContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
