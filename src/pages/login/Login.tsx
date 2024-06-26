import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { SimpleUser } from '../../common/types/user';
import { useUser } from '../../context/user-context';
import { useCustomRouter } from '../../router/custom-router';
import { Routes } from '../../router/routes';
import { loginUser } from '../../services/user-service';
import { validationSchema } from './validation-schema';
import styles from "./login.module.css";

export const Login = () => {
  const { setUser } = useUser();
  const { goUserDetailPage } = useCustomRouter();
  const handleSubmit = async (values: SimpleUser, { setSubmitting, resetForm }: FormikHelpers<SimpleUser>) => {
    try {
      const userLogged = await loginUser(values);
      localStorage.setItem('user', JSON.stringify(userLogged));
      setUser(userLogged);
      goUserDetailPage();
      resetForm();
    } catch (error) {
      alert('Error al hacer login: ' + (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.loginForm}>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit">Enviar</button>
        </Form>
      </Formik>
      <div className={styles.linksLoginContainer}>
        <Link className={styles.linkLogin}  to={Routes.SIGN_UP_PAGE}>Si no tienes una cuenta, regístrate aquí</Link>
        <Link className={styles.linkLogin} to={Routes.FORGOT_PASSWORD}>¿Has olvidado tu contraseña?</Link>
      </div>


    </div>
  );
}