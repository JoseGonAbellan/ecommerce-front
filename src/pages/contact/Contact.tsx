import { useForm, ValidationError } from '@formspree/react';
import styles from "./contact.module.css";


export const Contact = () => {
    const [state, handleSubmit] = useForm("mwkgwynn");
  if (state.succeeded) {
      return <p style={{paddingTop: 200}}>Thanks for joining!</p>;
  }
  return (
    <div className={styles.container}>
      <img src={process.env.PUBLIC_URL + '/images/soloLogo.png'} alt="Logo de la tienda" className={styles.logo}/>
      <h1>- CONTACTA CON NOSOTROS -</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <input
        id="email"
        type="email" 
        name="email"
        className={styles.email}
        placeholder='Deja aquí tu mail'
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
        className={styles.message}
        placeholder='Escribe aquí tu consulta, te contestaremos lo antes posible'
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting} className={styles.formButton}>
        Enviar Mensaje
      </button>
    </form>
    </div>
  );
}