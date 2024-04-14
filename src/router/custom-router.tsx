import { NavigateFunction, useNavigate } from "react-router-dom";
import { Routes } from "./routes";
import { ProductType } from "../common/types/product";

export interface CustomRouter {
    navigate: NavigateFunction;
    goHomePage: () => void;
    goProductsPage: (productType?: ProductType) => void;
    goProductDetailPage: (id: number) => void;
    goContactPage: () => void;
    goLoginPage: () => void;
    goSignUpPage: () => void;
    goUserDetailPage: () => void;
}

export const useCustomRouter= (): CustomRouter => {
    const navigate= useNavigate();
    return {
        navigate,
        goHomePage(){
            return navigate(Routes.HOME_PAGE)
        },
        goProductsPage(productType?: ProductType){
            if(productType){
                return navigate(`${Routes.PRODUCTS_PAGE}/${productType}`)
            } else{
                return navigate(Routes.PRODUCTS_PAGE)
            }
        },
         goProductDetailPage(id: number){
            return navigate(`${Routes.PRODUCT_DETAIL_PAGE}/${id}`)
        },
        goContactPage(){
            return navigate(Routes.CONTACT_PAGE)
        },
        goLoginPage(){
            return navigate(Routes.LOGIN_PAGE)
        },
        goSignUpPage(){
            return navigate(Routes.SIGN_UP_PAGE)
        },
        goUserDetailPage(){
            return navigate(Routes.USER_DETAIL_PAGE)
        }

    }
}