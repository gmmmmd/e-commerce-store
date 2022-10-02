import React, { useContext, useEffect, useState } from 'react';

import ProductCard from '@components/ProductCard';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../App/App';
import styles from './ProductList.module.scss';

const ProductList: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);

  const context = useContext(StoreContext);
  const { ProductsStore } = context;

  useEffect(() => {
    setAmount(ProductsStore.productsList.length);
  }, [ProductsStore.productsList]);

  if (!ProductsStore.productsList) return null;
  if (amount === 0) {
    return <h1>Nothing was found, try again</h1>;
  }
  return (
    <section className={styles.ProductList}>
      <div className={styles.ProductList__header}>
        <h2 className="title-h2">Total Product</h2>
        <span className={styles.ProductList__amount}>{amount}</span>
      </div>
      <div className={styles.ProductList__items}>
        {ProductsStore.productsList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default observer(ProductList);
