import React from "react";
import toast from "react-hot-toast";
import { passwordUpdate } from "../../../auth/authManager";
import useForm from "../../../hooks/useForm";
import { Form, FormHeader, FormInputField } from "../../Form/Form";

const Account: React.FC = () => {
  const { handleInput, handleInvalid, handleSubmit, error } = useForm();
  const submit = async (data: any) => {
    console.log(data);
    try {
      await passwordUpdate(data.password);
      toast.success("Password Updated Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Please Check your Password!");
    }
  };
  return (
    <div style={{ marginLeft: "13%", marginTop: "3%" }}>
      <Form width={800} onSubmit={handleSubmit(submit)}>
        <FormHeader>Change Password</FormHeader>
        <FormInputField name="password" type="password" onChange={handleInput}>
          Current Password
        </FormInputField>
        <FormInputField
          name="password"
          type="password"
          onChange={handleInput}
          onInvalid={handleInvalid}
          required
        >
          New Password
        </FormInputField>
        <FormInputField
          name="confirmPassword"
          type="password"
          onChange={handleInput}
          onInvalid={handleInvalid}
          required
        >
          Confirm New Password
        </FormInputField>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormInputField
            width={180}
            type="submit"
            value={"Set New Password"}
          />
          <small style={{ color: "#4a4fff", marginLeft: "10px",marginTop:'20px' }}>
            Forgot Password?
          </small>
        </div>
      </Form>
    </div>
  );
};

export default Account;
