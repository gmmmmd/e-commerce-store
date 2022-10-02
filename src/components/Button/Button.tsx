import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  onClick,
  color = 'primary',
  loading = false,
  ...arrgs
}) => {
  let buttonDisabled = arrgs.disabled && 'button_disabled';
  let dis = loading && 'button_disabled';

  let btnClasses = classNames(styles.Button, className, buttonDisabled, dis, {
    [styles.Button_primary]: ButtonColor.primary === color,
    [styles.Button_secondary]: ButtonColor.secondary === color,
  });
  return (
    <button
      type={type}
      className={btnClasses}
      onClick={onClick}
      disabled={loading}
      {...arrgs}
    >
      {children}
    </button>
  );
};

export default Button;
