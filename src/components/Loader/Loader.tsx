import React from 'react';

import loader from '@assets/images/loader.svg';
import classNames from 'classnames';

import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  isLoading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  isLoading = true,
  size = LoaderSize.m,
  className,
}) => {
  let loaderClasses = classNames(styles.Block, className, {
    //[`styles.Block__size_${size}`]: size, такая конструкция должна работать, но нет(
    [styles.Block_size_l]: LoaderSize.l === size,
    [styles.Block_size_m]: LoaderSize.m === size,
    [styles.Block_size_s]: LoaderSize.s === size,
  });
  if (!isLoading) {
    return null;
  }
  return (
    <div className={loaderClasses}>
      <img src={loader} alt="" className={styles.Block__img} />
    </div>
  );
};

export default Loader;
