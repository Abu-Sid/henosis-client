import React from "react";
import { Form, FormHeader } from "../components/Form/Form";

const form = () => {
  return (
    <div>
      <Form>
        <FormHeader>Personal Info</FormHeader>
        <div className='general-form__input-field'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />
        </div>
        <div className='general-form__input-field'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />
        </div>
        <div className='general-form__input-field'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />
        </div>
        <div className='general-form__input-field'>
          <label htmlFor='note'>Name</label>
          <textarea name='note' id='note' rows={10}></textarea>
        </div>
      </Form>
    </div>
  );
};

export default form;
