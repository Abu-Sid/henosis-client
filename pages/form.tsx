import React from "react";

const form = () => {
  return (
    <div>
      <form className='general-form'>
        <h1 className='general-form__header'>Personal Information</h1>
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
      </form>
    </div>
  );
};

export default form;
