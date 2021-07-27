import React from 'react';

const ActionToCall = () => {
    return (
        <div className='act'>
            <div className='act__body'>
                <h1>Sign up and get started with Henosis today. <br /> 
                    A world of productive teamwork awaits!</h1>
                <div>
                    <input type="text" placeholder='Email'/>
                    <button className='button-primary'>Signup</button>
                </div>
                
            </div>
        </div>
    );
};

export default ActionToCall;