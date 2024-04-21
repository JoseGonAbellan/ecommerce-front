
import { useEffect, useRef } from "react";
import { useCart } from "../../context/shopping-cart.context";
import { useCustomRouter } from "../../router/custom-router";
import styles from "./shoppingCart.module.css";

interface CartMenuProps {
  open: boolean;
  onClose: () => void;
};
export const ShoppingCart: React.FC<CartMenuProps> = ({ open, onClose }) => {

  const { productsOrders, removeFromCart } = useCart();
  const { goProcessOrder } = useCustomRouter();

  // Cerrar el Menú del carrito cuando se hace click en cualquier otro sitio de la página. 

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Función para cerrar el menú si se hace clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // Se añade el evento manejador de clikc cuando el menú está abierto
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Eliminar el manejador de clic cuando el menú se cierra
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpiar el manejador de clic cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  useEffect(() => {
    console.log('El carrito ha cambiado:', productsOrders);
  }, [productsOrders]);



  return (
    <div className={open ? styles.menu : styles.menuHidden} ref={menuRef}>
      <h2>Tu carrito</h2>
      {productsOrders.length === 0 ? (<p>No has añadido nada al carrito</p>) : (
        <div>
          <ul>
            {productsOrders.length !== 0 && productsOrders.map((product) => (
              <li key={product.id}>
                {product.name} - x {product.quantity}
                <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={goProcessOrder}>Realizar el pedido</button>
        </div>
      )}

    </div>
  )

}