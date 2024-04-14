import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { generateJWT, secretKey } from "../../common/jwt/generate-jwt";
import { OrderPropierties } from "../../common/types/order";
import { RolEnum, User } from "../../common/types/user";
import { OrderPreview } from "../../components/order-preview/OrderPreview";
import { useUser } from "../../context/user-context";
import { getOrders } from "../../services/orders-service";
import { updateUser } from "../../services/user-service";
import { validationSchema } from "./validation-schema";
import { Link } from "react-router-dom";
import { Routes } from "../../router/routes";


export const UserDetail = () => {
  const [orders, setOrders] = useState<OrderPropierties[]>([])
  const {setUser, user} = useUser();
  const handleSubmit = async (values: User, {setSubmitting, resetForm}: FormikHelpers<User>) => {
   try {
    const userId= user?.userID as unknown as number;
    await updateUser({form: values, id: userId});
    alert('Usuario creado exitosamente');
    resetForm();
  } catch (error) {
    alert('Error al crear usuario: ' + (error as Error).message);
  } finally {
    setSubmitting(false);
  } 
  };

  useEffect(() => {
    if(user?.userID){
      const token = generateJWT(user, secretKey);
      getOrders({id: user.userID, token}).then((userOrders) => setOrders((userOrders)))
    }
  },[user])
  if(!user) {
    return <div style={{padding:200}}>
      <p>Logeate <Link to={Routes.LOGIN_PAGE}>aqui</Link></p>
    </div>
}
 return (
  <div style={{padding:200}}>
  <h2>Tus Datos</h2>
  <Formik
      initialValues={{
        userName: user ? user.userName : '',
        userLastName: user ? user.userLastName : '',
        userEmail: user ? user.userEmail : '',
        userAddress: user ? user.userAddress : '',
        userPassword: user ? user.userPassword : '',
        userPhone: user ? user.userPhone : null as unknown as number,
        rol: user ? user.rol : RolEnum.USER
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
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
        <button type="submit">Enviar</button>
      </Form>
    </Formik>

    <h2>Tus Pedidos</h2>
    {orders.length ? 
    <div>
        {orders.map((order)=>{
        return <OrderPreview order={order}/>
        })}
        </div> 
        :
        <div>No tienes pedidos</div>} 
    </div>
  );
}