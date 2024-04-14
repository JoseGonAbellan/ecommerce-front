import * as Yup from 'yup';

export const validationSchema = Yup.object({
  userName: Yup.string()
    .required('Campo requerido'),
  userLastName: Yup.string()
    .required('Campo requerido'), 
  userEmail: Yup.string()
    .email('Dirección de correo electrónico inválida')
    .required('Campo requerido'),
  userPassword: Yup.string()
    .required('Campo requerido'),  
  userAddress: Yup.string()
    .required('Campo requerido'),
  userPhone: Yup.number()
    .required('Campo requerido'),  
});