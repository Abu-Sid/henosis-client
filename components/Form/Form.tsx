import React from "react";

interface IForm {
  children: React.ReactNode;
  width?: number;
  onSubmit?: () => void;
}

interface IFormHeader {
  children: string;
}

interface IFormInput {
  name?: string;
  type: string;
  row?: number;
  value?: string;
  required?: boolean;
  onChange?: () => void;
  onInvalid?: () => void;
}

export const Form: React.FC<IForm> = ({ children, width, onSubmit }) => {
  return (
    <form
      style={{ width: `${width}px` }}
      className="general-form"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export const FormHeader: React.FC<IFormHeader> = ({ children }) => {
  return <h1 className="general-form__header">{children}</h1>;
};

export const FormInputField: React.FC<IFormInput> = ({
  children,
  name,
  type,
  row,
  value,
  required,
  onInvalid,
  onChange,
  ...rest
}) => {
  return (
    <div className="general-form__input-field">
      {children && <label htmlFor={name}>{children}</label>}
      {type === "text" && <input type={type} name={name} id={name} {...rest} />}
      {type === "password" && (
        <input
          type={type}
          name={name}
          id={name}
          {...rest}
          required={required}
          onChange={onChange}
          onInvalid={onInvalid}
        />
      )}
      {type === "textarea" && (
        <textarea name={name} id={name} rows={row}></textarea>
      )}
      {type === "submit" && <input type={type} value={value} />}
    </div>
  );
};
