import React, { useContext } from 'react';

import ProductCard from '@components/ProductCard/ProductCard';
import { Meta } from '@utils/meta';
import { observer } from 'mobx-react-lite';
import { IProduct } from 'src/types/productType';

import { StoreContext } from '../../App/App';
import styles from './RelatedItems.module.scss';

const RelatedItems: React.FC = () => {
  const context = useContext(StoreContext);
  const { SingleProductStore } = context;
  return (
    <section>
      <div className={styles.Block}>
        <h2 className={`${styles.Block__title} title-h2`}>Related Items</h2>
        <div className={styles.Block__items}>
          {SingleProductStore.meta === Meta.success &&
            SingleProductStore.relatedProducts.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default observer(RelatedItems);
