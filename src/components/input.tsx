import React from 'react';

interface InputProps {
  value: string;
  name: string;
  onChange: (name: string, value: string) => void;
  label: string;
  placeholder?: string;
}

const Input = (props: InputProps) => {
  return (
    <label className="input input-bordered flex items-center gap-2 my-8">
      {props.label}
      <input
        type="text"
        className="grow"
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
      />
    </label>
  )
}
export default Input;
