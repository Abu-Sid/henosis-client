import React from "react";

const form = () => {
  return (
    <div>
      <form>
        <div className='input-field'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />
        </div>
      </form>
    </div>
  );
};

export default form;
