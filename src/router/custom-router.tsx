import { NavigateFunction, useNavigate } from "react-router-dom";
import { ProductType } from "../common/types/product";
import { Routes } from "./routes";

export interface CustomRouter {
    navigate: NavigateFunction;
    goHomePage: () => void;
    goProductsPage: (productType?: ProductType) => void;
    goProductDetailPage: (id: number) => void;
    goContactPage: () => void;
    goLoginPage: () => void;
    goSignUpPage: () => void;
    goUserDetailPage: () => void;
    goAdminPage: () => void;
    goCreateProduct: (id?: number) => void;
    goProcessOrder: () => void;
    goOrderDetail: (id: number) => void;

    goOrderList: () => void;
    goForgotPassword: () => void;

    goAdminProducts: () => void;
}

export const useCustomRouter = (): CustomRouter => {
    const navigate = useNavigate();
    return {
        navigate,
        goHomePage() {
            return navigate(Routes.HOME_PAGE)
        },
        goProductsPage(productType?: ProductType) {
            if (productType) {
                return navigate(`${Routes.PRODUCTS_PAGE}/${productType}`)
            } else {
                return navigate(Routes.PRODUCTS_PAGE)
            }
        },
        goProductDetailPage(id: number) {
            return navigate(`${Routes.PRODUCT_DETAIL_PAGE}/${id}`)
        },
        goContactPage() {
            return navigate(Routes.CONTACT_PAGE)
        },
        goLoginPage() {
            return navigate(Routes.LOGIN_PAGE)
        },
        goSignUpPage() {
            return navigate(Routes.SIGN_UP_PAGE)
        },
        goUserDetailPage() {
            return navigate(Routes.USER_DETAIL_PAGE)
        },
        goAdminPage() {
            return navigate(Routes.ADMIN_PAGE)
        },
        goCreateProduct(id?: number) {
            if (id) {
                return navigate(`${Routes.CREATE_PRODUCT}/${id}`)
            } else {
                return navigate(Routes.CREATE_PRODUCT)
            }
        },
        goProcessOrder() {
            return navigate(Routes.PROCESS_ORDER_PAGE)
        },
        goOrderDetail(id: number) {
            return navigate(`${Routes.ORDER_DETAIL_PAGE}/${id}`)
        },
        goOrderList() {
            return navigate(Routes.ORDERS_LIST)
        },
        goForgotPassword() {
            return navigate(Routes.FORGOT_PASSWORD)
        },
        goAdminProducts() {
            return navigate(Routes.PRODUCT_ADMIN_LIST)
        },
    }
}