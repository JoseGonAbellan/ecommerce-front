import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../common/types/product";

interface ProductOrder {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  productsOrders: ProductOrder[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;

  removeAllFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsOrders, setProductsOrders] = useState<ProductOrder[]>(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart.products)) {
        return parsedCart.products.map((product: Product) => ({
          id: product.productID,
          name: product.productName,
          price: product.price,
          quantity: 1,
        }));
      }
    }
    return [];
  });

  const addToCart = (product: Product) => {
    setProductsOrders((prevProductsOrders) => {
      const productIndex = prevProductsOrders.findIndex((p) => p.id === product.productID);
      if (productIndex !== -1) {
        const updatedProductsOrders = [...prevProductsOrders];
        updatedProductsOrders[productIndex].quantity += 1;
        return updatedProductsOrders;
      } else {
        const newProductOrder: ProductOrder = {
          id: product.productID,
          name: product.productName,
          price: product.price,
          quantity: 1,
        };
        return [...prevProductsOrders, newProductOrder];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setProductsOrders((prevProductsOrders) => {
      const productIndex = prevProductsOrders.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const updatedProductsOrders = [...prevProductsOrders];
        if (updatedProductsOrders[productIndex].quantity > 1) {
          updatedProductsOrders[productIndex].quantity -= 1;
        } else {
          updatedProductsOrders.splice(productIndex, 1);
        }
        return updatedProductsOrders;
      } else {
        return prevProductsOrders;
      }
    });
  };

  const removeAllFromCart = (productId: number) => {
    setProductsOrders((prevProductsOrders) => {
      return prevProductsOrders.filter((p) => p.id !== productId);
    });
  };

  const clearCart = () => {
    setProductsOrders([]); 
  };


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ products: productsOrders }));
  }, [productsOrders]);

  return (
    <CartContext.Provider value={{ productsOrders, addToCart, removeFromCart, removeAllFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
