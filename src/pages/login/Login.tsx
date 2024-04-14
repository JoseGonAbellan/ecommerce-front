import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { SimpleUser } from '../../common/types/user';
import { useUser } from '../../context/user-context';
import { useCustomRouter } from '../../router/custom-router';
import { Routes } from '../../router/routes';
import { loginUser } from '../../services/user-service';
import { validationSchema } from './validation-schema';

export const Login = () => {
  const {setUser} = useUser();
  const {goUserDetailPage } = useCustomRouter();
  const handleSubmit = async (values: SimpleUser, {setSubmitting, resetForm}: FormikHelpers<SimpleUser>) => {
  try {
   const userLogged = await loginUser(values);
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
  <div style={{padding:200}}>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" type="text"/>
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <Field name="password" type="password"/>
          <ErrorMessage name="password" component="div" />
        </div>

        <button type="submit">Enviar</button>
      </Form>
    </Formik>
    <Link to={Routes.SIGN_UP_PAGE}>Si no tienes una cuenta, regístrate aquí</Link>
    </div>
  );
}