import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateJWT, secretKey } from '../../common/jwt/generate-jwt';
import { CreateProduct, Product, ProductType } from '../../common/types/product';
import { RolEnum } from '../../common/types/user';
import { useUser } from '../../context/user-context';
import { useCustomRouter } from '../../router/custom-router';
import { createProduct, getProductById, updateProduct } from '../../services/product-service';
import styles from "./createProduct.module.css";
import { validationSchema } from './validation-schema';
export const CreateProductPage = () => {
  const { user } = useUser();
  const token = generateJWT(user, secretKey);
  const { id } = useParams();
  const { goAdminPage } = useCustomRouter();

  const [product, setProduct] = useState<Product>();

  const handleSubmit = async (values: CreateProduct, { setSubmitting, resetForm }: FormikHelpers<CreateProduct>) => {
    try {
      if (product) {
        await updateProduct({ form: values, id: id as unknown as number, token });
        alert("Producto modificado correctamente");
        goAdminPage();
      } else {
        await createProduct({ form: values, token });
        alert("Producto creado correctamente");
        resetForm();
        goAdminPage();
      }
    } catch (error) {
      alert('Error al crear producto: ' + (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    if (id) {
      getProductById(id as unknown as number).then((response) => setProduct(response))
    }
  }, [id])

  if (user?.rol !== RolEnum.ADMIN) {
    return <div>No tienes permisos para ver esta página</div>
  };

  return (
    <div className={styles.createProductContainer}>
      <Formik
        enableReinitialize
        initialValues={{
          productName: product ? product.productName : "",
          productDescription: product ? product.productDescription : "",
          price: product ? product.price : 0,
          stock: product ? product.stock : 0,
          productImageURL: product ? product.productImageURL : "",
          productType: product ? product.productType : ProductType.BOARD_GAMES,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        <Form className={styles.createProductForm}>
          <h3>{id ? "Editar producto" : `Dar de alta un producto`}</h3>
          <div>
            <label htmlFor="productName">Nombre del producto</label>
            <Field name="productName" type="text" />
            <ErrorMessage name="productName" component="div" />
          </div>

          <div>
            <label htmlFor="productDescription">Descripción del producto</label>
            <Field name="productDescription" type="text" />
            <ErrorMessage name="productDescription" component="div" />
          </div>

          <div>
            <label htmlFor="price">Precio</label>
            <Field name="price" type="number" />
            <ErrorMessage name="price" component="div" />
          </div>

          <div>
            <label htmlFor="stock">Stock </label>
            <Field name="stock" type="number" />
            <ErrorMessage name="stock" component="div" />
          </div>

          <div>
            <label htmlFor="productImageURL">URL de la imagen</label>
            <Field name="productImageURL" type="text" />
            <ErrorMessage name="productImageURL" component="div" />
          </div>

          <div>
            <label htmlFor="productType">Tipo de producto</label>
            <Field as="select" name="productType">
              <option value="">Selecciona un tipo de producto</option>
              {Object.entries(ProductType).map(([key, value]) => (
                <option key={key} value={value}>{value}</option>
              ))}
            </Field>
            <ErrorMessage name="productType" component="div" />
          </div>

          <button className={styles.createProductButton} type="submit">{id ? "Editar producto" : "Crear producto"}</button>
        </Form>
      </Formik>
    </div>
  );
}