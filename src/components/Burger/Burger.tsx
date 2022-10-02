import React from 'react';

import classNames from 'classnames';

import styles from './Burger.module.scss';

export type BurgerProps = {
  className?: string;
  isOpen?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

const Burger: React.FC<BurgerProps> = ({ isOpen = false, onClick }) => {
  return (
    <div
      className={classNames(styles.Container, {
        'burger-open': isOpen,
      })}
      onClick={onClick}
      aria-label="Menu"
    >
      <span className={classNames(styles.BurgerItem)}></span>
    </div>
  );
};

export default Burger;
