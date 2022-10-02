import React, { useContext } from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import Select from '@components/Select';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../App/App';
import styles from './SearchBar.module.scss';

const SearchBar: React.FC = () => {
  const context = useContext(StoreContext);
  const { ProductsStore } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    ProductsStore.setQuery(value);
  };

  const SearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ProductsStore.getSearch();
  };

  return (
    <section className={styles.Block}>
      <div className={styles.Block__wrapper}>
        <form className={styles.Block__form} onSubmit={SearchSubmit}>
          <Input
            type="text"
            value={ProductsStore.query}
            onChange={handleChange}
            placeholder={'Search property'}
            className={styles.Block__input}
          />
          <Button type="submit" className={styles.Block_button}>
            Find Now
          </Button>
        </form>
      </div>
      <Select className={styles.Block__select} />
    </section>
  );
};

export default observer(SearchBar);
