import { useEffect, useState } from "react";
import { Product, ProductType } from "../../common/types/product";
import { ProductPreview } from "../../components/product-preview/ProductPreview";
import { getAllProducts } from "../../services/product-service";
import styles from "./productList.module.css";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/user-context";


export const ProductList = () => {
  const {productType} = useParams();
  const {user} = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<ProductType | null>(productType ? productType as unknown as ProductType : null);
  const [price, setPrice] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [existNextPage, setExistNextPage] = useState<boolean>(true);
  console.log(user, "user")
  const handleCategoryType = (ev: any, type: ProductType) => {
    if(ev.target.checked){
      setCategory(type)
    } else{
      setCategory(null)
    }
  };

  const handleNextPage = () => {
    if(existNextPage){
      setCurrentPage(currentPage+1)
    }
  };
  const handlePreviousPage = () => {
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  };

  useEffect(() => {
    getAllProducts({pageSize: 10, productName: name, productType: category, price: price, page: currentPage}).then((response) => {
      if(response.length !== 0){
       setProducts(response)
       setExistNextPage(true) 
      } else{
        setExistNextPage(false)
      }
    });
  },[name, category, price, currentPage]);

  return (
    <div className={styles.productsArea}> 
      <h1 className={styles.titleProducts}>Productos</h1>
      <div className={styles.productsWithFilter}>
        <div className={styles.productsFilter}>
          <form action="" className={styles.form}>
              <label htmlFor="name" className={styles.filterTitles}>Nombre</label>
              <input type="text" id="name" name="name" value={name} onChange={(ev) => setName(ev.target.value)} />
            <label className={styles.filterTitles}>Categoría</label>
            <div>
              <label htmlFor="category">Juegos de mesa</label>
              <input type="checkbox" id="category" name="category" checked={category === ProductType.BOARD_GAMES} onChange={(ev) => handleCategoryType(ev, ProductType.BOARD_GAMES)}/>
            </div>
            <div>
              <label htmlFor="category">Juegos de cartas</label>
              <input type="checkbox" id="category" name="category" checked={category === ProductType.CARD_GAMES} onChange={(ev) => handleCategoryType(ev, ProductType.CARD_GAMES)}/>
            </div>
            <div>
              <label htmlFor="category">Juegos de rol</label>
              <input type="checkbox" id="category" name="category" checked={category === ProductType.ROLE_GAMES} onChange={(ev) => handleCategoryType(ev, ProductType.ROLE_GAMES)}/>
            </div>
            <div>
              <label htmlFor="category">Merchandising</label>
              <input type="checkbox" id="category" name="category" checked={category === ProductType.MERCHANDISING} onChange={(ev) => handleCategoryType(ev, ProductType.MERCHANDISING)}/>
            </div>
            <div>
              <label htmlFor="price">Precio</label>
              <input type="range" id="price" name="price" min={0} max={200} value={price} onChange={(ev) => setPrice(parseInt(ev.target.value))}/>
              <p>{price}</p>
            </div>
          </form>
        </div>
        <div className= {styles.productList}>
        {products.map((product)=>{
        return <ProductPreview productImageURL={product.productImageURL} productName={product.productName} price={product.price} productID={product.productID} key={product.productID} />
      })}
      </div>
      <div>
        <button onClick={handleNextPage} disabled={!existNextPage}>Página siguiente</button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Página anterior</button>
      </div>
      </div>
    </div>
  );
}