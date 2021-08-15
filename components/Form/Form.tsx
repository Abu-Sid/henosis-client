import React from "react";

interface IForm {
  header: string;
}

export const Form: React.FC = ({ children }) => {
  return <form className='general-form'>{children}</form>;
};

export const FormHeader: React.FC = ({ children }) => {
  return <h1 className='general-form__header'>{children}</h1>;
};

export const InputField: React.FC = () => {
  return (
    <div className='general-form__input-field'>
      <label htmlFor='name'>Name</label>
      <input type='text' name='name' id='name' />
    </div>
  );
};
