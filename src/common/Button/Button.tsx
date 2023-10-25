import React from "react";

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${props.className}`}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
