import React from 'react';

interface InputProps {
  value: string;
  name: string;
  onChange: (name: string, value: string) => void;
  label: string;
}

const Input = (props: InputProps) => {
  return (
    <div className="input-component">
      <label>{props.label}</label>
      <input type="text" name={props.name} onChange={(e) => props.onChange(e.target.name, e.target.value)}/>
    </div>
  )
}
export default Input;
