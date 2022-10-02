import React from 'react';

import classNames from 'classnames';

import styles from './Input.module.scss';

export type InputProps = {
  type?: string;
  className?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  onChange,
  className,
  value,
  ...props
}) => {
  let inputDisabled = props.disabled && 'input_disabled';
  let inputClasses = classNames(styles.Input, className, inputDisabled);
  return (
    <input
      type={type}
      className={inputClasses}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default Input;
