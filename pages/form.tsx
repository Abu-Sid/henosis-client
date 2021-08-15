import React from "react";
import { Form, FormHeader, FormInputField } from "../components/Form/Form";

const form = () => {
  return (
    <div>
      <Form>
        <FormHeader>Personal Info</FormHeader>
        <FormInputField name='hello' type='text'>
          Hello
        </FormInputField>
        <FormInputField name='note' type='textarea' row={12}>
          Hello
        </FormInputField>
      </Form>
    </div>
  );
};

export default form;
