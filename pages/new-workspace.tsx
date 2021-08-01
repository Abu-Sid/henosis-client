import React from "react";

const newWorkspace = () => {
  return (
    <section className='new-workspace'>
      <form className='workspace-form'>
        <h1 className='workspace-form__header'>Create a new workspace.</h1>
        <div className='workspace-form__input'>
          <label htmlFor='workspace'>Workspace name: </label>
          <input type='text' name='workspace' id='workspace' />
        </div>

        <button type='submit'>Create Workspace</button>
      </form>
    </section>
  );
};

export default newWorkspace;
