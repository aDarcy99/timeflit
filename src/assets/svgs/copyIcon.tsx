import React, { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

const CopyIcon = ({ size = "md", ...props }: Props) => {
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
        d="M11.25 4.25V1.75H1.75V11.25H4.25M4.75 4.75V14.25H14.25V4.75H4.75Z"
        stroke="#BBBABA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CopyIcon;
