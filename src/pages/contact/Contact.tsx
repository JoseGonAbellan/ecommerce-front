import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export const Contact = () => {
    const [state, handleSubmit] = useForm("mwkgwynn");
  if (state.succeeded) {
      return <p style={{paddingTop: 200}}>Thanks for joining!</p>;
  }
  return (
      <form onSubmit={handleSubmit} style={{paddingTop: 200}}>
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}