import React from "react";
import { Form, FormHeader, FormInputField } from "../../Form/Form";

const Account: React.FC = () => {
  return (
    <div>
      <Form width={800}>
        <FormHeader>Change Password</FormHeader>
        <FormInputField name="number" type="text">
          Current Password
        </FormInputField>
        <FormInputField name="hello" type="text">
          New Password
        </FormInputField>
        <FormInputField name="note" type="text">
          Confirm New Password
        </FormInputField>
        <FormInputField type="submit" value={"Set New Password"} />
      </Form>
    </div>
  );
};

export default Account;
