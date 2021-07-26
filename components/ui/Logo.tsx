import React from "react";

interface IProps {
  color: string;
}

const Logo: React.FC<IProps> = ({ color }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 474.88 163.05'>
      <g id='Layer_2' data-name='Layer 2'>
        <g id='Layer_1-2' data-name='Layer 1'>
          <polygon
            fill={color === "white" ? "#171e3c" : "#D0D1D8"}
            points='383.65 0 283.03 100.62 218.24 35.83 254.07 0 292.63 0 256.8 35.83 283.03 62.06 345.08 0 383.65 0'
          />
          <polygon
            fill={color === "white" ? "#171e3c" : "#D0D1D8"}
            points='256.42 127.23 220.6 163.05 182.03 163.05 217.85 127.23 191.63 101.01 129.58 163.05 91.02 163.05 191.63 62.44 256.42 127.23'
          />
          <polygon
            fill={color === "white" ? "#171e3c" : "#D0D1D8"}
            points='474.88 0.14 311.96 163.05 273.72 163.05 273.56 162.89 436.44 0 474.74 0 474.88 0.14'
          />
          <polygon
            fill={color === "white" ? "#171e3c" : "#D0D1D8"}
            points='201.62 0 38.57 163.05 0 163.05 163.05 0 201.62 0'
          />
        </g>
      </g>
    </svg>
  );
};

export default Logo;
