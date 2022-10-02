import React, { useContext } from 'react';

import Button, { ButtonColor } from '@components/Button/Button';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../App/App';
import styles from './ProductFullCard.module.scss';

const ProductFullCard: React.FC = () => {
  const context = useContext(StoreContext);
  const { SingleProductStore } = context;

  return (
    <section className={styles.Block}>
      <div
        key={SingleProductStore.product.id}
        className={styles.Block__container}
      >
        <img
          src={SingleProductStore.product.image}
          alt=""
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          className={styles.Block__img}
        />
        <div className={styles.Block__info}>
          <div className={styles.Block__titleWrapper}>
            <h2 className={`${styles.Block__title} title-h2`}>
              {SingleProductStore.product.title}
            </h2>
            <span className={`${styles.Block__category} text-style`}>
              {SingleProductStore.product.category}
            </span>
          </div>
          <div className={styles.Block__ratingWrapper}>
            <span className={styles.Block__ratingTitle}>Rating</span>
            {SingleProductStore.product.rating && (
              <div className={styles.Block__ratingInner}>
                <span>stars: {SingleProductStore.product.rating.rate}</span>
                <span>count: {SingleProductStore.product.rating.count}</span>
              </div>
            )}
          </div>
          <div className={`${styles.Block__description} text-style`}>
            {SingleProductStore.product.description}
          </div>
          <div className={`${styles.Block__price} title-h2`}>
            ${SingleProductStore.product.price}
          </div>
          <div className={styles.Block__buttonWrapper}>
            <Button
              className={styles.Block__button}
              color={ButtonColor.primary}
            >
              Buy Now
            </Button>
            <Button
              className={styles.Block__button}
              color={ButtonColor.secondary}
            >
              Add to Chart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(ProductFullCard);
