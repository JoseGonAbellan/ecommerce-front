export enum ProductType{
    BOARD_GAMES= "Juegos de mesa",
    ROLE_GAMES= "Juegos de rol",
    CARD_GAMES= "Juegos de cartas",
    MERCHANDISING= "Merchandising"
}
export type Product = {
    productID: number;
    productName: string;
    productDescription: string;
    price: number;
    stock: number;
    productImageURL: string;
    productType: ProductType;
};

export type SimpleProduct = Pick<Product, 'productID' | 'productName' | 'productImageURL' | 'price'>;