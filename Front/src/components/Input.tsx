import React from "react";
import "./Input.css";

type InputProps = {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  required = false,
}: InputProps) => {
  return (
    <div className="input-container">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
