import * as Yup from 'yup';

export const validationSchema = Yup.object({
    shippingOptions: Yup.string()
        .required('Campo requerido'),
    paymentMethod: Yup.string()
        .required('Campo requerido'),

});