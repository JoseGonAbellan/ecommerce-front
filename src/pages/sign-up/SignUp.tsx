import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { RolEnum, User } from '../../common/types/user';
import { createUser } from '../../services/user-service';
import { validationSchema } from './validation-schema';

export const SignUp = () => {
  const handleSubmit = async (values: User, {setSubmitting, resetForm}: FormikHelpers<User>) => {
   try {
    await createUser(values);
    alert('Usuario creado exitosamente');
    resetForm();
  } catch (error) {
    alert('Error al crear usuario: ' + (error as Error).message);
    console.log(error)
  } finally {
    setSubmitting(false);
  } 
  };

 return (
    <Formik
      initialValues={{
        userName: '',
        userLastName: '',
        userEmail: '',
        userPassword: '',
        userAddress: '',
        userPhone: null as unknown as number,
        rol: RolEnum.USER
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form style={{padding:200}}>
        <div>
          <label htmlFor="userName">Nombre de usuario</label>
          <Field name="userName" type="text" />
          <ErrorMessage name="userName" component="div" />
        </div>

        <div>
          <label htmlFor="userLastName">Apellidos</label>
          <Field name="userLastName" type="text" />
          <ErrorMessage name="userLastName" component="div" />
        </div>

        <div>
          <label htmlFor="userEmail">Email</label>
          <Field name="userEmail" type="text"/>
          <ErrorMessage name="userEmail" component="div" />
        </div>

        <div>
          <label htmlFor="userAddress">Dirección</label>
          <Field name="userAddress" type="text"/>
          <ErrorMessage name="userAddress" component="div" />
        </div>

        <div>
          <label htmlFor="userPhone">Teléfono</label>
          <Field name="userPhone" type="tel"/>
          <ErrorMessage name="userPhone" component="div" />
        </div>

        <div>
          <label htmlFor="userPassword">Contraseña</label>
          <Field name="userPassword" type="password"/>
          <ErrorMessage name="userPassword" component="div" />
        </div>

        <button type="submit">Enviar</button>
      </Form>
    </Formik>
  );
}