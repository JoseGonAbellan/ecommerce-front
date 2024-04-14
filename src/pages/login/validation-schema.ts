import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Dirección de correo electrónico inválida')
    .required('Campo requerido'),
  password: Yup.string()
    .required('Campo requerido'),  
});