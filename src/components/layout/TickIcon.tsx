import React from "react";

interface TickIconProps extends React.SVGProps<SVGSVGElement> {
  color: string;
}

const TickIcon = ({ color, ...props }: TickIconProps) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.8613 2.87109L29.6338 4.62891L10.0049 24.2725L0.366211 14.6338L2.13867 12.8613L10.0049 20.7275L27.8613 2.87109Z"
        fill={color}
      />
    </svg>
  );
};

export default TickIcon;
