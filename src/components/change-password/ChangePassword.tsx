import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { generateJWT, secretKey } from "../../common/jwt/generate-jwt";
import { changePasswordUser } from "../../common/types/user";
import { useUser } from "../../context/user-context";
import { changeUserPassword } from "../../services/user-service";
import { validationSchemaChangePassword } from "./validationSchema";




export const ChangePassword = () => {
    const { user } = useUser();
    const token = generateJWT(user, secretKey);

    const handleSubmit = async (values: changePasswordUser, { setSubmitting, resetForm }: FormikHelpers<changePasswordUser>) => {
        try {
            if (user !== null) {
                await changeUserPassword({
                    form: values,
                    token,
                    userId: user.userID as number
                })
                alert('Se ha cambiado la contraseña correctamente');
                resetForm();
            }

        } catch (error) {
            const errorMesagge = error as any;
            alert('Error al crear usuario: ' + errorMesagge.response?.data?.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Cambiar contraseña</h2>
            <Formik
                initialValues={{
                    email: user ? user.userEmail : "",
                    oldPassword: "",
                    newPassword: "",
                }}
                validationSchema={validationSchemaChangePassword}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="oldPassword">Contraseña antigua</label>
                        <Field name="oldPassword" type="password" />
                        <ErrorMessage name="oldPassword" component="div" />
                    </div>

                    <div>
                        <label htmlFor="newPassword">Contraseña nueva</label>
                        <Field name="newPassword" type="password" />
                        <ErrorMessage name="newPassword" component="div" />
                    </div>

                    <button type="submit">Enviar</button>
                </Form>
            </Formik>

        </div>
    )
}