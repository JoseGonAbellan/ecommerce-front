import * as Yup from 'yup';

export const validationSchemaChangePassword = Yup.object({
    newPassword: Yup.string()
        .required("Campo requerido"),
    oldPassword: Yup.string()
        .required("Campo requerido"),

})