import React, { useEffect, useContext } from 'react';

import Loader from '@components/Loader';
import { LoaderSize } from '@components/Loader/Loader';
import ProductList from '@components/ProductList';
import SearchBar from '@components/SearchBar';
import { Meta } from '@utils/meta';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../App/App';
import styles from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const context = useContext(StoreContext);
  const { ProductsStore } = context;

  useEffect(() => {
    return () => ProductsStore.destroy();
  }, []);

  useEffect(() => {
    if (ProductsStore) {
      ProductsStore.getProductsList();
    }
  }, [ProductsStore, ProductsStore.getSearch]);

  useEffect(() => {
    ProductsStore.getCategories();
  }, []);

  useEffect(() => {
    if (ProductsStore.searchCategory) {
      ProductsStore.getSearchCategory();
    }
  }, [ProductsStore, ProductsStore.searchCategory]);

  return (
    <main className="Container">
      <section className={styles.TitleWrapper}>
        <h1 className="title-h1">Products</h1>
        <div className={styles.TitleWrapper__description}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </div>
      </section>
      <SearchBar />
      {ProductsStore.meta === Meta.loading ? (
        <Loader size={LoaderSize.l} className={styles.Loader} />
      ) : (
        <ProductList />
      )}
    </main>
  );
};

export default observer(ProductPage);
