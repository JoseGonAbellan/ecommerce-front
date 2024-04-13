import { NavigateFunction, useNavigate } from "react-router-dom";
import { Routes } from "./routes";

export interface CustomRouter {
    navigate: NavigateFunction;
    goHomePage: () => void;
    goProductsPage: () => void;
    goProductDetailPage: (id: number) => void;
}

export const useCustomRouter= (): CustomRouter => {
    const navigate= useNavigate();
    return {
        navigate,
        goHomePage(){
            return navigate(Routes.HOME_PAGE)
        },
        goProductsPage(){
            return navigate(Routes.PRODUCTS_PAGE)
        },
         goProductDetailPage(id: number){
            return navigate(`${Routes.PRODUCT_DETAIL_PAGE}/${id}`)
        }

    }
}