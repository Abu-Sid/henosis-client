import React, { useState } from 'react';

const Information = () => {
    const [company, setCompany] = useState(false)
    const handleSubmit= (event) => {
        event.preventDefault();
        //Handle information of company and workspace here
    }
    const handleModel=()=>{
        // Handle model of payment here
    }
    const handleWorkspace=()=>{
        // Handle new workspace  here
    }
    return (
        <section className='information'>
            <form className='information__form' onSubmit={handleSubmit}>
            {
                !company && 
                 <>
                    <h1 className='information__form__header'>Company Information</h1>
                    <div className='information__form__input'>
                        <label htmlFor='information'>Company name: </label>
                        <input type='text' name='company_name' id='company_name' placeholder="Name" />
                        <label htmlFor='information'>Company email: </label>
                        <input type='email' name='company_email' id='company_email' placeholder="Email"/>
                    </div>
                 </>
            }
                
                 <>
                    <h1 className='information__form__header'>Workspace Information</h1>
                    <div className='information__form__input'>
                        <label htmlFor='information'>Workspace name: </label>
                        <input type='text' name='workspace_name' id='workspace_name' placeholder="Name" />
                        <label htmlFor='information'>Add member(optional): </label>
                        <input type='email' name='member_email' id='member_email' placeholder="Email" />
                    </div>
                    {
                        !company? 
                        <button type='submit' onClick ={handleModel}>Checkout</button>
                        :
                        <button type='submit' onClick ={handleWorkspace}>Create workspace</button>
                    }
                
                    </>
            </form>
        </section>
    );
};

export default Information;