import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, ProductType } from "../../common/types/product";
import { ProductPreview } from "../../components/product-preview/ProductPreview";
import { getAllProducts } from "../../services/product-service";
import styles from "./productList.module.css";


export const ProductList = () => {
  const { productType } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<ProductType | null>(productType ? productType as unknown as ProductType : null);
  const [price, setPrice] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [existNextPage, setExistNextPage] = useState<boolean>(true);

  const handleCategoryType = (ev: any, type: ProductType) => {
    if (ev.target.checked) {
      setCategory(type)
    } else {
      setCategory(null)
    }
  };

  const handleNextPage = () => {
    if (existNextPage) {
      setCurrentPage(currentPage + 1)
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  };

  useEffect(() => {
    getAllProducts({ pageSize: 10, productName: name, productType: category, price: price }).then((response) => {
      setProducts(response)
    });
  }, [name, category, price]);

  useEffect(() => {
    getAllProducts({ pageSize: 10, productName: name, productType: category, price: price, page: currentPage }).then((response) => {
      if (response.length !== 0) {
        setProducts(response)
        setExistNextPage(true)
      } else {
        setExistNextPage(false)
      }
    });
  }, [currentPage]);

  return (
    <div className={styles.productsArea}>
      <h1 className={styles.titleProducts}>Productos</h1>
      <div className={styles.productsWithFilter}>
        <div className={styles.productsFilter}>
          <form action="" className={styles.form}>
            <label htmlFor="name" className={styles.filterTitles}>Nombre</label>
            <input type="text" id="name" name="name" value={name} onChange={(ev) => setName(ev.target.value)} />
            <label className={styles.filterTitles}>Categoría</label>
            <div className={styles.radioButtonsContainer}>
              <input className={styles.radioInput} type="checkbox" id="category" name="category" checked={category === ProductType.BOARD_GAMES} onChange={(ev) => handleCategoryType(ev, ProductType.BOARD_GAMES)} />
              <label htmlFor="category">Juegos de mesa</label>
            </div>
            <div className={styles.radioButtonsContainer}>
              <input className={styles.radioInput} type="checkbox" id="category" name="category" checked={category === ProductType.CARD_GAMES} onChange={(ev) => handleCategoryType(ev, ProductType.CARD_GAMES)} />
              <label htmlFor="category">Juegos de cartas</label>
            </div>
            <div className={styles.radioButtonsContainer}>
              <input className={styles.radioInput} type="checkbox" id="category" name="category" checked={category === ProductType.ROLE_GAMES} onChange={(ev) => handleCategoryType(ev, ProductType.ROLE_GAMES)} />
              <label htmlFor="category">Juegos de rol</label>
            </div>
            <div className={styles.radioButtonsContainer}>
              <input className={styles.radioInput} type="checkbox" id="category" name="category" checked={category === ProductType.MERCHANDISING} onChange={(ev) => handleCategoryType(ev, ProductType.MERCHANDISING)} />
              <label htmlFor="category">Merchandising</label>
            </div>
            <label className={styles.filterTitles} htmlFor="price">Precio</label>
            <div className={styles.priceFilter}>
              <input type="range" id="price" name="price" min={0} max={200} value={price} onChange={(ev) => setPrice(parseInt(ev.target.value))} className={styles.priceInput} />
              <p className={styles.priceFilterNum}>{price} €</p>
            </div>
          </form>
        </div>
        <div>
          <div className={styles.productList}>
            {products.length !== 0 ? products.map((product) => {
              return <ProductPreview productImageURL={product.productImageURL} productName={product.productName} price={product.price} productID={product.productID} key={product.productID} />
            }) : <div>No se han encontrado productos con esas coincidencias</div>}
          </div>
          <div className={styles.pageButtonsArea}>
            <button className={styles.pageButtons} onClick={handlePreviousPage} disabled={currentPage === 1}>Página anterior</button>
            <button className={styles.pageButtons} onClick={handleNextPage} disabled={!existNextPage}>Página siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}