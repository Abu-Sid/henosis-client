import React from "react";

const LoadingAnimation = () => {
  return (
    <div className='loading'>
      <div className='logo-animation'>
        <svg
          width='496'
          height='141'
          viewBox='0 0 496 141'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='animation'>
            <path
              id='top'
              d='M400.713 0L295.618 86.91L227.946 30.948L265.37 0H305.645L268.221 30.948L295.618 53.604L360.427 0H400.713Z'
              fill='#171E3C'
              className='animation-1'
            ></path>
            <path
              id='bottom'
              d='M267.824 109.893L230.411 140.833H190.126L227.539 109.893L200.153 87.246L135.343 140.833H95.0682L200.153 53.9314L267.824 109.893Z'
              fill='#171E3C'
              className='animation-2'
            ></path>
            <path
              id='right'
              d='M496 0.120924L325.834 140.834H285.894L285.727 140.695L455.85 0H495.854L496 0.120924Z'
              fill='#171E3C'
              className='animation-3'
            ></path>
            <path
              id='left'
              d='M210.587 0L40.2853 140.834H0L170.301 0H210.587Z'
              fill='#171E3C'
              className='animation-4'
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default LoadingAnimation;
