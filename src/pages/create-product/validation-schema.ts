import * as Yup from 'yup';

export const validationSchema = Yup.object({
  productName: Yup.string()
    .required('Campo requerido'),
  productDescription: Yup.string()
    .required('Campo requerido'),
  price: Yup.number()
    .required('Campo requerido'),
  stock: Yup.number()
    .required('Campo requerido'),
  productImageURL: Yup.string()
    .required('Campo requerido'),
  productType: Yup.string()
    .required('Campo requerido')

});