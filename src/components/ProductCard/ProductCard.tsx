import React from 'react';

import { Link } from 'react-router-dom';
import { IProduct } from 'src/types/productType';

import styles from './ProductCard.module.scss';

export type ProductCardProps = {
  product: IProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, image, category, title, description, price } = product;
  if (!product) return null;
  return (
    <Link to={`/product/${id}`} className={styles.Card}>
      <img
        src={image}
        alt=""
        width={394}
        height={360}
        className={styles.Card__image}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.Card__textContent}>
        <span className={`text-style ${styles.Card__category}`}>
          {category}
        </span>
        <h3 className={`${styles.Card__title} title-h3`}>{title}</h3>
        <p className={`text-style ${styles.Card__description}`}>
          {description}
        </p>
      </div>
      <span className={styles.Card__price}>${price}</span>
    </Link>
  );
};

export default ProductCard;
