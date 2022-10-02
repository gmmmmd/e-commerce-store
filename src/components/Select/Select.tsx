import React, { useContext, useEffect, useState } from 'react';

import Button from '@components/Button';
import { ButtonColor } from '@components/Button/Button';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { StoreContext } from './../../App/App';
import styles from './Select.module.scss';

export type SelectProps = {
  className?: string;
};

const Select: React.FC<SelectProps> = ({ className }) => {
  const context = useContext(StoreContext);
  const { ProductsStore } = context;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openChange = () => {
    setIsOpen(!isOpen);
  };
  const onChangeValue = (item: string) => {
    ProductsStore.setSearchCategory(item);
    setIsOpen(!isOpen);
  };

  const selectClasses = classNames(styles.Block, className);
  if (!ProductsStore.categories) return null;
  return (
    <div className={selectClasses}>
      <Button
        onClick={openChange}
        color={ButtonColor.secondary}
        className={classNames(styles.Block__button)}
      >
        {ProductsStore.searchCategory ? ProductsStore.searchCategory : 'Filter'}
      </Button>
      {isOpen && (
        <ul className={styles.Block__list}>
          {ProductsStore.categories.map((item) => {
            return (
              <li key={item}>
                <Button
                  color={ButtonColor.secondary}
                  className={styles.Block__openButton}
                  onClick={() => onChangeValue(item)}
                >
                  {item}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default observer(Select);
