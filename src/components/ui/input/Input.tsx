import React, { ReactNode, ChangeEvent } from "react";

type InputProps = {
  type: 'checkbox' | 'text';
  name: string;
  className?: string
  placeholder?: string 
  value?: string;
  checked?: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  className,
  placeholder, 
  value,
  checked,
  onChange
}): ReactNode => (
    <input 
        className={className ?? ''}
        placeholder={placeholder ?? ''} 
        name={name}
        type={type}
        value={value ?? ''}
        checked={checked ?? false}
        onChange={onChange}
    />
)

export default Input;
