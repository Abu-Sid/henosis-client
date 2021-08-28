import React from "react";

interface IStatus {
  status: string;
}

const DashboardStatusPill: React.FC<IStatus> = ({ status }) => {
  const iconCheck = status.toLowerCase().replace(/\s+/g, "");
  console.log(iconCheck);
  return (
    <div className='status'>
      <div className='status__icon'>
        {iconCheck === "remaining" && (
          <svg
            width='60'
            height='60'
            viewBox='0 0 50 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M25 16.6667V25M25 33.3333H25.0208M43.75 25C43.75 35.3553 35.3553 43.75 25 43.75C14.6447 43.75 6.25 35.3553 6.25 25C6.25 14.6447 14.6447 6.25 25 6.25C35.3553 6.25 43.75 14.6447 43.75 25Z'
              stroke='#EB5757'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}

        {iconCheck === "inprogress" && (
          <svg
            width='60'
            height='60'
            viewBox='0 0 50 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M17.141 18.75C18.285 16.3225 21.3717 14.5833 25.0001 14.5833C29.6025 14.5833 33.3334 17.3816 33.3334 20.8333C33.3334 23.7488 30.6717 26.1981 27.0714 26.8887C25.9414 27.1055 25.0001 28.0161 25.0001 29.1667M25 35.4167H25.0208M43.75 25C43.75 35.3553 35.3553 43.75 25 43.75C14.6447 43.75 6.25 35.3553 6.25 25C6.25 14.6447 14.6447 6.25 25 6.25C35.3553 6.25 43.75 14.6447 43.75 25Z'
              stroke='#F2994A'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
        {iconCheck === "done" && (
          <svg
            width='60'
            height='60'
            viewBox='0 0 50 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18.75 25L22.9167 29.1667L31.25 20.8333M43.75 25C43.75 35.3553 35.3553 43.75 25 43.75C14.6447 43.75 6.25 35.3553 6.25 25C6.25 14.6447 14.6447 6.25 25 6.25C35.3553 6.25 43.75 14.6447 43.75 25Z'
              stroke='#27AE60'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </div>
      <div className='status__info'>
        <h1 style={{ color: "red" }}>{status}</h1>
        <p>2 Tasks</p>
      </div>
    </div>
  );
};

export default DashboardStatusPill;
