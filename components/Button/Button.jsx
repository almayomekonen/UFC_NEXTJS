"use client";

const Button = ({ children, className }) => {
  return (
    <button className={className} onClick={handleClose}>
      {children}
    </button>
  );
};

export default Button;
