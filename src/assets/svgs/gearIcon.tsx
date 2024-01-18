import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

const GearIcon = ({ size = "md", ...props }: Props) => {
  const getDimensions = () => {
    switch (size) {
      case "lg":
        return 24;

      case "md":
      default:
        return 16;
    }
  };

  return (
    <svg
      width={getDimensions()}
      height={getDimensions()}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 9.75C8.9665 9.75 9.75 8.9665 9.75 8C9.75 7.0335 8.9665 6.25 8 6.25C7.0335 6.25 6.25 7.0335 6.25 8C6.25 8.9665 7.0335 9.75 8 9.75Z"
        stroke="#BBBABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 1.75L6.25 3.25L4.75 4.25L2.75 3.75L1.75 5.75L3.25 7.25V8.75L1.75 10.25L2.75 12.25L4.75 11.75L6.25 12.75L6.75 14.25H9.25L9.75 12.75L11.25 11.75L13.25 12.25L14.25 10.25L12.75 8.75V7.25L14.25 5.75L13.25 3.75L11.25 4.25L9.75 3.25L9.25 1.75H6.75Z"
        stroke="#BBBABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GearIcon;
