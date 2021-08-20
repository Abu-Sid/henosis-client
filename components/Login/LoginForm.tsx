import React, { useState } from "react";
import { ILoginData } from "../../auth/authManager";
import useForm from "../../hooks/useForm";
import EyeIcon from "./EyeIcon";

interface IProps {
  submit: (data: ILoginData) => void;
  newUser?: boolean;
}

const LoginForm = ({ submit, newUser }: IProps) => {
  const { handleInput, handleInvalid, handleSubmit, error } =
    useForm<ILoginData>();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((preValue) => !preValue);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {newUser && (
        <>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInput}
            required
            onInvalid={handleInvalid}
            id="name"
          />
          {error.name && <p className="alert-error">Valid Name is required</p>}
        </>
      )}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInput}
        required
        onInvalid={handleInvalid}
        id="email"
      />
      {error.email && <p className="alert-error">Valid Email is required</p>}

      <label htmlFor="password">Password</label>
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleInput}
          required
          onInvalid={handleInvalid}
          id="password"
        />
        <EyeIcon
          className={showPassword ? "eye-icon eye-active" : "eye-icon"}
          onClick={handleShowPassword}
        />
      </div>
      {error.password && (
        <p className="alert-error">Password is required minimum 6 characters</p>
      )}
      {newUser && (
        <>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInput}
              required
              onInvalid={handleInvalid}
              id="confirmPassword"
            />
            <EyeIcon
              className={showPassword ? "eye-icon eye-active" : "eye-icon"}
              onClick={handleShowPassword}
            />
          </div>
          {error.confirmPassword && (
            <p className="alert-error">Confirm Password Not Matched</p>
          )}
        </>
      )}
      <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
    </form>
  );
};

export default LoginForm;
