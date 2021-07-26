import React from "react";
import { ILoginData } from "../../auth/authManager";
import useForm from "../../hooks/useForm";

interface IProps {
  submit: (data: ILoginData) => void;
  newUser?: boolean;
}

interface IForm {
  handleInput: (e: any) => void;
  handleInvalid: (e: any) => void;
  handleSubmit: (submit: (data: ILoginData) => void) => (e: any) => void;
  error: any;
}

const LoginForm = ({ submit, newUser }: IProps) => {
  const { handleInput, handleInvalid, handleSubmit, error }: IForm = useForm();
  return (
    <form onSubmit={handleSubmit(submit)}>
      {newUser && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInput}
            required
            onInvalid={handleInvalid}
          />
          {error.name && <p>Name is required</p>}
        </>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInput}
        required
        onInvalid={handleInvalid}
      />
      {error.email && <p>Valid Email is required</p>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInput}
        required
        onInvalid={handleInvalid}
      />
      {error.password && <p>Password is required</p>}
      {newUser && (
        <>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleInput}
            required
            onInvalid={handleInvalid}
          />
          {error.confirmPassword && <p>confirmPassword is required</p>}
        </>
      )}
      <input type="submit" value="Sigin Up" />
    </form>
  );
};

export default LoginForm;
