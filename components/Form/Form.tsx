import React, { ReactNode } from "react";

interface IForm {
  children: React.ReactNode;
  width?: number;
  onSubmit?: () => void;
}

interface IFormHeader {
  children: string;
}

interface IFormInput {
  name: string;
  type: string;
  row?: number;
}

export const Form: React.FC<IForm> = ({ children, width, onSubmit }) => {
  return (
    <form
      style={{ width: `${width}px` }}
      className='general-form'
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export const FormHeader: React.FC<IFormHeader> = ({ children }) => {
  return <h1 className='general-form__header'>{children}</h1>;
};

export const FormInputField: React.FC<IFormInput> = ({
  children,
  name,
  type,
  row,
}) => {
  return (
    <div className='general-form__input-field'>
      <label htmlFor={name}>{children}</label>
      {type === "text" && <input type={type} name={name} id={name} />}
      {type === "textarea" && (
        <textarea name={name} id={name} rows={row}></textarea>
      )}
    </div>
  );
};
