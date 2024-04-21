import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { resetPassword } from "../../services/user-service";
import styles from "./forgotPassword.module.css";
import { validationSchema } from "./validation-schema";
export const ForgotPassword = () => {

    const handleSubmit = async (values: { email: string }, { setSubmitting, resetForm }: FormikHelpers<{ email: string }>) => {
        try {

            await resetPassword(values.email)
            resetForm();
            alert('Revise su correo electronico');
        } catch (error) {
            alert('Error al hacer login: ' + (error as Error).message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className={styles.forgotPasswordContainer}>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className={styles.forgotPasswordForm}>
                    <div>
                        <p>Dejanos tu correo. Si existe la cuenta, te enviaremos una contraseña nueva provisional</p>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <button className={styles.forgotPassButton} type="submit">Recuperar contraseña</button>
                </Form>
            </Formik>

        </div>
    )
}