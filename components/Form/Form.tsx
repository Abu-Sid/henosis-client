import React from "react";

interface IForm {
  name: string;
  type: string;
  row?: number;
}

export const Form: React.FC = ({ children }) => {
  return <form className='general-form'>{children}</form>;
};

export const FormHeader: React.FC = ({ children }) => {
  return <h1 className='general-form__header'>{children}</h1>;
};

export const FormInputField: React.FC<IForm> = ({
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
