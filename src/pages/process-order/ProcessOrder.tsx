import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { generateJWT, secretKey } from "../../common/jwt/generate-jwt";
import { PaymentMethod, ShippingOptions } from "../../common/types/order";
import { Modal } from "../../components/modal/Modal";
import { useCart } from "../../context/shopping-cart.context";
import { useUser } from "../../context/user-context";
import { useCustomRouter } from "../../router/custom-router";
import { createOrder, createOrderForm } from "../../services/orders-service";
import styles from "./processOrder.module.css";
import { validationSchema } from "./validation-schema";

export const ProcessOrder = () => {
    const { productsOrders, clearCart } = useCart();
    const { user } = useUser();
    const { goUserDetailPage } = useCustomRouter();

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    if (productsOrders.length === 0) {
        return <div>No has añadido nada al carrito</div>
    }

    const totalPrice = productsOrders.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);



    const handlePlaceOrder = async (values: {
        shippingOptions: ShippingOptions;
        paymentMethod: PaymentMethod;
    }, { resetForm }: FormikHelpers<{
        shippingOptions: ShippingOptions;
        paymentMethod: PaymentMethod;
    }>) => {
        if (user) {
            const formOrder: createOrderForm = {
                userId: user?.userID as unknown as number,
                orderDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
                productsOrders: productsOrders.map((product) => {
                    return {
                        id: product.id,
                        quantity: product.quantity
                    }

                }),
                shippingOptions: values.shippingOptions,
                paymentMethod: values.paymentMethod
            }
            const token = generateJWT(user, secretKey);
            const createdOrder = await createOrder({ form: formOrder, token });
            if (createdOrder) {
                setModalOpen(true);
                resetForm();

            }
        }


    };

    const adviseOrder = () => {
        return (
            <div>
                <p>El pedido se ha creado correctamente</p>
                <p>Esto es mi proyecto personal del TFG</p>
                <p>Esta tienda no existe, y tu pedido ni llegará ni se cobrará</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Resumen del Pedido</h2>
            {productsOrders.map((productOrder) => (
                <ul className={styles.orderResume}>
                    <li className={styles.orderItem} key={productOrder.id}>
                        {productOrder.name}
                    </li>
                    <li className={styles.orderItem}>Cantidad: {productOrder.quantity}</li>
                    <li className={styles.orderItem}>Precio Unitario: {productOrder.price} € </li>

                </ul>
            ))}
            <div><span className={styles.span}>Precio Total:</span> {totalPrice} €</div>

            <Formik
                initialValues={{
                    shippingOptions: ShippingOptions.HOME,
                    paymentMethod: PaymentMethod.CASH_ON_DELIVERY
                }}
                validationSchema={validationSchema}
                onSubmit={handlePlaceOrder}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form className={styles.formOrder}>
                        <h2>Opciones de Envío</h2>
                        <div className={styles.formInputs}>
                            <label htmlFor="homeDelivery">Enviar a domicilio</label>
                            <Field
                                type="radio"
                                id="homeDelivery"
                                name="shippingOptions"
                                value={ShippingOptions.HOME}
                                onChange={() => {
                                    setFieldValue('shippingOptions', ShippingOptions.HOME);
                                    setFieldValue('paymentMethod', PaymentMethod.CASH_ON_DELIVERY);
                                }}
                                checked={values.shippingOptions === ShippingOptions.HOME}
                            />
                        </div>
                        <div className={styles.formInputs}>
                            <label htmlFor="storePickup">Recoger en tienda</label>
                            <Field
                                type="radio"
                                id="storePickup"
                                name="shippingOptions"
                                value={ShippingOptions.STORE}
                                onChange={() => {
                                    setFieldValue('shippingOptions', ShippingOptions.STORE);
                                    setFieldValue('paymentMethod', PaymentMethod.PAY_ON_STORE);
                                }}
                                checked={values.shippingOptions === ShippingOptions.STORE}
                            />
                        </div>

                        {touched.shippingOptions && errors.shippingOptions && (
                            <div>{errors.shippingOptions}</div>
                        )}

                        {values.shippingOptions === ShippingOptions.STORE && (
                            <div className={styles.optionsPaymentContainer}>
                                <h2>Opciones de Pago</h2>
                                <div className={styles.formInputs}>
                                    <label htmlFor="inStorePayment">Pagar en tienda</label>
                                    <Field
                                        type="radio"
                                        id="inStorePayment"
                                        name="paymentMethod"
                                        value={PaymentMethod.PAY_ON_STORE}
                                        checked={values.paymentMethod === PaymentMethod.PAY_ON_STORE}
                                    />
                                </div>
                            </div>
                        )}

                        {values.shippingOptions === ShippingOptions.HOME && (
                            <div className={styles.optionsPaymentContainer}>
                                <h2>Opciones de Pago</h2>
                                <div className={styles.formInputs}>
                                    <label htmlFor="cashOnDelivery">Pagar contra reembolso</label>
                                    <Field
                                        type="radio"
                                        id="cashOnDelivery"
                                        name="paymentMethod"
                                        value={PaymentMethod.CASH_ON_DELIVERY}
                                        checked={values.paymentMethod === PaymentMethod.CASH_ON_DELIVERY}
                                    />
                                </div>
                            </div>
                        )}

                        {touched.paymentMethod && errors.paymentMethod && (
                            <div>{errors.paymentMethod}</div>
                        )}

                        <button className={styles.formButton} type="submit">Realizar Pedido</button>
                    </Form>
                )}
            </Formik>
            <Modal isOpen={modalOpen} children={adviseOrder()} onClose={() => {
                setModalOpen(false);
                goUserDetailPage();
                clearCart();

            }} />

        </div>)
}